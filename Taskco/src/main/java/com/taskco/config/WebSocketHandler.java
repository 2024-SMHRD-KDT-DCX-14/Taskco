package com.taskco.config;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskco.entity.Chat;
import com.taskco.mapper.ChatMapper;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private Map<Integer, List<WebSocketSession>> chatRooms = new HashMap<>();
    
    @Autowired
    private ChatMapper chatMapper;
    
    
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
       System.out.println("WebSocket connected: " + session.getUri());
        System.out.println("Session ID: " + session.getId());
        String query = session.getUri().getQuery();
        if (query != null && query.contains("croom_idx")) {
            int croomIdx = Integer.parseInt(query.split("=")[1]);
            chatRooms.putIfAbsent(croomIdx, new ArrayList<>());
            chatRooms.get(croomIdx).add(session);
            System.out.println("Connected to room: " + croomIdx);
        } else {
            System.err.println("Missing croom_idx in WebSocket URL");
            session.close();
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // WebSocket URI에서 쿼리 추출
        String query = session.getUri().getQuery();
        
        
        if (query == null || !query.contains("croom_idx")) {
            System.err.println("Invalid query or missing croom_idx.");
            return;
        }

        // WebSocket 메시지 본문 수신
        String payload = message.getPayload();
        System.out.println("Raw payload: " + payload); // 원본 로그

        // UTF-8로 디코딩 강제
        String utf8Payload;
        try {
            byte[] bytes = payload.getBytes(StandardCharsets.UTF_8); // 바이트 배열로 변환
            utf8Payload = new String(bytes, StandardCharsets.UTF_8); // UTF-8로 디코딩
        } catch (Exception e) {
            System.err.println("Error decoding payload: " + e.getMessage());
            return; // 디코딩 실패 시 처리 중단
        }

        // JSON 메시지 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        Chat chatMessage;
        try {
            chatMessage = objectMapper.readValue(utf8Payload, Chat.class);
            System.out.println("Chatter: " + chatMessage.getChatter());
            System.out.println("Chat: " + chatMessage.getChat());
            
        } catch (JsonProcessingException e) {
            System.err.println("JSON parsing failed: " + e.getMessage());
            return; // JSON 파싱 실패 시 처리 중단
        }
        
        // croom_idx 확인 및 채팅방 세션 가져오기
        int croomIdx = Integer.parseInt(query.split("=")[1]);
        List<WebSocketSession> roomSessions = chatRooms.get(croomIdx);

        if (roomSessions == null) {
            System.err.println("Room not found for croom_idx: " + croomIdx);
            return;
        }
        //DB에 전송
        chatMessage.setCroom_idx(croomIdx);
        System.out.println(chatMessage);
        
        chatMapper.sendMessage(chatMessage);
        

        // 채팅방 내 모든 세션에 메시지 브로드캐스트
        for (WebSocketSession s : roomSessions) {
            if (s.isOpen()) {
                try {
                    s.sendMessage(new TextMessage(utf8Payload)); // UTF-8로 처리된 메시지 전송
                } catch (Exception e) {
                    System.err.println("Failed to send message to session: " + e.getMessage());
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String query = session.getUri().getQuery();
        if (query != null && query.contains("croom_idx")) {
            int croomIdx = Integer.parseInt(query.split("=")[1]);
            List<WebSocketSession> roomSessions = chatRooms.get(croomIdx);
            if (roomSessions != null) {
                roomSessions.remove(session);
            }
            System.out.println("WebSocket connection closed for croom_idx: " + croomIdx);
        }
    }
}

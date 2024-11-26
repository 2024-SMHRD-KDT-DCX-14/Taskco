package com.taskco;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GooglePublicKeysManager;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

import java.util.Collections;

// Google의 ID Token 검증을 처리
// Google API를 사용해 클라이언트 ID와 토큰의 유효성을 확인

public class GoogleVerifier {
	
	// Google Cloud Console에서 발급받은 Client ID
	private static final String CLIENT_ID = "938786367795-m2u4s4j4u6nhriskq4skss27m0dl82va.apps.googleusercontent.com"; // Google
																														// Cloud
	// JSON Factory (Gson 기반)
	private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

	// HTTP Transport (NetHttpTransport)
	private static final NetHttpTransport HTTP_TRANSPORT = new NetHttpTransport();
	
	// GoogleIdTokenVerifier
	private static final GoogleIdTokenVerifier verifier;

	// static 블록에서 GoogleIdTokenVerifier 초기화
	static {
		// GooglePublicKeysManager 초기화 및 GoogleIdTokenVerifier 설정
		verifier = new GoogleIdTokenVerifier.Builder(
				new GooglePublicKeysManager.Builder(HTTP_TRANSPORT, JSON_FACTORY).build())
						.setAudience(Collections.singletonList(CLIENT_ID)) // 클라이언트 ID 설정
						.build();
	}


	// ID Token을 검증하는 메서드
	public static GoogleIdToken verifyToken(String idTokenString) throws Exception {
		return verifier.verify(idTokenString);
	}
}

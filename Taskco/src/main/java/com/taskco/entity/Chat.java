package com.taskco.entity;

import lombok.Data;

@Data
public class Chat {
   private int croom_idx;
   private String chatter;
   private String chat;
   private String chat_file;
   private String chat_dt;
}
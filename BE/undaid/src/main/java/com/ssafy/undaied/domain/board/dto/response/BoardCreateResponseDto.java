package com.ssafy.undaied.domain.board.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class BoardCreateResponseDto {
    private int boardId;
    private String title;
    private String content;
    private Byte category;
    private String writerNickname;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package com.ssafy.undaied.domain.board.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

    @Getter
    @Setter
    @Builder
    public class BoardDetailResponseDto {
        private String title;
        private String writerNickname;
        private Byte category;
        private String content;
        private int viewCnt;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

    }

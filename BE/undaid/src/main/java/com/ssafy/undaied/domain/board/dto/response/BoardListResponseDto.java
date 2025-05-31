package com.ssafy.undaied.domain.board.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BoardListResponseDto {
    Integer boardId;
    String writerNickname;
    String title;
    Byte category;
    Integer viewCnt;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}

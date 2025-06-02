package com.ssafy.undaied.domain.board.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class BoardUpdateResponseDto {
    String title;
    String content;
    String writerNickname;
    Byte category;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}

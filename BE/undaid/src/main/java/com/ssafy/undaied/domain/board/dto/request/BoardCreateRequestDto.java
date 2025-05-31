package com.ssafy.undaied.domain.board.dto.request;

import lombok.Getter;

@Getter
public class BoardCreateRequestDto {
    private String title;
    private String content;
    private Byte category;
}

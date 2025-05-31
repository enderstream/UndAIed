package com.ssafy.undaied.domain.comment.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class CommentCreateResponseDto {

    private int commentId;
    private String commenterNickname;
    private String commentContent;
    private LocalDateTime createdAt;

}

package com.ssafy.undaied.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
@Builder
public class GameThumbnailResponseDto {
    private int gameId;
    private String roomTitle;
    private LocalDateTime startedAt;
    private String playTime;
}

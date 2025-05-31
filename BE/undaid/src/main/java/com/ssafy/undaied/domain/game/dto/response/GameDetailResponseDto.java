package com.ssafy.undaied.domain.game.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameDetailResponseDto {
    private int gameId;
    private String roomTitle;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private String playTime;
    private boolean humanWin;
    private List<GameRecordResponseDTO> gameRecords;
}

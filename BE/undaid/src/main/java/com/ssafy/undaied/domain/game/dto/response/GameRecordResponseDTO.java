package com.ssafy.undaied.domain.game.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameRecordResponseDTO {
    private int gameRecordId;
    private int gameId;
    private int roundNumber;
    private String subject;
    private String subjectTalk;
    private String freeTalk;
    private String events;
}
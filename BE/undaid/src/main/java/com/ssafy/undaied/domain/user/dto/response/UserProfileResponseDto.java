package com.ssafy.undaied.domain.user.dto.response;

import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@Builder
public class UserProfileResponseDto {
    private String nickname;
    private int profileImage;
    private int avatar;
    private Boolean sex;
    private int age;
    private int totalWin;
    private int totalLose;
    private List<GameThumbnailResponseDto> game;
}

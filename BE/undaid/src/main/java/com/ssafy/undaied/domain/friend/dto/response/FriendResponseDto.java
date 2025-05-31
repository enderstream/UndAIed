package com.ssafy.undaied.domain.friend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FriendResponseDto {
    private Integer friendshipId;
    private Integer friendId;
    private String friendNickname;
    private LocalDateTime updatedAt;
}

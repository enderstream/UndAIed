package com.ssafy.undaied.domain.friend.dto.request;

import com.ssafy.undaied.domain.friend.entity.FriendshipStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FriendUpdateStatusRequestDto {
    private FriendshipStatus status;
    private Integer friendId;
}
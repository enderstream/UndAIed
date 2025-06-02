package com.ssafy.undaied.domain.friend.entity;

import com.ssafy.undaied.domain.friend.dto.response.FriendResponseDto;
import com.ssafy.undaied.domain.user.entity.Users;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "friends")
public class Friends {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friendship_id")
    private Integer friendshipId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FriendshipStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "friend_id", nullable = false)
    private Users friendUser;

    @Builder
    public Friends(Integer friendshipId, Users user, Users friendUser, FriendshipStatus status) {
        this.friendshipId = friendshipId;
        this.user = user;
        this.friendUser = friendUser;
        this.status = status;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void updateStatus(FriendshipStatus status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateDirection(Users newUser, Users newFriendUser) {
        this.user = newUser;
        this.friendUser = newFriendUser;
    }

    public FriendResponseDto toResponseDto(Integer userId) {
        // 토큰 userId와 친구 목록의 userId가 같으면 friendUser 정보 반환, 아니면 user 정보 반환
        Users friendInfo = user.getUserId() == userId ? friendUser : user;

        FriendResponseDto dto = FriendResponseDto.builder()
                .friendshipId(friendshipId)
                .friendId(friendInfo.getUserId())
                .friendNickname(friendInfo.getNickname())
                .build();

        return dto;
    }
}

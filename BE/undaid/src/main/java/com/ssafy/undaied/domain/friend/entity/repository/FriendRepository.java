package com.ssafy.undaied.domain.friend.entity.repository;

import com.ssafy.undaied.domain.friend.dto.response.FriendResponseDto;
import com.ssafy.undaied.domain.friend.entity.Friends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friends, Integer> {

    // 친구 목록 조회
    // userId 또는 friendId가 사용자이면서 status = 'ACCEPTED'인 friends 목록
    @Query("SELECT new com.ssafy.undaied.domain.friend.dto.response.FriendResponseDto( "+
            "f.friendshipId, " +
            "CASE WHEN f.user.userId = :userId THEN f.friendUser.userId ELSE f.user.userId END, " +
            "CASE WHEN f.user.userId = :userId THEN f.friendUser.nickname ELSE f.user.nickname END, " +
            "f.updatedAt) " +
            "FROM Friends f WHERE " +
            "(f.user.userId = :userId OR " +
            "f.friendUser.userId = :userId) " +
            "AND f.status = com.ssafy.undaied.domain.friend.entity.FriendshipStatus.ACCEPTED " +
            "ORDER BY f.updatedAt "
    )
    List<FriendResponseDto> findByUserId(@Param("userId") Integer userId);

    // 친구 요청 조회
    // friendId가 사용자이면서 status = 'PENDING'인 friends 목록
    @Query("SELECT new com.ssafy.undaied.domain.friend.dto.response.FriendResponseDto(" +
            "f.friendshipId, " +
            "f.user.userId, " +
            "f.user.nickname, " +
            "f.updatedAt) " +
            "FROM Friends f WHERE " +
            "f.friendUser.userId = :userId AND " +
            "f.status = com.ssafy.undaied.domain.friend.entity.FriendshipStatus.PENDING " +
            "ORDER BY f.updatedAt DESC "
    )
    List<FriendResponseDto> findPendingByUserId(@Param("userId") Integer userId);

    // 특정 친구 목록(한 개) 조회
    @Query("SELECT f FROM Friends f WHERE " +
            "(f.user.userId = :userId AND f.friendUser.userId = :friendId) OR " +
            "(f.user.userId = :friendId AND f.friendUser.userId = :userId)"
    )
    Friends findByUserIdAndFriendId(@Param("userId") Integer userId, @Param("friendId") Integer friendId);
}

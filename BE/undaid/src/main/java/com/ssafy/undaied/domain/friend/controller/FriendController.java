package com.ssafy.undaied.domain.friend.controller;

import com.ssafy.undaied.domain.friend.dto.request.FriendCreateRequestDto;
import com.ssafy.undaied.domain.friend.dto.request.FriendUpdateStatusRequestDto;
import com.ssafy.undaied.domain.friend.dto.response.FriendResponseDto;
import com.ssafy.undaied.domain.friend.service.FriendService;
import com.ssafy.undaied.global.common.response.ApiDataResponse;
import com.ssafy.undaied.global.common.response.ApiResponse;
import com.ssafy.undaied.global.common.response.HttpStatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/friend")
public class FriendController {

    private final FriendService friendService;

    // 친구 목록 가져오기
    @GetMapping
    public ApiDataResponse<List<FriendResponseDto>> getFriends(
            @AuthenticationPrincipal Integer userId) {
        List<FriendResponseDto> friendsList = friendService.getFriendsList(userId);
        return ApiDataResponse.of(HttpStatusCode.OK, friendsList, "친구 목록 조회 성공");
    }

    // 친구 요청 목록 가져오기
    @GetMapping({"/request"})
    public ApiDataResponse<List<FriendResponseDto>> getFriendRequestsList(
            @AuthenticationPrincipal Integer userId) {
        List<FriendResponseDto> responseDtos = friendService.getFriendRequestsList(userId);
        return ApiDataResponse.of(HttpStatusCode.OK, responseDtos, "친구 요청 목록 조회 성공");
    }

    // 친구 요청
    @PostMapping
    public ApiResponse createFriend(
            @AuthenticationPrincipal Integer userId,
            @RequestBody FriendCreateRequestDto friendCreateRequestDto) {
        friendService.createFriend(userId, friendCreateRequestDto);
        return ApiResponse.of(HttpStatusCode.OK, "친구 요청을 보냈습니다.");
    }

    // 친구 요청 변경 (수락/거절) 및 친구 차단
    @PatchMapping("/update-status")
    public ApiResponse updateFriendStatus(
            @AuthenticationPrincipal Integer userId,
            @RequestBody FriendUpdateStatusRequestDto friendUpdateStatusRequestDto) {
        friendService.updateFriendStatus(userId, friendUpdateStatusRequestDto);
        return ApiResponse.of(HttpStatusCode.OK, "친구 상태가 변경되었습니다.");
    }

}

package com.ssafy.undaied.domain.user.controller;

import com.ssafy.undaied.domain.user.dto.request.UpdateProfileRequestDto;
import com.ssafy.undaied.domain.user.dto.response.TokenValidationDto;
import com.ssafy.undaied.domain.user.dto.response.UserProfileResponseDto;
import com.ssafy.undaied.domain.user.service.UserService;
import com.ssafy.undaied.global.common.response.ApiDataResponse;
import com.ssafy.undaied.global.common.response.ApiResponse;
import com.ssafy.undaied.global.common.response.HttpStatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/user")
public class UserController {

    private final UserService userService;

    // 회원가입 또는 로그인
    @PostMapping
    public ApiDataResponse<?> signUpOrSignIn(@RequestBody Map<String, String> token) {
        TokenValidationDto result = userService.tokenValidate(token.get("token"));
        return ApiDataResponse.of(result.getHttpStatusCode(), result.getUserLoginResponseDto(), result.getMessage());
    }

    // 회원 프로필 조회
    @GetMapping("/profile")
    public ApiDataResponse<?> getUserInfo() {
        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserProfileResponseDto responseDto = userService.getUserProfile(userId);
        return ApiDataResponse.of(HttpStatusCode.OK, responseDto, "프로필 조회 성공");
    }

    // 회원 프로필 업데이트
    @PatchMapping("/profile")
    public ApiDataResponse updateProfile(@RequestBody UpdateProfileRequestDto updateProfileRequestDto) {
        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserProfileResponseDto responseDto = userService.updateProfile(updateProfileRequestDto, userId);
        return ApiDataResponse.of(HttpStatusCode.OK, responseDto, "프로필이 수정되었습니다.");
    }

    // 로그아웃
    @GetMapping("/signout")
    public ApiResponse signOut() {
        userService.signout("리프레시 토큰을 넣기 위한 로직 필요");
        return ApiResponse.of(HttpStatusCode.OK, "로그아웃이 완료되었습니다.");
    }

    // 회원 탈퇴
    @DeleteMapping
    public ApiResponse deleteUser() {
        Integer userId = (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.deleteUser(userId);
        return ApiResponse.of(HttpStatusCode.OK, "회원탈퇴가 완료되었습니다.");
    }

}

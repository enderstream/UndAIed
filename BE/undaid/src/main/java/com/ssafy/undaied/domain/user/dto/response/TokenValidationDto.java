package com.ssafy.undaied.domain.user.dto.response;

import com.ssafy.undaied.global.common.response.HttpStatusCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class TokenValidationDto {
    private HttpStatusCode httpStatusCode;
    private String message;
    private UserLoginResponseDto userLoginResponseDto;
}

package com.ssafy.undaied.global.common.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.ssafy.undaied.global.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ToString
@RequiredArgsConstructor
@Getter
@JsonPropertyOrder({"timeStamp", "isSuccess", "status", "message"})
public class ApiResponse {

    private final String timeStamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
    private final Boolean isSuccess;
    private final int status;
    private final String message;


    public static ApiResponse of(HttpStatusCode statusCodes) {
        return new ApiResponse(statusCodes.getIsSuccess(), statusCodes.getStatus(), null);
    }

    public static ApiResponse of(HttpStatusCode statusCodes, String message) {
        return new ApiResponse(statusCodes.getIsSuccess(), statusCodes.getStatus(), message);
    }

    public static ApiResponse of(ErrorCode errorCode) {
        return new ApiResponse(false, errorCode.getStatus(), errorCode.getMessage());
    }
}
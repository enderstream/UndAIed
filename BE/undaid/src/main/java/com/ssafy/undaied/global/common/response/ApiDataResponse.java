package com.ssafy.undaied.global.common.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@JsonPropertyOrder({"timeStamp", "isSuccess", "status", "message", "data"})
public class ApiDataResponse<T> extends ApiResponse{

    private final T data;

    public ApiDataResponse(HttpStatusCode httpStatusCode, T data, String message) {
        super(httpStatusCode.getIsSuccess(), httpStatusCode.getStatus(), message);
        this.data = data;
    }

    public static <T> ApiDataResponse<T> of(HttpStatusCode statusCode, T data) {
        return new ApiDataResponse<>(statusCode, data, null);
    }

    public static <T> ApiDataResponse<T> of(HttpStatusCode statusCode, T data, String message) {
        return new ApiDataResponse<>(statusCode, data, message);
    }
}
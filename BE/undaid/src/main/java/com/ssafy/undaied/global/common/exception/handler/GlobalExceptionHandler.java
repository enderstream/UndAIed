package com.ssafy.undaied.global.common.exception.handler;

import com.ssafy.undaied.global.common.exception.BaseException;
import com.ssafy.undaied.global.common.exception.ErrorCode;
import com.ssafy.undaied.global.common.response.ApiResponse;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.HttpRequestMethodNotSupportedException;


@RestControllerAdvice
public class GlobalExceptionHandler {

    // javax.validation.Valid or @Validated 으로 binding error 발생시 발생
    // 주로 @RequestBody, @RequestPart 어노테이션에서 발생
    @ExceptionHandler(MethodArgumentNotValidException.class)
    private ApiResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        System.out.println(e.getMessage());
        return ApiResponse.of(ErrorCode.INVALID_HTTP_MESSAGE_BODY);
    }

    // @ModelAttribute 으로 binding error 발생시 BindException 발생
    @ExceptionHandler(BindException.class)
    private ApiResponse handleBindException(BindException e) {
        System.out.println(e.getMessage());
        return ApiResponse.of(ErrorCode.INVALID_HTTP_MESSAGE_BODY);
    }

    // enum type 일치하지 않아 binding 못할 경우 발생
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    private ApiResponse handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        System.out.println(e.getMessage());
        return ApiResponse.of(ErrorCode.INVALID_HTTP_MESSAGE_BODY);
    }

    // 지원하지 않은 HTTP method 호출 할 경우 발생
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    private ApiResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        System.out.println(e.getMessage());
        return ApiResponse.of(ErrorCode.UNSUPPORTED_HTTP_METHOD);
    }

    // request 값을 읽을 수 없을 때 발생
    @ExceptionHandler(HttpMessageNotReadableException.class)
    protected ApiResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        System.out.println(e.getMessage());
        return ApiResponse.of(ErrorCode.BAD_REQUEST_ERROR);
    }

    //비지니스 로직 에러
    @ExceptionHandler(BaseException.class)
    private ApiResponse handleBusinessException(BaseException e) {
        System.out.println(e.getMessage());
        return ApiResponse.of(e.getErrorCode());
    }

    // 나머지 예외 처리
    @ExceptionHandler(Exception.class)
    private ApiResponse handleException(Exception e) {
        System.out.println(e.getMessage());
        return ApiResponse.of(ErrorCode.SERVER_ERROR);
    }

}
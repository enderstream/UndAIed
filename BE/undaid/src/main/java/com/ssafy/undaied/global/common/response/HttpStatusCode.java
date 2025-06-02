package com.ssafy.undaied.global.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum  HttpStatusCode {

    //success
    OK(200, true),
    CREATED(201, true),

    // fail
    BAD_REQUEST(400, false),
    UNAUTHORIZED(401, false),
    FORBIDDEN(403, false),
    NOT_FOUND(404, false),
    METHOD_NOT_ALLOWED(405, false),
    INTERNAL_SERVER_ERROR(500, false);

    private final int status;
    private final Boolean isSuccess;
}
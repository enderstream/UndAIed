package com.ssafy.undaied.global.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.undaied.domain.user.entity.ProviderType;
import com.ssafy.undaied.global.common.exception.BaseException;
import org.springframework.stereotype.Service;

import java.util.Base64;

import static com.ssafy.undaied.domain.user.entity.ProviderType.GOOGLE;
import static com.ssafy.undaied.global.common.exception.ErrorCode.TOKEN_VALIDATION_FAILED;

@Service
public class OAuth2Service {
    public JsonNode extractJsonNode(String idToken) {
        // 기본 토큰 형식 검증
        if (!idToken.contains(".") || idToken.split("\\.").length != 3) {
            throw new BaseException(TOKEN_VALIDATION_FAILED);
        }

        Base64.Decoder decoder = Base64.getUrlDecoder();    // 디코더 생성

        // JWT는 header.payload.signature 형식이므로 payload 부분만 추출
        String[] chunks = idToken.split("\\.");
        String payload = new String(decoder.decode(chunks[1])); // payload만 디코딩

        ObjectMapper mapper = new ObjectMapper();

        // payload를 JSON으로 파싱
        // 토큰 파싱에 실패한 경우 TOKEN_VALIDATION_FAILED 에러 던짐
        try {
            JsonNode node = mapper.readTree(payload);

            // 필수 필드 검증
            if (node.get("email") == null || node.get("sub") == null)
                throw new BaseException(TOKEN_VALIDATION_FAILED);

            return node;
        } catch (JsonProcessingException e) {
            throw new BaseException(TOKEN_VALIDATION_FAILED);
        }
    }

    public ProviderType checkProvider(String iss) {
        if (iss.contains("accounts.google.com")) return GOOGLE;
        else return null;
    }
}

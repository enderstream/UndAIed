package com.ssafy.undaied.global.auth.token;

import com.ssafy.undaied.domain.user.entity.RoleType;
import com.ssafy.undaied.global.common.exception.BaseException;
import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static com.ssafy.undaied.global.common.exception.ErrorCode.*;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String secretKey;

    private final long tokenValidTime = 24 * 60 * 60 * 1000L; // 24시간
    private final long refreshTokenValidTime = 14 * 24 * 60 * 60 * 1000L; // 2주

    // 객체 초기화, secretKey를 Base64로 인코딩
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String email, RoleType roles, int userId) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("roles", "ROLE_" + roles.name());    // "ROLE_" prefix 추가
        claims.put("userId", userId);
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String createRefreshToken() {
        Date now = new Date();
        return Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = getClaims(token);
        Integer userId = claims.get("userId", Integer.class);  // userId를 principal로 사용
        String role = claims.get("roles", String.class); // "ROLE_ADMIN" 또는 "ROLE_USER"

        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));
        return new UsernamePasswordAuthenticationToken(userId, "", authorities);
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    public String resolveToken(String bearerToken) {
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public int getUserIdFromToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();

            // userId 클레임 값 추출
            return (int) claims.get("userId");
        } catch (ExpiredJwtException e) {
            throw new BaseException(EXPIRED_TOKEN);             // 만료된 토큰
        } catch (JwtException e) {
            throw new BaseException(UNAUTHORIZED_TOKEN);        // 유효하지 않은 토큰
        } catch (NumberFormatException e) {
            throw new BaseException(INVALID_USER_ID_FORMAT);    // userId 파싱 실패
        }
    }



}
# 빌드 스테이지
FROM gradle:8.12.1-jdk17 AS build

WORKDIR /home/gradle/src

# 빌드 캐싱 최적화: 종속성 파일 먼저 복사
COPY --chown=gradle:gradle build.gradle settings.gradle ./
COPY --chown=gradle:gradle gradle/ gradle/

# 종속성 다운로드 (캐싱 레이어)
RUN gradle dependencies --no-daemon

# 소스코드 복사
COPY --chown=gradle:gradle . .

# 빌드 실행
RUN gradle build -x test --no-daemon --stacktrace

# 실행 스테이지
FROM openjdk:17-jdk AS prod

WORKDIR /app

# 빌드된 JAR 파일 복사
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar

# 보안을 위한 non-root 유저
RUN groupadd -r user && useradd -r -g user user
RUN chown -R user:user /app
USER user

# 웹소켓 통신을 위한 최소한의 보안 해제
ENV JAVA_OPTS="\
    --add-opens=java.base/sun.nio.ch=ALL-UNNAMED \
    --add-opens=java.base/java.nio=ALL-UNNAMED \
    --add-opens=java.base/java.net=ALL-UNNAMED \
    --add-opens=java.base/java.lang.reflect=ALL-UNNAMED \
    --add-opens=java.base/java.util.concurrent=ALL-UNNAMED \
    -Dio.netty.tryReflectionSetAccessible=true \
    -Djava.security.egd=file:/dev/./urandom"
CMD java $JAVA_OPTS -jar app.jar
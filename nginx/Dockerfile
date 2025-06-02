FROM nginx:alpine

# 타임존 설정
ENV TZ=Asia/Seoul

# 로그 디렉토리 생성
RUN mkdir -p /var/log/nginx

# nginx 설정 파일들 선택적 복사
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/ /etc/nginx/conf.d/
COPY html/ /usr/share/nginx/html/

# conf.d 디렉토리 권한 설정
RUN chmod -R 755 /etc/nginx/conf.d

EXPOSE 80 443

# Exec form 사용: graceful shutdown을 위한 신호 처리 최적화
CMD ["nginx", "-g", "daemon off;"]
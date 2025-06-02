FROM redis:alpine

ENV TZ=Asia/Seoul

COPY redis.conf /usr/local/etc/redis/redis.conf

# 보안을 위한 non-root 유저
USER redis

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
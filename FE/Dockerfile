# Build stage
FROM node:22 AS build

# pnpm 설치
RUN npm install -g pnpm@latest

WORKDIR /frontend

# 의존성 파일들 먼저 복사 (Docker 캐싱 최적화)
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml* ./

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# 프로덕션 빌드
RUN pnpm build

# Production stage
FROM node:22-alpine AS prod

# serve 설치
RUN npm install -g serve@latest

WORKDIR /app

# 빌드된 파일들만 복사
COPY --from=build /frontend/dist ./dist

# 보안을 위한 non-root 유저
RUN adduser -D -s /bin/sh user
RUN chown -R user:user /app
USER user

CMD serve -s dist -l 5173
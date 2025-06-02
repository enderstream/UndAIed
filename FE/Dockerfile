FROM node:22
WORKDIR /frontend

# 1) package.json(lock 포함) 복사
COPY package*.json ./

# 2) 기존 lockfile/node_modules 삭제 → npm install 로 다시 설치
RUN rm -rf node_modules package-lock.json \
 && npm install

# 3) serve 글로벌 설치 + 캐시 정리
RUN npm install -g serve \
 && npm cache clean --force

# 4) 앱 소스 복사
COPY . .

# 5) 프로덕션 빌드
RUN npm run build

# 6) devDependencies 제거 (이미 빌드 끝난 후)
RUN npm prune --omit=dev

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]

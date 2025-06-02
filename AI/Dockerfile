FROM python:3.12.8

WORKDIR /AI

# 종속성 먼저 설치 (레이어 캐싱 최적화)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드 복사
COPY . .

# 보안을 위한 non-root 유저
RUN groupadd -r user && useradd -r -g user user
RUN chown -R user:user /AI
USER user

CMD uvicorn app:app --host 0.0.0.0 --port $AI_PORT
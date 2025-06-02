package com.ssafy.undaied.socket.chat.handler;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIONamespace;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnEvent;
import com.ssafy.undaied.socket.chat.dto.request.GameChatRequestDto;
import com.ssafy.undaied.socket.chat.service.GameChatService;
import com.ssafy.undaied.socket.common.exception.SocketException;
import com.ssafy.undaied.socket.common.util.GameTimer;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

import static com.ssafy.undaied.socket.common.constant.SocketRoom.GAME_KEY_PREFIX;
import static com.ssafy.undaied.socket.common.exception.SocketErrorCode.GAME_NOT_FOUND;
import static com.ssafy.undaied.socket.common.exception.SocketErrorCode.USER_INFO_NOT_FOUND;

@Component
@Slf4j
@RequiredArgsConstructor
public class GameChatHandler {

    private final SocketIONamespace namespace;
    private final GameChatService gameChatService;
    private final RedisTemplate<String, String> redisTemplate;
    private final GameTimer gameTimer;

    @PostConstruct
    private void init() {
        namespace.addEventListener("game:chat:emit", GameChatRequestDto.class,
                (client, data, ackRequest) -> {
                    try {
                        log.info("게임 채팅 요청 확인");
                        log.info("Received data object: {}", data);
                        log.info("Content from data: {}", data.getContent());

                        Integer gameId = client.get("gameId");
                        Integer userId = client.get("userId");

                        if (userId == null) {
                            throw new SocketException(USER_INFO_NOT_FOUND);
                        }

                        if (gameId == null) {
                            throw new SocketException(GAME_NOT_FOUND);
                        }

                        // 플레이어 상태 확인
                        String mappingKey = GAME_KEY_PREFIX + gameId + ":number_mapping";
                        String playerNumber = (String) redisTemplate.opsForHash().get(mappingKey, userId.toString());

                        if (playerNumber == null) {
                            sendResponse(ackRequest, false, "플레이어 정보를 찾을 수 없습니다.");
                            return;
                        }

                        // 플레이어 생존 상태 확인
                        String statusKey = GAME_KEY_PREFIX + gameId + ":player_status";
                        String playerStatus = (String) redisTemplate.opsForHash().get(statusKey, playerNumber);

                        if (playerStatus != null && playerStatus.contains("isDied=true")) {
                            sendResponse(ackRequest, false, "죽은 플레이어는 채팅을 할 수 없습니다.");
                            return;
                        }

                        String stageKey = GAME_KEY_PREFIX + gameId + ":stage";
                        String currentStage = redisTemplate.opsForValue().get(stageKey);
                        log.info("현재 stage: {}", currentStage);

                        if (gameTimer.isMainStage(gameId)) {
                            if ("subject_debate".equals(currentStage)) {
                                String errorMessage = gameChatService.storeSubjectChat(gameId, client, userId, data);
                                sendResponse(ackRequest, errorMessage == null, errorMessage);
                            } else if ("free_debate".equals(currentStage)) {
                                String errorMessage = gameChatService.processFreeChat(gameId, client, userId, data);
                                sendResponse(ackRequest, errorMessage == null, errorMessage);
                            }
                        } else {
                            sendResponse(ackRequest, false, "지금은 토론 시간이 아닙니다.");
                        }


                    } catch (Exception e) {
                        log.error("채팅 처리 중 오류 발생: {}", e.getMessage(), e);
                        sendResponse(ackRequest, false, "채팅 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
                    }
                });
    }

    private void sendResponse(AckRequest ackRequest, boolean success, String errorMessage) {
        if (ackRequest.isAckRequested()) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", success);
            response.put("errorMessage", errorMessage);
            response.put("data", null);
            ackRequest.sendAckData(response);
        }
    }
}


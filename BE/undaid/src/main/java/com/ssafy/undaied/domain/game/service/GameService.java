package com.ssafy.undaied.domain.game.service;

import com.ssafy.undaied.domain.game.dto.response.GameDetailResponseDto;
import com.ssafy.undaied.domain.game.dto.response.GameRecordResponseDTO;
import com.ssafy.undaied.domain.game.entity.GameRecords;
import com.ssafy.undaied.domain.game.entity.Games;
import com.ssafy.undaied.domain.game.entity.respository.GameRecordsRepository;
import com.ssafy.undaied.domain.game.entity.respository.GamesRepository;
import com.ssafy.undaied.global.common.exception.BaseException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.undaied.global.common.exception.ErrorCode.GAME_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class GameService {

    private final GameRecordsRepository gameRecordsRepository;
    private final GamesRepository gamesRepository;

    public GameDetailResponseDto getGameDetailInfo(int gameId) {
        Games game = gamesRepository.findById(gameId)
                .orElseThrow(() -> new BaseException(GAME_NOT_FOUND));

        List<GameRecords> gameRecords = gameRecordsRepository.findByGame(game);

        List<GameRecordResponseDTO> recordResponseDto = gameRecords.stream()
                .map(record -> GameRecordResponseDTO.builder()
                        .gameRecordId(record.getGameRecordId())
                        .gameId(record.getGame().getGameId())  // Games 엔티티에서 id를 가져옴
                        .roundNumber(record.getRoundNumber())
                        .subject(record.getSubject().getItem())
                        .subjectTalk(record.getSubjectTalk())
                        .freeTalk(record.getFreeTalk())
                        .events(record.getEvents())
                        .build())
                .collect(Collectors.toList());

        return GameDetailResponseDto.builder()
                .gameId(gameId)
                .roomTitle(game.getRoomTitle())
                .startedAt(game.getStartedAt())
                .endedAt(game.getEndedAt())
                .playTime(game.getPlayTime())
                .humanWin(game.getHumanWin())
                .gameRecords(recordResponseDto)
                .build();
    }


}

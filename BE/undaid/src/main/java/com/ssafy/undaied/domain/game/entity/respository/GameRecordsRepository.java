package com.ssafy.undaied.domain.game.entity.respository;

import com.ssafy.undaied.domain.game.entity.GameRecords;
import com.ssafy.undaied.domain.game.entity.Games;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRecordsRepository extends JpaRepository<GameRecords, Integer> {

    List<GameRecords> findByGame(Games game);

}

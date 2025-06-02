package com.ssafy.undaied.domain.game.entity.respository;

import com.ssafy.undaied.domain.game.entity.GameParticipants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameParticipantsRepository extends JpaRepository<GameParticipants, Integer> {
    List<GameParticipants> findDistinctByUserUserId(int userId);
}

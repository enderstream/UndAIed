package com.ssafy.undaied.domain.game.entity;

import com.ssafy.undaied.domain.ai.entity.AIs;
import com.ssafy.undaied.domain.user.entity.Users;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "game_participants")
public class GameParticipants {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_participants_id")
    private int gameParticipantsId;

    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "game_id", nullable = false)
    private Games game;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = true)
    private Users user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ai_id", nullable = true)
    private AIs ai;

}

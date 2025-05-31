package com.ssafy.undaied.domain.game.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "game_records")
@Getter @Setter
@NoArgsConstructor
public class GameRecords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_record_id")
    private int gameRecordId;

    @ManyToOne(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "game_id", nullable = false)
    @NotNull
    private Games game;

    @NotNull
    @Column(name = "round_number")
    private Integer roundNumber;

    @NotNull
    @OneToOne
    @JoinColumn(name = "subject_id")
    private Subjects subject;

    @NotNull
    @Column(name = "subject_talk", columnDefinition = "TEXT")
    private String subjectTalk;

    @NotNull
    @Column(name = "free_talk", columnDefinition = "TEXT")
    private String freeTalk;

    @NotNull
    @Column(name = "events", columnDefinition = "TEXT")
    private String events;

    @Builder
    public GameRecords(int gameRecordId, Games game, Integer roundNumber, Subjects subject, String subjectTalk, String freeTalk, String events) {
        this.gameRecordId = gameRecordId;
        this.game = game;
        this.roundNumber = roundNumber;
        this.subject = subject;
        this.subjectTalk = subjectTalk;
        this.freeTalk = freeTalk;
        this.events = events;
    }
}
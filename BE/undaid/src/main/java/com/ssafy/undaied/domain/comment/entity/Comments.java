package com.ssafy.undaied.domain.comment.entity;

import com.ssafy.undaied.domain.board.entity.Boards;
import com.ssafy.undaied.domain.user.entity.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer commentId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Boards board;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "commenter_id")
    private Users commenter;

    @NotNull
    @Column(name = "comment_content", columnDefinition = "TEXT")
    private String commentContent;

    @NotNull
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

//    @PreUpdate
//    protected void onUpdate() {
//        this.updatedAt = LocalDateTime.now();
//    }

    @Builder
    public Comments(Boards board, Users commenter, String commentContent) {
        this.board=board;
        this.commenter=commenter;
        this.commentContent=commentContent;
    }

    public void update(String commentContent) {

        if (commentContent!= null) {
            this.commentContent = commentContent;
            this.updatedAt = LocalDateTime.now();
        }
    }

}
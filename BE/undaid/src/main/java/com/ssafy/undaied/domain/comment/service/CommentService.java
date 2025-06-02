package com.ssafy.undaied.domain.comment.service;

import com.ssafy.undaied.domain.board.entity.Boards;
import com.ssafy.undaied.domain.board.entity.repository.BoardRepository;
import com.ssafy.undaied.domain.comment.dto.request.CommentCreateRequestDto;
import com.ssafy.undaied.domain.comment.dto.request.CommentUpdateRequestDto;
import com.ssafy.undaied.domain.comment.dto.response.CommentCreateResponseDto;
import com.ssafy.undaied.domain.comment.dto.response.CommentListResponseDto;
import com.ssafy.undaied.domain.comment.entity.Comments;
import com.ssafy.undaied.domain.comment.entity.repository.CommentRepository;
import com.ssafy.undaied.domain.user.entity.Users;
import com.ssafy.undaied.domain.user.entity.repository.UserRepository;
import com.ssafy.undaied.global.common.exception.BaseException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.Objects;

import static com.ssafy.undaied.global.common.exception.ErrorCode.*;

@Transactional
@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final UserRepository usersRepository;

    public Page<CommentListResponseDto> getComments(Integer boardId, Pageable pageable) {

        Page<Comments> commentsPage = commentRepository.findByBoard_BoardId(boardId, pageable);

        return commentsPage.map(this::toDto);
    }


    public CommentCreateResponseDto createComments(int boardId, CommentCreateRequestDto commentCreateRequestDto, int userId){

        Boards board=boardRepository.findById(boardId)
                .orElseThrow(() -> new BaseException(BOARD_NOT_FOUND));
        Users commenter=usersRepository.findById(userId)
                .orElseThrow(() -> new BaseException(COMMENT_NOT_FOUND));

        Comments comments=Comments.builder()
                .board(board)
                .commenter(commenter)
                .commentContent(commentCreateRequestDto.getCommentContent())
                .build();

        Comments savedComments =commentRepository.save(comments);

        return CommentCreateResponseDto.builder()
                .commentId(savedComments.getCommentId())
                .commenterNickname(savedComments.getCommenter().getNickname())
                .commentContent(savedComments.getCommentContent())
                .createdAt(savedComments.getCreatedAt())
                .build();
        }

    private CommentListResponseDto toDto(Comments comment) {
        return CommentListResponseDto.builder()
                .commentId(comment.getCommentId())
                .commenterNickname(comment.getCommenter().getNickname())
                .commentContent(comment.getCommentContent())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }


    public void updateComment(Integer commentId, Integer userId,CommentUpdateRequestDto commentUpdateRequestDto){

        Comments comments = commentRepository.findById(commentId).orElseThrow(() ->
                new BaseException(COMMENT_NOT_FOUND));

        // 작성자와 요청한 사용자 비교
        if (!Objects.equals(comments.getCommenter().getUserId(), userId)) {
            throw new BaseException(COMMENT_NOT_AUTHORIZED);
        }

        comments.update(commentUpdateRequestDto.getCommentContent());
    }


    public void deleteComment(Integer commentId, Integer userId){

        // commentId로 작성자 찾기 위해 객체 생성
        Comments comments =commentRepository.findById(commentId)
                .orElseThrow(() -> new BaseException(COMMENT_NOT_FOUND));

        if(!Objects.equals(comments.getCommenter().getUserId(), userId)){
            throw new BaseException(COMMENT_NOT_AUTHORIZED);
        }

        commentRepository.delete(comments);

    }


    public void adminDeleteComment(Integer commentId, Integer userId){

        // commentId로 작성자 찾기 위해 객체 생성
        Comments comments =commentRepository.findById(commentId)
                .orElseThrow(() -> new BaseException(COMMENT_NOT_AUTHORIZED));

        commentRepository.delete(comments);
    }
}

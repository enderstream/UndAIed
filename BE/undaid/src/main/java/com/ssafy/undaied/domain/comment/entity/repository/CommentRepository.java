package com.ssafy.undaied.domain.comment.entity.repository;

import com.ssafy.undaied.domain.comment.entity.Comments;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comments, Integer> {
    Page<Comments> findByBoard_BoardId(Integer boardId, Pageable pageable);
}
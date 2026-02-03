//***************************************************************************************
//
//     Filename: LoveNoteRepository.java
//     Author: Kyle McColgan
//     Date: 31 January 2026
//     Description: This file provides database functionality for the LoveNote entity.
//
//***************************************************************************************

package com.lovenotes.app.Data;

import com.lovenotes.app.Models.LoveNote;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface LoveNoteRepository extends CrudRepository<LoveNote, Integer>
{
    Optional<LoveNote> findByPublicToken(String token);
    List<LoveNote> findAllBySenderIdOrderByCreatedAtDesc(Integer senderId);
    Optional<LoveNote> findByIdAndSenderId(Integer id, Integer senderId);
}

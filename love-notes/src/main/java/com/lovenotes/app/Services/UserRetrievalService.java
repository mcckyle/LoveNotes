//***************************************************************************************
//
//     Filename: UserRetrievalService.java
//     Author: Kyle McColgan
//     Date: 31 January 2026
//     Description: This file provides shared user functionality.
//
//***************************************************************************************

package com.lovenotes.app.Services;

import com.lovenotes.app.Models.User;
import java.util.Optional;

//***************************************************************************************

public interface UserRetrievalService
{
    Optional<User> findByUsername(String username);
}

//***************************************************************************************

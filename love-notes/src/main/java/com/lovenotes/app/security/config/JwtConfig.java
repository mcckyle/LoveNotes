//***************************************************************************************
//
//     Filename: JwtConfig.java
//     Author: Kyle McColgan
//     Date: 31 January 2026
//     Description: This file contains the token configuration.
//
//***************************************************************************************

package com.lovenotes.app.security.config;

import com.lovenotes.app.security.jwt.JwtUtils;
import com.lovenotes.app.Services.UserService;
import org.springframework.context.annotation.Configuration;

//***************************************************************************************

@Configuration
public class JwtConfig
{
    private final JwtUtils jwtUtils;
    private final UserService userService;

    public JwtConfig(JwtUtils jwtUtils, UserService userService)
    {
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }
}

//***************************************************************************************

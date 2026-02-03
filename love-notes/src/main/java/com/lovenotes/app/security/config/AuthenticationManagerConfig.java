//***************************************************************************************
//
//     Filename: AuthenticationManagerConfig.java
//     Author: Kyle McColgan
//     Date: 31 January 2026
//     Description: This file implements a custom authentication bean.
//
//***************************************************************************************

package com.lovenotes.app.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

//***************************************************************************************

@Configuration
public class AuthenticationManagerConfig
{

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception
    {
        return authConfig.getAuthenticationManager();
    }
}

//***************************************************************************************

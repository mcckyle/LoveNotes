//***************************************************************************************
//
//     Filename: FilterConfig.java
//     Author: Kyle McColgan
//     Date: 31 January 2026
//     Description: This file holds the auth filter configuration.
//
//***************************************************************************************

package com.lovenotes.app.security.config;

import com.lovenotes.app.security.JwtAuthenticationFilter;
import com.lovenotes.app.security.UserDetailsServiceImpl;
import com.lovenotes.app.security.jwt.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//***************************************************************************************

@Configuration
public class FilterConfig
{
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtUtils jwtUtils, UserDetailsServiceImpl userDetailsService)
    {
        return new JwtAuthenticationFilter(jwtUtils, userDetailsService);
    }
}

//***************************************************************************************

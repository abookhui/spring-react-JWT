package com.kyonggi.backend.member.service;

import com.kyonggi.backend.member.dto.CustomUserDetails;
import com.kyonggi.backend.member.entity.UserEntity;
import com.kyonggi.backend.member.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity userData = userRepository.findByUsername(username).get();

        if (userData != null) {

            return new CustomUserDetails(userData);
        }


        return null;
    }
}

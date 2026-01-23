package com.example.Academy.service;

import com.example.Academy.dto.LoginRequestDTO;
import com.example.Academy.dto.LoginResponseDTO;

public interface AuthService {

    LoginResponseDTO login(LoginRequestDTO request)throws Exception;
    public String authenticate(String username, String password) throws Exception;
}

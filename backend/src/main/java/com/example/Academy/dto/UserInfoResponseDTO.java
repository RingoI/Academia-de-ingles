package com.example.Academy.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserInfoResponseDTO {

    private Long id;
    private List<String> roles;
    private String nombre;
}

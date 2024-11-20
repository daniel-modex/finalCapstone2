﻿using authApiNew.models;

namespace authApiNew.Services
{
    public interface IRegisterService
    {
        public Task<string> RegisterUser(RegisterRequestDto requestDto);
        public Task<LoginResponse> Login(LoginRequest loginRequest);
    }
}

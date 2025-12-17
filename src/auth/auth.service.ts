/**
 * Authentication Service
 * Handles user authentication and authorization logic.
 * Uses bcrypt for password hashing and JWT for secure token-based authentication.
 */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async registerUser(registerUserDto: RegisterUserDto) {
        // Hash the plaintext password using bcrypt with 10 salt rounds
        const hash = await bcrypt.hash(registerUserDto.password, 10);
        
        // Create user with hashed password (never store plaintext passwords)
        const user = await this.userService.createUser({
            ...registerUserDto,  // Spread all properties from DTO
            password: hash       // Override password with hashed version
        });

        const payload = {sub:user._id};
        const token = await this.jwtService.signAsync(payload);

        return token;
    }
}

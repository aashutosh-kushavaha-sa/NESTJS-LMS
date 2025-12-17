/**
 * Auth Controller
 * Handles authentication-related HTTP requests
 */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // Handles user registration
    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        // Delegate to auth service for user registration
        return await this.authService.registerUser(registerUserDto);
    }
}

/**
 * User Service
 * Handles all user-related database operations
 */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    // Creates a new user in the database
    async createUser(registerUserDto: RegisterUserDto) {
        try {
            // Create user with provided details
            return await this.userModel.create({
                fname: registerUserDto.fname,
                lname: registerUserDto.lname,
                email: registerUserDto.email,
                password: registerUserDto.password
            });
        } catch (error) {
            // Handle duplicate email error
            const DUPLICATE_KEY_CODE = 11000;
            if (error.code === DUPLICATE_KEY_CODE) {
                throw new ConflictException('Email is already taken');
            }
            throw error;
        }

        
    }
}

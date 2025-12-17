import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(registerUserDto:RegisterUserDto){

        try {
            return await this.userModel.create({
            fname : registerUserDto.fname,
            lname : registerUserDto.lname,
            email : registerUserDto.email,
            password : registerUserDto.password
        });
        } catch (error) {

            console.log(error)

            const DUPLICATE_KEY_CODE = 11000;
            if (error.code === DUPLICATE_KEY_CODE) {
                throw new ConflictException('Email is already taken');
            }
            throw error;
            
        }

        
    }
}

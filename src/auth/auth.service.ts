import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor(private userService : UserService){}

    async registerUser(registerUserDto: RegisterUserDto) {
        const hash = await bcrypt.hash(registerUserDto.password, 10);
        
        const user = await this.userService.createUser({
            ...registerUserDto,
            password: hash
        });

        console.log("User : ",user);

        return {};
    }   
}

import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {User} from "../user/shemas/users.shema";
import { createTransport} from 'nodemailer';
import { log } from 'console';


@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
                private jwtService: JwtService) {
    }

    private transporter = createTransport({
        // service: 'gmail',
        host:'smtp.gmail.com',
        port:587,
        //sdunfulnjemrsdzh
        secure:false,
        auth:{
            user: 'electionforyou@gmail.com',
            pass: 'sdunfulnjemrsdzh'
        },
    }, (error, info)=>{
        console.log(48888888888888888888888);
        if(error){
            console.log(error)
        }
        else {
            console.log(info)
        }
    });


    async endActivationMail(email: string, token:string){
        await this.transporter.sendMail({
            from:'electionforyou@gmail.com',
            to: email,
            subject: 'Activate your account',
            html: 'enter this code in the app: <strong>'+token+'</strong>'
        });
    }

    async signIn(username: string, pass: string, token=''): Promise<any> {
        const user = await this.usersService.findOneByLogin(username);
        console.log(user)
        if (user == null) {
            console.log('8888888888888888888888888');
            throw new UnauthorizedException();

        }
        const isMatch = await bcrypt.compare(pass, user?.password);
        console.log(isMatch);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        // const payload = { username: user.login, sub: user.id };
        console.log('//////////////');
        var upt = {
            _id: user._id,
            token: token
        }
        user.token = token
        console.log(await this.usersService.updatetoken(upt))
        console.log(await this.usersService.findOneByLogin(username));
        
        return {
            user: user,
            code:token
        };
        //access_token: await this.jwtService.signAsync(payload),

    }
    async confirmLogin(username: string, pass: string, token: string): Promise<any> {
        console.log('99999999999999999999999');
        const user = await this.usersService.findOneByLogin(username);
        if (user == null)
            throw new UnauthorizedException();
        const isMatch = await bcrypt.compare(pass, user?.password);
        console.log(isMatch);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        console.log('99999999999999999999999');
        if(user.token != token){
            throw new UnauthorizedException();
        }
        const payload = { username: user.login, sub: user._id };
        return {
            user: user,
            access_token: await this.jwtService.signAsync(payload)
        };

    }
}

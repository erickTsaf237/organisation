import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
     signIn(@Body() signInDto: Record<string, any>) {
        console.log(signInDto)
        const token = (Math.floor(Math.random() * 90) + 10) + '' + (Math.floor(Math.random() * 90) + 10) + '' + (Math.floor(Math.random() * 90) + 10);
        this.authService.endActivationMail(signInDto.login, token)
        // console.log('ppppppppppppppppppppppp');
        return this.authService.signIn(signInDto.login, signInDto.password, token);
    }

    @HttpCode(HttpStatus.OK)
    @Post('activate')
    confirm(@Body() signInDto: Record<string, any>) {
        return this.authService.confirmLogin(signInDto.login, signInDto.password, signInDto.token);
    }
}

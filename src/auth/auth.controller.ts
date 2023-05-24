import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    signIn(@Body() signInDto: Record<string, any>) {
        console.log(signInDto)
        const token = (Math.floor(Math.random() * 90) + 10) + '' + (Math.floor(Math.random() * 90) + 10) + '' + (Math.floor(Math.random() * 90) + 10);
        if(signInDto.identite==null)
            return {error: true, message: 'give your identity'};
        if (signInDto.identite == 'admin')
            return this.authService.signIn(signInDto.login, signInDto.password,'admin', token);
        else if (signInDto.identite == 'employe')
            return this.authService.signIn(signInDto.login, signInDto.password,'employe', token);
        else
            return {error: true, message: 'give a valid identity either admin or employe'};
    }

    @HttpCode(HttpStatus.OK)
    @Post('activate')
    confirm(@Body() signInDto: Record<string, any>) {
        if (signInDto.identite == 'admin')
            return this.authService.confirmLogin(signInDto.login, signInDto.password,'admin', signInDto.token);
        else if (signInDto.identite == 'employe')
            return this.authService.confirmLogin(signInDto.login, signInDto.password,'employe', signInDto.token);
        else
            return {error: true, message: 'give your identity'};

    }
}

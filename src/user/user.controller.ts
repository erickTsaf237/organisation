import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./shemas/users.shema";
import {AuthGuard} from "../auth/auth.guard";

@Controller('user')
export class UserController {
    constructor(public userServiec: UserService) {
    }

    @Post()
    createUser(@Body() newUser: User){
        console.log(newUser);
        return this.userServiec.create(newUser)
    }

    @Get('all')
    getAll(){
        return this.userServiec.findAll();
    }
    @Get(':id')
    getone(@Param('id') id){
        return this.userServiec.findOne(id);
    }

    @Delete(':id')
    deleteUser(@Param('id' ) id){
        return this.userServiec.remove(id);
    }

    // @UseGuards(AuthGuard)
    @Put()
    updateUser(@Body() newUser: User){
        return this.userServiec.update(newUser)
    }
}

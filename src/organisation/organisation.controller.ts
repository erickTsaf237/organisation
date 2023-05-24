import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import {OrganisationService} from "./organisation.service";
import {Organisation} from "./schema/organisation.schema";

@Controller('organisation')
export class OrganisationController {
    constructor(public organisationService: OrganisationService) {}

    @Post()
    create(@Body() organisation: Organisation){
        console.log(organisation);
        return this.organisationService.create(organisation)
    }

    @Get('')
    verify(){
        return "you ar connected";
    }

    //@UseGuards(AuthGuard)
    @Get('all/:id')
    getAll(@Param('id')id: string){
        return this.organisationService.findAll(id);
    }
    //@UseGuards(AuthGuard)
    @Get('user/:id')
    getOne(@Param('id') id){
        return this.organisationService.findOne(id);
    }
    @Get(':id')
    getOneById(@Param('id') id){
        return this.organisationService.findOneByPK(id);
    }
    // @UseGuards(AuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id){
        return this.organisationService.remove(id);
    }
    //@UseGuards(AuthGuard)

    // @UseGuards(AuthGuard)
    @Put()
    updateUser(@Body() organisation: Organisation){
        console.log(organisation);
        return this.organisationService.update(organisation)
    }

}

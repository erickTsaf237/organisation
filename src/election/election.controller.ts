import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Election} from "./schema/election.schema";
import {ElectionService} from "./election.service";

@Controller('election')
export class ElectionController {

    constructor(private electionService: ElectionService) {
    }

    @Post()
    create(@Body()newObject:Election){
        console.log(newObject);
        return this.electionService.create(newObject);
    }

    @Put()
    update(@Body() updatedObject:Election){
        console.log(updatedObject)
        return this.electionService.update(updatedObject);
    }

    @Delete(':id')
    deleteOne(@Param('id')id:string){
        return this.electionService.deleteOne(id);
    }
    @Get('/all')
    getAll(){
        console.log('oooooooooooooooooooooo')
        return this.electionService.getAll()
    }

    @Get('/:id')
    getOne(@Param('id')id:string){
        return this.electionService.getOne(id)
    }

    @Get('/organisation/:id')
    getOrganisationElections(@Param('id')id_organisation:string){
        return this.electionService.getOrganistaionElections(id_organisation)
    }

}

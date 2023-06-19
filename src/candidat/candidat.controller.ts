import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Election} from "../election/schema/election.schema";
import {CandidatService} from "./candidat.service";
import {Candidat} from "./schema/candidat.schema";

@Controller('candidat')
export class CandidatController {
    constructor(private candidatService: CandidatService) {
    }

    @Post()
    create(@Body()newObject:Candidat){
        console.log(newObject);
        return this.candidatService.create(newObject);
    }

    @Put()
    update(@Body() updatedObject:Election){
        console.log(updatedObject)
        return this.candidatService.update(updatedObject);
    }

    @Delete(':id')
    deleteOne(@Param('id')id:string){
        return this.candidatService.deleteOne(id);
    }

    @Delete('/election/:id')
    deleteElectionCandidats(@Param('id')id:string){
         this.candidatService.deleteManyByParen(id);
         return true;
    }
    @Get('/all')
    getAll(){
        console.log('oooooooooooooooooooooo')
        return this.candidatService.getAll()
    }

    @Get('/:id')
    getOne(@Param('id')id:string){
        return this.candidatService.getOne(id)
    }

    @Get('/election/:id')
    getElectionsCandidat(@Param('id')id_organisation:string){
        return this.candidatService.getElectionsCandidat(id_organisation)
    }
}

import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {VoteService} from "./vote.service";
import {Vote} from "./schema/vote.schema";

@Controller('vote')
export class VoteController {
    constructor(private voteService: VoteService) {
    }

    @Post('/machine')
    create(@Body()newObject:Vote){
        console.log(newObject);
        return this.voteService.create(newObject);
    }

    @Get('/election/candidat/:id_election/:id_candidat')
    getResultFromElectionAndCadidatId(@Param('id_election') id_election: string, @Param('id_candidat') id_candidat: string){
        return this.voteService.getResultFromElectionAndCadidatId(id_election, id_candidat);
    }

    @Put()
    update(@Body() updatedObject:Vote){
        console.log(updatedObject)
        return this.voteService.update(updatedObject);
    }

    @Delete(':id')
    deleteOne(@Param('id')id:string){
        return this.voteService.deleteOne(id);
    }
    @Get('/all')
    getAll(){
        console.log('oooooooooooooooooooooo')
        return this.voteService.getAll()
    }

    @Get('/:id')
    getOne(@Param('id')id:string){
        return this.voteService.getOne(id)
    }

    @Get('/election/:id')
    getElectionVotes(@Param('id')id_organisation:string){
        return this.voteService.getElectionVotes(id_organisation)
    }@Get('/candidat/:id')
    getCandidatVote(@Param('id')id_organisation:string){
        return this.voteService.getCandidatVote(id_organisation)
    }@Get('/bureau/:id')
    getBureauVote(@Param('id')id_organisation:string){
        return this.voteService.getBureauVote(id_organisation)
    }
}

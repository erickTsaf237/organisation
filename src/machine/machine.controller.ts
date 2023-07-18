import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Vote} from "../vote/schema/vote.schema";
import {MachineService} from "./machine.service";
import {Machine} from "./schema/machine.schema";
import {ElecteurService} from "../electeur/electeur.service";

@Controller('machine')
export class MachineController {
    constructor(private machineService: MachineService,) {
    }

    @Post()
    create(@Body()newObject:Machine){
        console.log(newObject);
        return this.machineService.create(newObject);
    }

    @Put()
    update(@Body() updatedObject:Vote){
        console.log(updatedObject)
        return this.machineService.update(updatedObject);
    }

    @Put('/employe/election/electeur/:id_employe/:id_election/:id_electeur')
    async updateVotingElecteurFromElection(@Param('id_employe') id_employe: string, @Param('id_election') id_election: string, @Param('id_electeur') id_electeur: string) {
        console.log(id_employe, id_election, id_electeur)
        // await new Promise(resolve => setTimeout(resolve, 2000));
        let a = await this.machineService.updateVotingElecteurFromElection(id_employe, id_election, id_electeur);
        console.log(a);
        /*let i = 0;
        while (!a && i < 5) {
            console.log('tour '+i);
            await new Promise(resolve => setTimeout(resolve, 2000));
            a = await this.machineService.updateVotingElecteurFromElection(id_employe, id_election, id_electeur);
            i++
        }*/
        return a;

    }

    @Delete('/:id')
    deleteOne(@Param('id')id:string){
        return this.machineService.deleteOne(id);
    }
    /*@Get('/all')
    getAll(){
        console.log('oooooooooooooooooooooo')
        return this.machineService.getAll()
    }*/

    @Get('/:id')
    getOne(@Param('id')id:string){
        return this.machineService.getOne(id)
    }
    @Get('/machineIsReady/:id/:id_employe')
    isMachineReadyToVote(@Param('id')id:string, @Param('id_employe')id_employe:string){
        return this.machineService.isMachineReadyToVote(id, id_employe);
    }
    @Put('/confirm/:id/:id_electeur')
    confirmElector(@Param('id')id:string, @Param('id_electeur')id_electeur:string){
        return this.machineService.confirmIdElector(id, id_electeur);
    }
    @Put('/reinitialiser/:id/:id_electeur')
    reinitialiser(@Param('id')id:string, @Param('id_electeur')id_electeur:string){
        return this.machineService.reinitialiser(id);
    }


    @Get('/election/:id')
    getElectionMachine(@Param('id')id_organisation:string){
        return this.machineService.getAllByElectionId(id_organisation)
    }
    @Get('/bureau/:id')
    getCandidatVote(@Param('id')id_bureau:string){
        return this.machineService.getMachineByBureauxId(id_bureau)
    }
    /*@Get('/bureau/:id')
    getBureauVote(@Param('id')id_organisation:string){
        return this.machineService.getBureauVote(id_organisation)
    }*/
}

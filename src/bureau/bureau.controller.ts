import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {BureauService} from "./bureau.service";
import {Bureau} from "./schema/bureau.schema";

@Controller('bureau')
export class BureauController {

    constructor(private bureauService: BureauService) {
    }

    @Post()
    create(@Body()newObject:Bureau){
        console.log(newObject);
        return this.bureauService.create(newObject);
    }

    @Put()
    update(@Body() updatedObject:Bureau){
        console.log(updatedObject)
        return this.bureauService.update(updatedObject);
    }

    @Delete(':id')
    deleteOne(@Param('id')id:string){
        return this.bureauService.deleteOne(id);
    }
    @Get('/all')
    getAll(){
        console.log('oooooooooooooooooooooo')
        return this.bureauService.getAll()
    }

    @Get('/:id')
    getOne(@Param('id')id:string){
        return this.bureauService.getOne(id)
    }

    @Get('/election/:id')
    getElectionsBureaux(@Param('id')id_organisation:string){
        return this.bureauService.getElectionsBureaux(id_organisation)
    }
    @Get('/section/:id')
    getSecionBureaux(@Param('id')id_organisation:string){
        return this.bureauService.getSectionsBureaux(id_organisation)
    }
    @Get('/section/:id_section/:id_election')
    getSecionElectionBureaux(@Param('id')id_section:string, @Param('id')id_election:string){
        return this.bureauService.getSectionsElectionBureaux(id_section, id_election)
    }
    // @Get('/responsable/:id')
    // getresponsableBureaux(@Param('id')id_org anisation:string){
    //     return this.bureauService.getElectionsBureaux(id_organisation)
    // }
    // @Get('/election/:id')
    // getElectionsBureaux(@Param('id')id_organisation:string){
    //     return this.bureauService.getElectionsBureaux(id_organisation)
    // }
    // @Get('/election/:id')
    // getElectionsBureaux(@Param('id')id_organisation:string){
    //     return this.bureauService.getElectionsBureaux(id_organisation)
    // }

    @Get('/free/employe/:id_election/:id_responsable')
    getOrganisationSections(@Param('id_election')id_election:string,@Param('id_responsable')id_responsable:string){
        return this.bureauService.employeIsFree(id_election, id_responsable)
    }

    @Get('/section/election/:id_section/:id_election')
    getAllByElectionSection(@Param('id_election')id_election:string,@Param('id_section')id_section:string){
        console.log({id_section, id_election})
        return this.bureauService.getAllByElectionSection(id_election, id_section);
    }
    @Get('/election/:id_election')
    getAllByElection(@Param('id_election')id_election:string){
        return this.bureauService.getAllByElection(id_election);
    }
}

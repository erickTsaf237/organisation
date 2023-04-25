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
        return this.bureauService.getElectionsBureaux(id_organisation)
    }
    // @Get('/responsable/:id')
    // getresponsableBureaux(@Param('id')id_organisation:string){
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
}

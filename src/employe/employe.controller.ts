import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Section} from "../section/schema/section.shema";
import {EmployeService} from "./employe.service";
import {Employe} from "./schema/employe.schema";

@Controller('employe')
export class EmployeController {
    constructor(private employeService: EmployeService) {
    }

    @Post()
    create(@Body()newObject:Employe){
        console.log(newObject);
        return this.employeService.create(newObject);
    }

    @Put()
    update(@Body() updatedObject:Section){
        console.log(updatedObject)
        return this.employeService.update(updatedObject);
    }

    @Delete(':id')
    deleteOne(@Param('id')id:string){
        return this.employeService.deleteOne(id);
    }
    @Get('/all')
    getAll(){
        console.log('oooooooooooooooooooooo')
        return this.employeService.getAll()
    }

    @Get('/:id')
    getOne(@Param('id')id:string){
        return this.employeService.getOne(id)
    }

    @Get('/section/:id')
    getOrganisationSections(@Param('id')id_organisation:string){
        return this.employeService.getsectionEmployes(id_organisation)
    }
}

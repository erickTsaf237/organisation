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
        console.log(id);
        return this.employeService.getOne(id)
    }
    @Get('/:id/password')
    getOne2(@Param('id')id:string,@Param('password')password:string){
        console.log(id);
        return this.employeService.getOnePass(id, password)
    }

    @Get('/section/:id_section')
    getOrganisationSections(@Param('id_section')id_section:string){
        return this.employeService.getsectionEmployes(id_section)
    }


}

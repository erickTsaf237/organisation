import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {SectionService} from "./section.service";
import {Section} from "./schema/section.shema";

@Controller('section')
export class SectionController {
    constructor(private sectionService: SectionService) {
    }

    @Post()
    create(@Body()newObject:Section){
        console.log(newObject);
        return this.sectionService.create(newObject);
    }

    @Put()
    update(@Body() updatedObject:Section){
        console.log(updatedObject)
        return this.sectionService.update(updatedObject);
    }

    @Delete(':id')
    deleteOne(@Param('id')id:string){
        return this.sectionService.deleteOne(id);
    }
    @Get('/all')
    getAll(){
        console.log('oooooooooooooooooooooo')
        return this.sectionService.getAll()
    }

    @Get('/:id')
    getOne(@Param('id')id:string){
        return this.sectionService.getOne(id)
    }

    @Get('/organisation/:id')
    getOrganisationSections(@Param('id')id_organisation:string){
        return this.sectionService.getOrganistaionSections(id_organisation)
    }

    @Get('/ville/organisation/:id')
    getOrganisationSectionsVille(@Param('id')id_organisation:string){
        console.log('888888888888888888888888888888888888888888888888888888888')
        return this.sectionService.getOrganistaionSectionsVlle(id_organisation)
    }
}

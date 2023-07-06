import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CandidatService} from "./candidat.service";
import {Candidat} from "./schema/candidat.schema";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer'
import {extname} from 'path'
import {delay} from "rxjs";

@Controller('candidat')
export class CandidatController {
    constructor(private candidatService: CandidatService) {
    }

    @Post()
    create( @Body() newObject: Candidat) {
        console.log(newObject);

        return this.candidatService.create(newObject);
    }

    @Put()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, callback) => {
                console.log(file)
                const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const extension = extname(file.originalname);
                callback(null, `${name}${extension}`);
            },

        }), limits: {fileSize: 50 * 1024  * 1024},
    }))
    update(@UploadedFile() file,@Body() updatedObject: Candidat) {
        console.log(file)
        // console.log()
        console.log(updatedObject)
        if (file != null)
            updatedObject.image = file.filename;
        // console.log(updatedObject)
        return this.candidatService.update(updatedObject);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.candidatService.deleteOne(id);
    }

    @Delete('/election/:id')
    deleteElectionCandidats(@Param('id') id: string) {
        this.candidatService.deleteManyByParen(id);
        return true;
    }

    @Get('/all')
    getAll() {
        console.log('oooooooooooooooooooooo')
        return this.candidatService.getAll()
    }

    @Get('/:id')
    getOne(@Param('id') id: string) {
        return this.candidatService.getOne(id)
    }

    @Get('/election/:id')
    async getElectionsCandidat(@Param('id') id_organisation: string) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        // console.log('Deux secondes se sont écoulées');
        return this.candidatService.getElectionsCandidat(id_organisation)
    }
}

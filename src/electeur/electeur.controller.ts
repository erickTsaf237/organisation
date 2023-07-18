import {Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ElectionService} from "../election/election.service";
import {Election} from "../election/schema/election.schema";
import {diskStorage} from 'multer'
import {ElecteurService} from "./electeur.service";
import {Electeur} from "./schema/electeur.schema";
import {FileInterceptor} from "@nestjs/platform-express";
import {extname} from "path";
import {Candidat} from "../candidat/schema/candidat.schema";

@Controller('electeur')
export class ElecteurController {

    constructor(private electeurService: ElecteurService) {
    }

    @Post()
    create(@Body()newObject:Electeur){
        console.log(newObject);
        return this.electeurService.create(newObject);
    }

    @Post('/electeur')
    @UseInterceptors(FileInterceptor('photo_electeur', {

            storage: diskStorage({
                destination: './upload',
                filename: (req, file1, callback) => {
                    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    const extension = extname(file1.originalname);
                    callback(null, `${name}${extension}`);
                },

            }), limits: {fileSize: 5 * 1024  * 1024},
    }))
    update(@UploadedFile() file1,@Body() updatedObject: Electeur) {
        console.log(file1)
        console.log(file1)
        // console.log()
        // console.log(updatedObject)
        // if (file != null)
            // updatedObject.image = file.filename;
        // console.log(updatedObject)
        // return this.electeurService.create(updatedObject);
    }

    @Put('/reponse/:id')
    repondreEleceteur(@Param('id') id, @Body() reponse:Electeur){
        return this.electeurService.repondreDemmande(id, reponse)
    }

    @Put('/photo_electeur/:id')
    @UseInterceptors(FileInterceptor('photo_electeur', {

        storage: diskStorage({
            destination: './upload',
            filename: (req, file, callback) => {
                const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const extension = extname(file.originalname);
                callback(null, `${name}${extension}`);
            },

        }), limits: {fileSize: 5 * 1024  * 1024},
    }))
    updatePhoto_electeur(@UploadedFile() file,@Body() updatedObject: Electeur, @Param('id') id:string){
        // console.log(file)
        if (file != null)
            updatedObject.photo_electeur = file.filename;
        // console.log(updatedObject)
        return this.electeurService.putPhoto_electeur(updatedObject, id);
    }
    @Put('/photo_cni_avant/:id')
    @UseInterceptors(FileInterceptor('photo_cni_avant', {

        storage: diskStorage({
            destination: './upload',
            filename: (req, file, callback) => {
                const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const extension = extname(file.originalname);
                callback(null, `${name}${extension}`);
            },

        }), limits: {fileSize: 5 * 1024  * 1024},
    }))
    updatePhoto_avant(@UploadedFile() file,@Body() updatedObject: Electeur, @Param('id') id:string){
        // console.log(file)
        if (file != null)
            updatedObject.photo_cni_avant = file.filename;
        // console.log(updatedObject)
        return this.electeurService.putPhoto_cni_avant(updatedObject, id);
    }
    @Put('/photo_cni_arriere/:id')
    @UseInterceptors(FileInterceptor('photo_cni_arriere', {

        storage: diskStorage({
            destination: './upload',
            filename: (req, file, callback) => {
                const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const extension = extname(file.originalname);
                callback(null, `${name}${extension}`);
            },
        }), limits: {fileSize: 5 * 1024  * 1024},
    }))
    updatePhoto_arriere(@UploadedFile() file,@Body() updatedObject: Electeur, @Param('id') id:string){
        // console.log(file)
        if (file != null)
            updatedObject.photo_cni_arriere = file.filename;
        // console.log(updatedObject)
        return this.electeurService.putPhoto_cni_arriere(updatedObject, id);
    }

    @Get('/section/:id')
    getElecteurBySectionId(@Param('id')id_Section:string){
        return this.electeurService.getElecteurBySectionId(id_Section)
    }
    @Get('/bureau/:id')
    getElecteurByBureauId(@Param('id')id_bureau:string){
        return this.electeurService.getElecteurByBureauId(id_bureau)
    }
    @Get('/election/:id/:id_election')
    getElecteurByIdAndElectionId(@Param('id')id:string, @Param('id_election')id_election:string) {
        return this.electeurService.getElecteurByIdAndElectionId(id, id_election)
    }

    @Get('/user/election/:id_user/:id_election')
    getElecteurByElectionIdAndUserId(@Param('id_user')id_user:string, @Param('id_election')id_election:string) {
        return this.electeurService.getElecteurByElectionIdAndUserId(id_user, id_election)
    }
    @Get('/election/:id')
    getElecteurByElectionId(@Param('id')id_bureau:string){
        return this.electeurService.getElecteurByElectionId(id_bureau)
    }

}

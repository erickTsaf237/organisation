import {Body, Controller, Post} from '@nestjs/common';
import {ElectionService} from "../election/election.service";
import {Election} from "../election/schema/election.schema";
import {ElecteurService} from "./electeur.service";
import {Electeur} from "./schema/electeur.schema";

@Controller('electeur')
export class ElecteurController {

    constructor(private electeurService: ElecteurService) {
    }

    @Post()
    create(@Body()newObject:Electeur){
        console.log(newObject);
        return this.electeurService.create(newObject);
    }
}

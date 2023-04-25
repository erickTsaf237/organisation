import { Injectable } from '@nestjs/common';
import {Test} from "./schema/test.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class TestService {


    constructor(@InjectModel(Test.name) private testModel: typeof Model<Test>) {
    }

    create(newTest: Test) {
        const boo = new this.testModel(newTest);
        return boo.save();
    }
}

import {Body, Controller, Post} from '@nestjs/common';
import {TestService} from "./test.service";
import {Test} from "./schema/test.schema";

@Controller('test')
export class TestController {


    constructor(private testSevice: TestService) {
    }
    @Post()
    createTest(@Body() newTest: Test){
        console.log(newTest);
        return this.testSevice.create(newTest);
    }

}

import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {UserModule} from './user/user.module';
import {User} from "./user/model/user.model";
import {AuthModule} from './auth/auth.module';
import { OrganisationModule } from './organisation/organisation.module';
import {OrganisationModel} from "./organisation/model/organisation.model";
import { ElectionModule } from './election/election.module';
import {MongooseModule} from "@nestjs/mongoose";
import { TestModule } from './test/test.module';
import {SectionModule} from "./section/section.module";
import { EmployeModule } from './employe/employe.module';
import { CandidatModule } from './candidat/candidat.module';
import { BureauModule } from './bureau/bureau.module';
import { VoteModule } from './vote/vote.module';
import { ElecteurModule } from './electeur/electeur.module';
SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'mysql-120452-0.cloudclusters.net',
    port: 18735,
    username: 'voting_user',
    password: '101156204',
    // password: 'voting_user$!10115620*/',
    database: 'voting',
    models: [User, OrganisationModel],
    autoLoadModels: true,
    synchronize: true,

})
//https://clients.cloudclusters.io/applications
// host: 'mysql-120452-0.cloudclusters.net',
@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'voting',
            models: [/*User, OrganisationModel*/],
            // autoLoadModels: true,
            synchronize: true,
            logQueryParameters: true,
            // autoLoadModels: true,
        }),
        //UcaBdudoev48EVofyAdlaeklcuhBZqXzSxAQiCTsH0n43m3AQA6Ik1PtP7YFgrpf
        MongooseModule.forRoot('mongodb+srv://ericktsafack2017:qfUDElkBLAvI9fSQ@cluster0.akq9xl8.mongodb.net/voting?retryWrites=true&w=majority'),
        // MongooseModule.forRoot('mongodb://127.0.0.1:27017/voting'),
        UserModule,
        AuthModule,
        OrganisationModule,
        ElectionModule,
        SectionModule,
        EmployeModule,
        CandidatModule,
        BureauModule,
        VoteModule,
        ElecteurModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

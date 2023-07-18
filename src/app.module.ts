import {MiddlewareConsumer, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import { OrganisationModule } from './organisation/organisation.module';
import { ElectionModule } from './election/election.module';
import {MongooseModule} from "@nestjs/mongoose";
import {SectionModule} from "./section/section.module";
import { EmployeModule } from './employe/employe.module';
import { CandidatModule } from './candidat/candidat.module';
import { BureauModule } from './bureau/bureau.module';
import { VoteModule } from './vote/vote.module';
import { ElecteurModule } from './electeur/electeur.module';
import { JwtModule } from '@nestjs/jwt';
// import { JwtMiddleware } from './jwt.middleware';
import { MachineModule } from './machine/machine.module';

//https://clients.cloudclusters.io/applications
// host: 'mysql-120452-0.cloudclusters.net',
@Module({
    imports: [
        JwtModule.register({
            secret: 'my-secret-key',
            signOptions: { expiresIn: '1h' },
        }),
        ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'upload' )}),
        // ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'logs'), serveRoot: '/logs', }),
        //UcaBdudoev48EVofyAdlaeklcuhBZqXzSxAQiCTsH0n43m3AQA6Ik1PtP7YFgrpf
        // MongooseModule.forRoot('mongodb+srv://ericktsafack2017:6M4Imu7FH3u0ubGL@cluster0.akq9xl8.mongodb.net//voting?retryWrites=true&w=majority'),
        MongooseModule.forRoot(process.env.DATABASE_URL ||'mongodb+srv://ericktsafack2017:qfUDElkBLAvI9fSQ@cluster0.akq9xl8.mongodb.net/voting?retryWrites=true&w=majority'),
        // MongooseModule.forRoot('mongodb://127.0.0.1:27017/voting'),
        // MongooseModule.forRoot(process.env.DATABASE_URL ||'mongodb+srv://ericktsafack2017:qfUDElkBLAvI9fSQ@cluster0.akq9xl8.mongodb.net/voting?retryWrites=true&w=majority'),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/voting'),
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
        MachineModule,

    ],
    controllers: [AppController],
    providers: [AppService, ],
})
export class AppModule {

}

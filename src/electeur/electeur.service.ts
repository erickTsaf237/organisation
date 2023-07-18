import {Injectable} from '@nestjs/common';
import {Electeur} from "./schema/electeur.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {createTransport} from 'nodemailer';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class ElecteurService {


    constructor(@InjectModel(Electeur.name) private electeur: typeof Model<Electeur>,
                private jwtService: JwtService) {
    }

    private transporter = createTransport({

        host: 'smtp.gmail.com',
        port: 587,
        //sdunfulnjemrsdzh
        secure: false,
        auth: {
            user: 'electionforyou@gmail.com',
            pass: 'ytrvgoiakofzijel'
            // pass: 'sdunfulnjemrsdzh'
        }, tls: {
            rejectUnauthorized: false // accept self-signed certificates
        }

    }, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(info)
        }
    });


    async sendValidationtionMail(email: string, token: string) {
        if (token === 'valide') {
            await this.transporter.sendMail({
                from: 'electionforyou@gmail.com',
                to: email,
                subject: 'Enregistrement',
                html: 'Feliitation, vous ete maintenant electeur.'
            });
        } else {
            await this.transporter.sendMail({
                from: 'electionforyou@gmail.com',
                to: email,
                subject: 'Enregistrement',
                html: 'Votre demande d\'enregistrement a ete rejete, veuille la corriger.'
            });
        }
    }


    async create(newObject: Electeur) {
        const electeur = await this.getOneByIdAndCNINumber(newObject.numero_de_cni, newObject.id_election);
        if ((electeur == true)) {
            const elec = new this.electeur(newObject);
            return elec.save();
        }
        throw Error('cet Electeur est deja present');
    }

    async getOneByIdAndCNINumber(cni: string, electionId) {
        const elec = await this.electeur.findOne({numero_de_cni: cni, id_election: electionId});
        console.log(elec);
        if (elec != null) {
            return elec;
        }
        return true;
    }

    putPhoto_electeur(updatedObject: Electeur, id: string) {
        return this.electeur.findOneAndUpdate({_id: id}, {'photo_electeur': updatedObject.photo_electeur,}, {new: true})
    }

    putPhoto_cni_avant(updatedObject: Electeur, id: string) {
        return this.electeur.findOneAndUpdate({_id: id}, {'photo_cni_avant': updatedObject.photo_cni_avant,}, {new: true})
    }

    putPhoto_cni_arriere(updatedObject: Electeur, id: string) {
        return this.electeur.findOneAndUpdate({_id: id}, {'photo_cni_arriere': updatedObject.photo_cni_arriere,}, {new: true})
    }


    getElecteurBySectionId(id_Section: string) {
        return this.electeur.find({id_section: id_Section, valide: {$ne: 'valide'}})//find({id_section:id_Section})
    }

    repondreDemmande(id, reponse: Electeur) {
        console.log(this.electeur)
        return  this.electeur.findOneAndUpdate({_id: id}, {
            id_bureau: reponse.id_bureau,
            valide: reponse.valide
        }).then(() => {
            return this.sendValidationtionMail(reponse.email, reponse.valide).then(() => {
                console.log('le message a ete envoye');
            });
        }).catch((err) => {
            console.log('Echec d\'evoi du mail');
            console.log(err)
        })
    }

    getElecteurByBureauId(id_bureau: string) {
        return this.electeur.find({id_bureau: id_bureau, valide: 'valide'})
    }

    getElecteurByElectionId(id_election: string) {
        return this.electeur.find({id_election: id_election, valide: {$ne: 'valide'}})
    }

    getElecteurByIdAndElectionId(id: string, id_election: string) {
        return this.electeur.findOne({_id:id ,id_election: id_election, valide: 'valide', })
    }

    getElecteurByElectionIdAndUserId(id_user: string, id_election: string) {
        return this.electeur.findOne({id_user:id_user ,id_election: id_election, valide:'valide', })
    }
}

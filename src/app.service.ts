import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Bonjour et bienvenue sur le serveur distant du systeme d'AUTOMATISATION DU PROCESSUS ÉLECTORALE PRESIDENTIEL AU CAMEROUN. j'espere que cette page vous est utile. cordialement Tsafack Nteudem Erick";
  }
}

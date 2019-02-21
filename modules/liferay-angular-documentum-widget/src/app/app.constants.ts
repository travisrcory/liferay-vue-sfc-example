import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    //public server = 'http://localhost:5000/';
    public server = 'https://dlintap303.dev.desjardins.com:9443/api/gestion-electronique-document/acces-document/v1';

    public static BASE_URL = 'https://dlintap303.dev.desjardins.com:9443/api/gestion-electronique-document/acces-document/v1';  
    public static CABINET_OBJECT_ID = "0cd6e290803da724"; 
    public static DOCBASE = "desjardins_dev04_006";     // le cabinet de DCR
    public static OBJECT_TYPE_DOSSIER = "djdcr_dossier"; 
    public static OBJECT_TYPE_DOCUMENT = "djdcr_document"; 
}
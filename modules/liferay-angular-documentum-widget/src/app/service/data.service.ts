import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

    objectId: string = "";
    linkDocumentUrl: string = "";
    objectMetadataId: string = "";
    objectMetadataType: string = "";

    setObjectId(objectId: string){
            this.objectId = objectId;
    } 

    setLinkDocumentUrl(linkDocumentUrl: string){
        this.linkDocumentUrl = linkDocumentUrl;
   }

    setObjectMetadataId(objectMetadataId: string){
                this.objectMetadataId = objectMetadataId;
    }

    setObjectMetadataType(objectMetadataType: string){
         this.objectMetadataType = objectMetadataType;
    }

}
export class FolderElement {
    id: string;
    position: number;
    name: string;    
    weight: string;
    datecreation: string;
    action: string;
    isFolder: boolean;
    type: string;
    contentType: string;

    constructor(id: string, position: number,  name: string,    
       weight: string,  datecreation: string,
       action: string,  isFolder: boolean,
       type: string, contentType: string
       ) 
       {
         this.id = id;
         this.position = position;
         this.name = name;
         this.weight = weight;
         this.datecreation = datecreation;
         this.action = action;
         this.isFolder= isFolder;
         this.type= type;
         this.contentType= contentType;
       }
  }
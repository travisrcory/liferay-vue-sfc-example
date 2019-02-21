import { Component, OnInit } from '@angular/core';
import { SelectableSettings } from '@progress/kendo-angular-treeview';
import { FolderDataService } from '../service/folder.data.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { FoldersService } from '../service/folders.service';
import { DataService } from '../service/data.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { FunctionUtils } from '../utils/function.utils'; 

@Component({
  selector: 'app-file-explorer-treeview',
  templateUrl: '/o/liferay-angular-documentum-widget/app/file-explorer-treeview.component.html',
  styleUrls: ['/o/liferay-angular-documentum-widget/css/file-explorer-treeview.component.css']
})
export class FileExplorerTreeviewComponent {

    counter: number;
    message:string;
    folderObjectId:string;
    loading: boolean;
    categories: Observable<any[]>;
    

    constructor(
        private foldersService: FoldersService,
        private folderDataService: FolderDataService,
        private slimLoadingBarService: SlimLoadingBarService, 
        private dataService: DataService) {  
                 
    }
  
    public expandedKeys: any[] = ['0', '1']; // Par defaut, c'est toujours le parent est expandable
    public selectedKeys: any[] = ['0'];

    public iconClass({ text, items }: any): any {
      return {
          'k-i-file-pdf': FunctionUtils.isFileTypeEqExt(text, 'pdf'),
          //'k-i-folder': items !== undefined,
          'k-i-folder': true,// forcer qu'il s'agit toujours de repertoire
          'k-i-html': FunctionUtils.isFileTypeEqExt(text, 'html'),
          'k-i-image': FunctionUtils.isFileTypeEqExt(text, 'jpg|png'),
          'k-icon': true
      };
    }

    public info(message: string) {
    }

    public error(message: string) {
    }

    public ngOnInit(): void {        

        this.loading = true;
        this.slimLoadingBarService.start();
        this.foldersService.fetchFoldersSubCabinet().subscribe((data: any[]) => 
            this.categories = of(data), // Conversion en Observable
            
            error => () => {
                this.error('Something went wrong ...');
            },
            () => {  
                
                //this.dataService.setObjectId(this.getCategoriesByIndex(0));
                //this.dataService.setObjectId( this.categories[0].content.properties.r_object_id);  
                this.loading = false;   
                this.info('Arbre de navigation complete ...');
                this.slimLoadingBarService.complete();
        });         
    }

    getCategoriesByIndex(selectedParentindex: number) : string {    
        this.categories.subscribe( data => {
            console.log(data[selectedParentindex].content.properties.r_object_id);
            return data[selectedParentindex].content.properties.r_object_id;
        });
        return "";
    }

    public hasChildren = (item: any) : boolean =>  !!item.content;

    public fetchChildren = (item: any) => this.foldersService.fetchFolderByParentFolderId(item.content.properties.r_object_id);

    public handleSelection(event){
        let dataItem = event.dataItem;
        this.folderObjectId = dataItem.content.properties.r_object_id;
        this.dataService.setObjectId(dataItem.content.properties.r_object_id);
    }

}

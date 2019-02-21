import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { FolderElement } from '../../documents/documents-list-table/model/folder-element';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../service/data.service';
import { FoldersService } from '../../service/folders.service';
import { map } from 'rxjs/operators/map';

import { Configuration } from '../../app.constants';
import { FunctionUtils } from '../../utils/function.utils';

const ELEMENT_DATA: FolderElement[] = [];


/**
 * @title Table with sorting
 */

@Component({
  selector: 'app-documents-list-table',
  templateUrl: '/o/liferay-angular-documentum-widget/app/documents-list-table.component.html',
  styleUrls: ['/o/liferay-angular-documentum-widget/app/css/documents-list-table.component.css']
})
export class DocumentsListTableComponent implements OnInit, OnChanges{
  displayedColumns: string[] = ['position', 'name', 'weight', 'datecreation', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  loading: boolean;
  @Input() folderObjectId : string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private modalService: NgbModal,  private foldersService: FoldersService,
    private dataService: DataService) {   }

  ngOnInit() {
    this.loading = true;
    this.getDataFolders(this.dataService.objectId);
  }

  ngOnChanges(changes: SimpleChanges) {    
    this.loading = true;
    this.getDataFolders(this.folderObjectId);
  }

  getDataFolders(paramFolderId : string){
    let dataFolders = this.foldersService.fetchFolderAndDocumentByParentFolderId(paramFolderId);
    dataFolders.pipe(map(this.mapDataFolderByParentFolderId))
    .subscribe(data => {
                      this.dataSource.data = data;
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.sort = this.sort;
                      this.loading = false;
                      
               });
  }

  getPropertiesAndUrlLinks(paramFolderId : string){
    let propertiesUrl = this.foldersService.fetchPropertiesAndUrl(paramFolderId);
    propertiesUrl.pipe(map(this.mapPropertiesUrlByParentFolderId))
    .subscribe(url => {
                this.dataService.setLinkDocumentUrl(url);
    });
  }
 
  /**
   * Contruire le map du service
   * 
   * @param response 
   */
  mapPropertiesUrlByParentFolderId(data: Array<any>) : string {
    let result: "";    
    if (data && data.length) {
      result =  data[1].href;   
    }
    return result;
 }

  /**
   * Contruire le map du service
   * 
   * @param response 
   */
  mapDataFolderByParentFolderId(user: Array<any>) : FolderElement[] {
    let result:FolderElement[] = [];
    if (user) {
      user.forEach((item) => {
        let properties = item.content.properties;  
        let weight = FunctionUtils.transform(properties.r_content_size, 2);
        result.push(new FolderElement(properties.r_object_id, 12, properties.object_name, weight, properties.r_creation_date, "a", true, properties.r_object_type, properties.a_content_type));
      });
    }
   return result;
 }


 openFolderAndFile(content, element: FolderElement) {
  if (FunctionUtils.isFileTypeContainsExt(element.type, Configuration.OBJECT_TYPE_DOSSIER)){
      this.loading = true;
      this.dataSource.data = [];      
      this.getDataFolders(element.id);
      this.dataSource._updateChangeSubscription();
      //this.paginator._changePageSize(this.paginator.pageSize); 
    } else {
      this.getPropertiesAndUrlLinks(element.id); // Obtenir le lien utiliser
      this.modalService.open(content, { size: 'lg', backdrop: 'static' });
    }
  }

  toogleMetadataInfo(element: FolderElement) {    
    this.dataService.setObjectMetadataId(element.id);
    console.log("toogleMetadataInfo-ID" + element.id);
    this.dataService.setObjectMetadataType(element.type);    
    console.log("toogleMetadataInfo-TYPE" + element.type);   
  }

  
  public isFile(element : FolderElement): any {
    return {        
        'not-active':   FunctionUtils.isFileTypeEqExt(element.contentType, 'entourage_msg') || FunctionUtils.isFileTypeEqExt(element.contentType, 'crtext') || 
                        FunctionUtils.isFileTypeContainsExt(element.contentType, 'msw') || FunctionUtils.isFileTypeContainsExt(element.contentType, 'excel')
    };
  }

  click(element : FolderElement){
    alert(element.weight);
  }

  public addLogoByTypeElement(element : FolderElement): any {

    if (FunctionUtils.isFileTypeContainsExt(element.type, Configuration.OBJECT_TYPE_DOSSIER)){ /** C'est pour identifier que c'est un dossier = taille est vide */
      return  'fa-folder';
    }
    if (FunctionUtils.isFileTypeEqExt(element.contentType, 'pdf')){
      return  'fa-file-pdf';
    }
    if ( FunctionUtils.isFileTypeEqExt(element.contentType, 'entourage_msg')){
      return  'fa-envelope';
    }
    if (FunctionUtils.isFileTypeEqExt(element.contentType, 'crtext')){
      return 'fa-sticky-note';
    }
    if (FunctionUtils.isFileTypeContainsExt(element.contentType, 'msw')){
      return 'fa-file-word';
    }
    if (FunctionUtils.isFileTypeContainsExt(element.contentType, 'excel')){
      return 'fa-file-excel';
    }
    return 'fa-file-alt';

    /**
    return {
        'fa-file-pdf': FunctionUtils.isFileTypeEqExt(element.contentType, 'pdf'),
        'fa-envelope': FunctionUtils.isFileTypeEqExt(element.contentType, 'entourage_msg'),
        'fa-sticky-note': FunctionUtils.isFileTypeEqExt(element.contentType, 'crtext'),
        'fa-folder': FunctionUtils.isFileTypeContainsExt(element.type, Configuration.OBJECT_TYPE_DOSSIER), /** C'est pour identifier que c'est un dossier = taille est vide         
    };
    */
  }

  public getColor(element : FolderElement) : any{

    if (FunctionUtils.isFileTypeContainsExt(element.type, Configuration.OBJECT_TYPE_DOSSIER)){ /** C'est pour identifier que c'est un dossier = taille est vide */
      return  '#ffd75d';
    }
    if (FunctionUtils.isFileTypeEqExt(element.contentType, 'pdf')){
      return  '#921103';
    }
    if ( FunctionUtils.isFileTypeEqExt(element.contentType, 'entourage_msg')){
      return  '#3f51b5';
    }
    if (FunctionUtils.isFileTypeEqExt(element.contentType, 'crtext')){
      return  '#82e0d4';
    }

    if (FunctionUtils.isFileTypeContainsExt(element.contentType, 'msw')){
      return  '#3f51b5';
    }
    if (FunctionUtils.isFileTypeContainsExt(element.contentType, 'excel')){
      return '#12b886';
    }
 }


}
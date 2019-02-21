import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FoldersService } from '../service/folders.service';
import { map } from 'rxjs/operators/map';
import { MetadataElement } from './model/metadata-element';


/** Regular expression that matches a file name and its extension */
const fileExtensionRegex = /(.*)\.(\w+)/;

@Component({
  selector: 'app-metadata-info',
  templateUrl: '/o/liferay-angular-documentum-widget/app/metadata-info.component.html',
  styleUrls: ['/o/liferay-angular-documentum-widget/css/metadata-info.component.scss']
})
export class MetadataInfoComponent  implements OnChanges{

  private metadataElement : MetadataElement;
  @Input() folderId : string;
  @Input() typeObject : string;

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private foldersService: FoldersService) {   }

  ngOnChanges(changes: SimpleChanges) {        
    console.log("CHANGE:" + this.folderId);
    if (this.folderId != ""){
      this.getPropertiesDataFolderOrDocument(this.folderId, this.typeObject);
    }    
    
  }
  
  getPropertiesDataFolderOrDocument(paramFolderId : string, paramTypeObject : string){
    let metadatas = this.foldersService.fetchMetadataFolderByParentFolderId(paramFolderId, paramTypeObject);
    metadatas.pipe(map(this.mapMetadataPropertiesObject))
    .subscribe(url => {
        this.metadataElement = url;
    });
  }

  mapMetadataPropertiesObject(data: Array<any>) : MetadataElement {
    let result;
    if (data) {
      data.forEach((item) => {
        let properties = item.content.properties;          
        return new MetadataElement(properties.object_name,
          properties.title,
          properties.subject,
          properties.resolution_label,
          properties.owner_name,
          properties.owner_permit,
          properties.group_name,
          properties.group_permit,
          properties.world_permit,
          properties.log_entry,
          properties.language_code ,
          properties.dcr_filenet_id,
          properties.dcr_nom,
          properties.dcr_date_fin_activite,
          properties.dcr_type_document ,
          properties.r_object_type,
          properties.r_creation_date,
          properties.r_modify_date,
          properties.r_modifier,
          properties.r_access_date,
          properties.a_is_hidden,
          properties.i_is_deleted ,
          properties.a_archive,
          properties.a_link_resolved,
          properties.i_reference_cnt,
          properties.r_link_cnt,
          properties.r_link_high_cnt ,
          properties.r_assembled_from_id ,
          properties.a_content_type ,
          properties.r_page_cnt,
          properties.r_content_size  ,
          properties.a_full_text,
          properties.i_cabinet_id ,
          properties.i_antecedent_id ,
          properties.i_chronicle_id  ,
          properties.i_latest_flag,
          properties.r_version_label ,
          properties.i_branch_cnt ,
          properties.i_direct_dsc ,
          properties.r_immutable_flag ,
          properties.r_frozen_flag  ,
          properties.r_has_events ,
          properties.acl_domain ,
          properties.acl_name,
          properties.i_is_reference  ,
          properties.r_creator_name ,
          properties.r_is_public  ,
          properties.r_resume_state  ,
          properties.r_current_state  ,
          properties.a_is_template ,
          properties.r_full_content_size ,
          properties.a_is_signed ,
          properties.i_partition  ,
          properties.i_is_replica  ,
          properties.i_vstamp ,
          properties.r_object_id);
      });
    }
   return result;
 }

}
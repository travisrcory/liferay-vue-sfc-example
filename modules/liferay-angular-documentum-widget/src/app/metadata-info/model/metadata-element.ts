export class MetadataElement {

    object_name: string;
    title: string;
    subject: string;
    resolution_label: string;
    owner_name: string;
    owner_permit: number;
    group_name: string;
    group_permit: number;
    world_permit: number;
    log_entry: string;
    language_code : string;
    dcr_filenet_id: string;
    dcr_nom: string;
    dcr_date_fin_activite: string;
    dcr_type_document : string;
    r_object_type: string;
    r_creation_date: string;
    r_modify_date: string;
    r_modifier: string;
    r_access_date: string;
    a_is_hidden: number;
    i_is_deleted : number;
    a_archive: number;
    a_link_resolved: number;
    i_reference_cnt: number;
    r_link_cnt: number;
    r_link_high_cnt : number;
    r_assembled_from_id : string;
    a_content_type : string;
    r_page_cnt: number;
    r_content_size  : number;
    a_full_text: number;
    i_cabinet_id : string;
    i_antecedent_id : string;
    i_chronicle_id  : string;
    i_latest_flag: number;
    r_version_label : string;
    i_branch_cnt : number;
    i_direct_dsc : number;
    r_immutable_flag : number;
    r_frozen_flag  : number;
    r_has_events : number;
    acl_domain : string;
    acl_name: string;
    i_is_reference  : number;
    r_creator_name : string;
    r_is_public  : number;
    r_resume_state  : number;
    r_current_state  : number;
    a_is_template : number;
    r_full_content_size : number;
    a_is_signed : number;
    i_partition  : number;
    i_is_replica  : number;
    i_vstamp : number;
    r_object_id: string;
 
 
     constructor(object_name: string,
       title: string,
       subject: string,
       resolution_label: string,
       owner_name: string,
       owner_permit: number,
       group_name: string,
       group_permit: number,
       world_permit: number,
       log_entry: string,
       language_code : string,
       dcr_filenet_id: string,
       dcr_nom: string,
       dcr_date_fin_activite: string,
       dcr_type_document : string,
       r_object_type: string,
       r_creation_date: string,
       r_modify_date: string,
       r_modifier: string,
       r_access_date: string,
       a_is_hidden: number,
       i_is_deleted : number,
       a_archive: number,
       a_link_resolved: number,
       i_reference_cnt: number,
       r_link_cnt: number,
       r_link_high_cnt : number,
       r_assembled_from_id : string,
       a_content_type : string,
       r_page_cnt: number,
       r_content_size  : number,
       a_full_text: number,
       i_cabinet_id : string,
       i_antecedent_id : string,
       i_chronicle_id  : string,
       i_latest_flag: number,
       r_version_label : string,
       i_branch_cnt : number,
       i_direct_dsc : number,
       r_immutable_flag : number,
       r_frozen_flag  : number,
       r_has_events : number,
       acl_domain : string,
       acl_name: string,
       i_is_reference  : number,
       r_creator_name : string,
       r_is_public  : number,
       r_resume_state  : number,
       r_current_state  : number,
       a_is_template : number,
       r_full_content_size : number,
       a_is_signed : number,
       i_partition  : number,
       i_is_replica  : number,
       i_vstamp : number,
       r_object_id: string
        ) 
        {
         this.object_name= object_name;
         this.title= title;
         this.subject= subject;
         this.resolution_label= resolution_label;
         this.owner_name= owner_name;
         this.owner_permit= owner_permit;
         this.group_name= group_name;
         this.group_permit= group_permit;
         this.world_permit= world_permit;
         this.log_entry= log_entry;
         this.language_code = language_code;
         this.dcr_filenet_id= dcr_filenet_id;
         this.dcr_nom= dcr_nom;
         this.dcr_date_fin_activite= dcr_date_fin_activite;
         this.dcr_type_document = dcr_type_document;
         this.r_object_type= r_object_type;
         this.r_creation_date= r_creation_date;
         this.r_modify_date= r_modify_date;
         this.r_modifier= r_modifier;
         this.r_access_date= r_access_date;
         this.a_is_hidden= a_is_hidden;
         this.i_is_deleted = i_is_deleted;
         this.a_archive= a_archive;
         this.a_link_resolved= a_link_resolved;
         this.i_reference_cnt= i_reference_cnt;
         this.r_link_cnt= r_link_cnt;
         this.r_link_high_cnt = r_link_high_cnt;
         this.r_assembled_from_id = r_assembled_from_id;
         this.a_content_type = a_content_type;
         this.r_page_cnt= r_page_cnt;
         this.r_content_size  = r_content_size;
         this.a_full_text= a_full_text;
         this.i_cabinet_id = i_cabinet_id;
         this.i_antecedent_id = i_antecedent_id;
         this.i_chronicle_id  = i_chronicle_id;
         this.i_latest_flag= i_latest_flag;
         this.r_version_label = r_version_label;
         this.r_version_label = r_version_label;
         this.i_direct_dsc = i_direct_dsc;
         this.r_immutable_flag = r_immutable_flag;
         this.r_frozen_flag  = r_frozen_flag;
         this.r_has_events = r_has_events;
         this.acl_domain = acl_domain;
         this.acl_name= acl_name;
         this.i_is_reference  = i_is_reference;
         this.r_creator_name = r_creator_name;
         this.r_is_public  = r_is_public;
         this.r_resume_state  = r_resume_state;
         this.r_current_state  = r_current_state;
         this.a_is_template = a_is_template;
         this.r_full_content_size = r_full_content_size;
         this.a_is_signed = a_is_signed;
         this.i_partition  = i_partition;
         this.i_is_replica  = i_is_replica;
         this.i_vstamp = i_vstamp;
         this.r_object_id= r_object_id
        }
   }
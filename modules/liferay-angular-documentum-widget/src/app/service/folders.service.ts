import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpResponse,HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';

import { map } from 'rxjs/operators/map';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { Configuration } from '../app.constants';

@Injectable()
export class FoldersService {
    
  /****************************** */  
  private PREFIX_COUNT_DQL = "select count(*) as total  from djdcr_dossier where any i_folder_id = '{id}'";  
  private PREFIX_QUERY_DQL_FOLDER = "select r_object_id, object_name, title, a_content_type, r_content_size, r_creation_date, r_object_type, a_content_type  from {type_dossier} where any i_folder_id = '{id}'"; 
  private PREFIX_QUERY_DQL_METADATA_FOLDER = "select r_object_id, object_name, title, subject, resolution_label, owner_name, owner_permit, group_name, group_permit, world_permit, log_entry, language_code, dcr_filenet_id, dcr_nom,  r_object_type, r_creation_date,  r_modify_date,  r_modifier,  r_access_date,  a_is_hidden,  i_is_deleted,  a_archive,  a_link_resolved,  i_reference_cnt,  r_link_cnt,  r_link_high_cnt, r_assembled_from_id, a_content_type, r_page_cnt, r_content_size, a_full_text, i_cabinet_id,  i_antecedent_id, i_chronicle_id,  i_latest_flag,  r_version_label, i_branch_cnt,  i_direct_dsc, r_immutable_flag, r_frozen_flag,  r_has_events, acl_domain,  acl_name, i_is_reference, r_creator_name, r_is_public, r_resume_state, r_current_state,  a_is_template, r_full_content_size,  a_is_signed,  i_partition, i_is_replica, i_vstamp from {type_dossier} where r_object_id = '{id}'"; 
  private PREFIX_QUERY_DQL_DOCUMENT = "select r_object_id, object_name, title, a_content_type, r_content_size, r_creation_date, r_object_type,  a_content_type  from {type_document} where any i_folder_id = '{id}'"; 

  private LINKS_PARAM = "&links=false";

  public QUERY_DQL_FOLDER = this.PREFIX_QUERY_DQL_FOLDER + Configuration.CABINET_OBJECT_ID;  
  public QUERY_DQL_METADATA_FOLDER = this.PREFIX_QUERY_DQL_METADATA_FOLDER;  
  public QUERY_DQL_DOCUMENT = this.PREFIX_QUERY_DQL_DOCUMENT + Configuration.CABINET_OBJECT_ID;  

  public QUERY_DQL = this.PREFIX_QUERY_DQL_FOLDER + " UNION " + this.PREFIX_QUERY_DQL_DOCUMENT;
  public QUERY_DQL_CABINET = encodeURIComponent(this.PREFIX_QUERY_DQL_FOLDER.replace("{id}", "" + Configuration.CABINET_OBJECT_ID + "").replace("{type_dossier}", "" + Configuration.OBJECT_TYPE_DOSSIER + "").replace("{type_document}", "" + Configuration.OBJECT_TYPE_DOCUMENT + "")) +  this.LINKS_PARAM; 

  public apiUrl = "/repositories/" + Configuration.DOCBASE + "?page=1&include-total=true&dql=";
  public apiUrlLinks = "/repositories/" + Configuration.DOCBASE + "/objects/{id}/contents/content"; // 09d6e290805089d6

  constructor(
    private http: HttpClient,  
    private slimLoadingBarService: SlimLoadingBarService) 
  {}

    /**
   * Afficher les repertoires à partir d'un cabinet 
   */
  public getCountTotalFolder(parentFolderId: string): Observable<any[]> {
    //console.log("Id du dossier:" + parentFolderId);    
    return this.fetch(Configuration.BASE_URL + this.apiUrl + this.getQueryDQL(this.PREFIX_COUNT_DQL, parentFolderId, Configuration.OBJECT_TYPE_DOSSIER, Configuration.OBJECT_TYPE_DOCUMENT));
  }

  /**
   * Afficher les repertoires à partir d'un cabinet 
   */
  public fetchPropertiesAndUrl(parentFolderId: string): Observable<any[]> {
    let urlLinks = this.apiUrlLinks.replace("{id}", "" + parentFolderId + "");
    return this.fetchLinks(Configuration.BASE_URL + urlLinks);
  }

  /**
   * Afficher les repertoires à partir d'un cabinet 
   */
  public fetchFoldersSubCabinet(): Observable<any[]> {
    return this.fetch(Configuration.BASE_URL + this.apiUrl + this.QUERY_DQL_CABINET);
  }  

   /**
   * Faire une modification pour qu'il pointe bien dans la bonne appel de service
   */
  public fetchFolderByParentFolderId(parentFolderId: string): Observable<any[]> {
    //console.log("Id du dossier:" + parentFolderId);    
    return this.fetch(Configuration.BASE_URL + this.apiUrl + this.getQueryDQL(this.PREFIX_QUERY_DQL_FOLDER, parentFolderId, Configuration.OBJECT_TYPE_DOSSIER, Configuration.OBJECT_TYPE_DOCUMENT));
  }

   /**
   * Obtenir les elements pour afficher 
   */
  public fetchMetadataFolderByParentFolderId(parentFolderId: string, typeDossier: string): Observable<any[]> {
    //console.log("Id du dossier:" + parentFolderId);    
    return this.fetch(Configuration.BASE_URL + this.apiUrl + this.getQueryDQL(this.PREFIX_QUERY_DQL_METADATA_FOLDER, parentFolderId, typeDossier, ""));
  }

  /**
   * Faire une modification pour qu'il pointe bien dans la bonne appel de service
   */
  public fetchFolderAndDocumentByParentFolderId(parentFolderId: string): Observable<any[]> {
//    console.log("Id du dossier:" + parentFolderId);    
    return this.fetch(Configuration.BASE_URL + this.apiUrl + this.getQueryDQL(this.QUERY_DQL, parentFolderId, Configuration.OBJECT_TYPE_DOSSIER, Configuration.OBJECT_TYPE_DOCUMENT));
  }
 
  /**
   * Construire la requete DQL par rapport à l'id du dossier
   * 
   * @param parentFolderId
   */
  private getQueryDQL(prefix: String, parentFolderId: String, typeDossier: String, typeDocument: String){
    let dql = prefix.replace("{id}", "" + parentFolderId + "");
    dql = dql.replace("{id}", "" + parentFolderId + "");
    dql = dql.replace("{type_dossier}", "" + typeDossier + "");
    dql = dql.replace("{type_document}", "" + typeDocument + "");
    console.log(dql);
    let dqlEncoded = encodeURIComponent(dql);
    
    return dqlEncoded  + this.LINKS_PARAM;
  }

  /**
   * Extraction des données
   * 
   * @param url 
   */
  private fetchLinks(url: string): Observable<any[]> {
    this.slimLoadingBarService.start();
    return this.http
        .get(url)        
        .pipe(map(this.extractDataLinks))
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
  }

  /**
   * Extraction des données
   * 
   * @param url 
   */
  private fetch(url: string): Observable<any[]> {
    this.slimLoadingBarService.start();
    return this.http
        .get(url)
        //.pipe(map((response: any) => response.entries || response))
        .pipe(map(this.extractData))
        .catch((e: any) => Observable.throw(this.errorHandler(e)));
  }
  
  /**
   * Extraction de données
   * 
   * @param response 
   */
  private extractDataLinks(response: any) {
    let links = response.links;  // If response is a JSON use json()
    if (links) {
        return links;
    } 
    else {
        return [];
    }
 }
  /**
   * Extraction de données
   * 
   * @param response 
   */
  private extractData(response: any) {
    let entries = response.entries;  // If response is a JSON use json()
    if (entries) {
        return entries;
    } 
    else {
        return [];
    }
 }

  errorHandler(error: any): void {
    console.log(error)
  }
  
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

      private TOKEN_BEARER = "14373e3c-27d3-43fd-a597-a136a70384de";

      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
          let headers = req.headers      
          
              .set('Authorization', 'Bearer ' + this.TOKEN_BEARER);

          const cloneReq = req.clone({ headers });
          
          return next.handle(cloneReq).do(event => {
              if (event instanceof HttpResponse) {
                  let response = event.body;
                  if(response.Error){
                    console.log('error');
                  }
              }
          });
      }
  }
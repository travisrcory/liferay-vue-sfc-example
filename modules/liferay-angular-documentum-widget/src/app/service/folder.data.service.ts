import { HttpClient, HttpEvent, HttpHandler, HttpResponse,HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Configuration } from '../app.constants';

import 'rxjs/add/operator/do';

@Injectable()
export class FolderDataService {

    private actionUrl: string;
    private configurationProp: Configuration;

}


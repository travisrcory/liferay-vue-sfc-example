import { Component } from '@angular/core';
import { FileElement } from './file-explorer/model/file-element';
import { Observable } from 'rxjs';
import { FileService } from './service/file.service';
import { DataService } from './service/data.service';

import LiferayParams from '../types/LiferayParams'

//declare var Liferay: any;

@Component({
	templateUrl: '/o/liferay-angular-documentum-widget/app/app.component.html',
	styles: ['.container-app { margin-bottom: 20px; margin-right: 80px; margin-left: 80px;}',
			'.container-app-botton { margin-bottom: 10px; }',
			'.row-custom { display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; margin-right: -15px; }']
})

export class AppComponent {

	fileElements: Observable<FileElement[]>;
	title = 'Portail documentum';
	currentRoot: FileElement;
	currentElement: FileElement;
	currentPath: string;
	canNavigateUp = false;

	params: LiferayParams;
	url: string = '';
	authUrl: string = '';
	json: string = '';
	folderName: string = '';
	groupId: number = 0;
	count = 0;

	constructor(public fileService: FileService,  private dataService: DataService) {}

	ngOnInit() {
		this.dataService.objectId = "";
		this.updateFileElementQuery();
	}

	addFolder(folder: { name: string }) {
		this.fileService.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
		this.updateFileElementQuery();
	}
	
	removeElement(element: FileElement) {
		this.fileService.delete(element.id);
		this.updateFileElementQuery();
	}
	
	showElementMetadata(element: FileElement) {
		this.currentElement = element;
	}
	
	navigateToFolder(element: FileElement) {
		this.currentRoot = element;
		this.updateFileElementQuery();
		this.currentPath = this.pushToPath(this.currentPath, element.name);
		this.canNavigateUp = true;
	}
	
	  navigateUp() {
		if (this.currentRoot && this.currentRoot.parent === 'root') {
		  this.currentRoot = null;
		  this.canNavigateUp = false;
		  this.updateFileElementQuery();
		} else {
		  this.currentRoot = this.fileService.get(this.currentRoot.parent);
		  this.updateFileElementQuery();
		}
		this.currentPath = this.popFromPath(this.currentPath);
	  }
	
	  moveElement(event: { element: FileElement; moveTo: FileElement }) {
		this.fileService.update(event.element.id, { parent: event.moveTo.id });
		this.updateFileElementQuery();
	  }
	
	  renameElement(element: FileElement) {
		this.fileService.update(element.id, { name: element.name });
		this.updateFileElementQuery();
	  }
	
	  updateFileElementQuery() {
		this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
	  }
	
	  pushToPath(path: string, folderName: string) {
		let p = path ? path : '';
		p += `${folderName}/`;
		return p;
	  }
	
	  popFromPath(path: string) {
		let p = path ? path : '';
		let split = p.split('/');
		split.splice(split.length - 2, 1);
		p = split.join('/');
		return p;
	  }
}
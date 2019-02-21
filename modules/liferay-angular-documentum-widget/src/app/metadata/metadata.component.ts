import { Component, OnInit, Input } from '@angular/core';
import { FileElement } from '../file-explorer/model/file-element';

@Component({
  selector: 'app-metadata',
  templateUrl: '/o/liferay-angular-documentum-widget/app/metadata.component.html',
  styleUrls: ['/o/liferay-angular-documentum-widget/css/metadata.component.css']
})
export class MetadataComponent implements OnInit {

  @Input() currentElement: FileElement;
  constructor() { }

  ngOnInit() {
    this.currentElement = new FileElement();
  }

  showElementMetadata(element: FileElement) {
    this.currentElement = element;
  }

}

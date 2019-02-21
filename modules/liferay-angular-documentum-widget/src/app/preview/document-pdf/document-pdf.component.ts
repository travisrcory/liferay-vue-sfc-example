import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-preview-document-pdf',
  templateUrl: '/o/liferay-angular-documentum-widget/app/document-pdf.component.html',
  styleUrls: ['/o/liferay-angular-documentum-widget/css/document-pdf.component.scss']
})
export class DocumentPdfComponent implements OnChanges {
  
  @Input() url : string;
  src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;

  constructor(private dataService: DataService) {}
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes['url']) {
      let change = changes['url'];
      let curVal = change.currentValue;
      let prevVal = change.previousValue;
      let isFirstChange = change.isFirstChange();
      this.src = curVal;
      console.log("ngOnChanges, isFirstChange: " + isFirstChange + ", current value: " + curVal + ", previous value: " + prevVal + ", this.url: " + this.url);
    }
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
}
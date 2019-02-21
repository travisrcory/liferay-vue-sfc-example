import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileExplorerTreeviewComponent } from "./file-explorer-treeview/file-explorer-treeview.component";

import {APP_BASE_HREF} from "@angular/common";

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CustomInterceptor, FoldersService } from './service/folders.service';
import { FolderDataService } from './service/folder.data.service';
import { DataService } from './service/data.service';
import { FunctionUtils } from './utils/function.utils';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TreeViewModule } from '@progress/kendo-angular-treeview';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileService } from './service/file.service';
import { DocumentsListTableComponent } from './documents/documents-list-table/documents-list-table.component';
import { MetadataInfoComponent } from './metadata-info/metadata-info.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentPdfComponent } from './preview/document-pdf/document-pdf.component';

import {  MatAutocompleteModule,
	MatBadgeModule,
	MatBottomSheetModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatExpansionModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatStepperModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule,
	MatTreeModule
   } from '@angular/material';

@NgModule({
	imports: [
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
		TreeViewModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		MatAutocompleteModule,
		MatBadgeModule,
		MatBottomSheetModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatStepperModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		MatTreeModule,
		PdfViewerModule,
		NgbModule
	],
	declarations: [AppComponent, routingComponents, FileExplorerTreeviewComponent, DocumentsListTableComponent, MetadataInfoComponent,  DocumentPdfComponent],
	entryComponents: [AppComponent],
	bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
	providers: [
			{provide: APP_BASE_HREF, useValue: '/'},
			FoldersService,
			FolderDataService,
			FileService,
			FunctionUtils,
			SlimLoadingBarService,
			DataService,
				{
					provide: HTTP_INTERCEPTORS,
					useClass: CustomInterceptor,
					multi: true
				}
		],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() {}
}

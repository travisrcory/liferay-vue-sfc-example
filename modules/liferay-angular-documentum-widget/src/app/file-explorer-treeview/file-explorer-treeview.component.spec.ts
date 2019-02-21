import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs/internal/Observable';

import { FileExplorerTreeviewComponent } from './file-explorer-treeview.component';
import { FileExplorerTreeviewConstants } from './file-explorer-treeview.constants';
import { FoldersService } from '../service/folders.service';
import { FolderDataService } from '../service/folder.data.service';
import { DataService } from '../service/data.service';

// iconClass, info, error, ngOnInit, getCategoriesByIndex, hasChildren, fetchChildren, handleSelection
describe('FileExplorerTreeviewComponent', () => {

  let foldersService: FoldersService;
  let folderDataService: FolderDataService;
  let dataService: DataService;
  let toasterService: ToasterService = new ToasterService();
  let slimLoadingBarService: SlimLoadingBarService = new SlimLoadingBarService(); 

  let fileExplorerTreeviewComponent: FileExplorerTreeviewComponent = 
      new FileExplorerTreeviewComponent(foldersService, folderDataService, slimLoadingBarService, dataService);

   let probeIconFileObject = {
    'k-i-file-pdf': true,
    'k-i-folder': true,
    'k-i-html': false,
    'k-i-image': false,
    'k-icon': true
  }
  let fileObject = { 
    text:FileExplorerTreeviewConstants.FILE_PDF, 
    items:undefined 
  };
  let iconFileObject = fileExplorerTreeviewComponent.iconClass(fileObject);
  it('iconClass should be pdf', () => {
    expect(iconFileObject).toEqual(probeIconFileObject);
  });

  probeIconFileObject["k-i-file-pdf"] = false;
  probeIconFileObject["k-i-html"] = true;
  fileObject.text = FileExplorerTreeviewConstants.FILE_HTML;
  iconFileObject = fileExplorerTreeviewComponent.iconClass(fileObject);
  it('iconClass should be html', () => {
    expect(iconFileObject).toEqual(probeIconFileObject);
  });

  probeIconFileObject["k-i-html"] = false;
  probeIconFileObject["k-i-image"] = true;
  fileObject.text = FileExplorerTreeviewConstants.FILE_JPG;
  iconFileObject = fileExplorerTreeviewComponent.iconClass(fileObject);
  it('iconClass should be image (jpg)', () => {
    expect(iconFileObject).toEqual(probeIconFileObject);
  });

  fileObject.text = FileExplorerTreeviewConstants.FILE_PNG;
  iconFileObject = fileExplorerTreeviewComponent.iconClass(fileObject);
  it('iconClass should be image (png)', () => {
    expect(iconFileObject).toEqual(probeIconFileObject);
  });

  probeIconFileObject["k-i-image"] = false;
  fileObject.text = FileExplorerTreeviewConstants.FOLDER;
  fileObject.items = ['folder'];
  iconFileObject = fileExplorerTreeviewComponent.iconClass(fileObject);
  it('iconClass should be folder', () => {
    expect(iconFileObject).toEqual(probeIconFileObject);
  });

  it('loading should be false', () => {
    expect(fileExplorerTreeviewComponent.loading).toBeFalsy();
  });

  it('loading should be true', () => {
    fileExplorerTreeviewComponent.loading = true;
    expect(fileExplorerTreeviewComponent.loading).toBeTruthy();
  });

  it('hasChildren whith content a positive number should be true', () => {
    let item = {'content':1};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeTruthy();
  });

  // TODO: to explore what it means to have a negative child!
  it('hasChildren whith content a negative number should be true', () => {
    let item = {'content':-1};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeTruthy();
  });

  it('hasChildren whith content a string should be true', () => {
    let item = {'content':'child'};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeTruthy();
  });

  // TODO: check the meaning of has children, can a blanc space be a child?
  it('hasChildren whith content a blanc space string should be true', () => {
    let item = {'content':' '};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeTruthy();
  });

  it('hasChildren with an array of elements should be true', () => {
    let item = {'content':['first child','second child']};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeTruthy();
  });

  // TODO: check the meaning of has children, empty array usualy means no elements in the array so no child available!
  it('hasChildren with an empty array of elements should be true', () => {
    let item = {'content':[]};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeTruthy();
  });

  // TODO: to explain why 0 is an exception from the integer numbers, suddenly it means no children as oposed to negative integers!
  it('hasChildren whith content a positive number should be false', () => {
    let item = {'content':0};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeFalsy();
  });

  it('hasChildren without content member should be false', () => {
    let item = {};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeFalsy();
  });

  it('hasChildren whith an empty space content string should be false', () => {
    let item = {'content':''};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeFalsy();
  });

  it('hasChildren whith undefined content should be false', () => {
    let item = {'content': undefined};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeFalsy();
  });

  it('hasChildren whith NaN content should be false', () => {
    let item = {'content': NaN};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeFalsy();
  });

  it('hasChildren whith null content should be false', () => {
    let item = {'content': null};
    expect(fileExplorerTreeviewComponent.hasChildren(item)).toBeFalsy();
  });

});

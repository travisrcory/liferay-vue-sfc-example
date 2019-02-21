import { Injectable } from '@angular/core';

@Injectable()
export class FunctionUtils {

    private static units = [
        'bytes',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB'
      ];

    public static transform(bytes: number = 0, precision: number = 2 ) : string {

        if (bytes<= 0)  return '--';
        if ( isNaN( parseFloat( String(bytes) )) || ! isFinite( bytes ) ) return '?';
    
        let unit = 0;
    
        while ( bytes >= 1024 ) {
          bytes /= 1024;
          unit ++;
        }
    
        return bytes.toFixed( + precision ) + ' ' + this.units[ unit ];
      }

      public static isFileTypeEqExt = (fileName: string, ext: string) => new RegExp(`${ext}\$`).test(fileName);
      public static isFileTypeContainsExt = (fileName: string, ext: string) => new RegExp(`${ext}`).test(fileName);

    }
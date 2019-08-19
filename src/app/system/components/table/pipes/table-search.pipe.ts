import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'TableSearchPipe', pure: false })
export class TableSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    
    let searchText = new RegExp(args, 'ig');
    if (value && value.length >0) {
      return value.filter(table_Data => {
        
          if (table_Data) {
            return table_Data.str_searchField.search(searchText) !== -1;
          }
        
      });
    }
    return value;
  }

}
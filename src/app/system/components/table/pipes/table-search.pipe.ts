import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'TableSearchPipe', pure: false })
export class TableSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    let str_filter = (searchText + "").substr(1,((searchText + "").length-4));
    if (value && value.length > 0) {
      return value.filter(table_Data => {
        if(str_filter=="(?:)"){
          return true;
        }
        if (table_Data) {
          let str_column: string = table_Data.str_searchField.toUpperCase();
          
          str_column = str_column.split("Á").join("A");
          str_column = str_column.split("É").join("E");
          str_column = str_column.split("Í").join("I");
          str_column = str_column.split("Ó").join("O");
          str_column = str_column.split("Ú").join("U");

          let str_auxFilter: string = str_filter.toUpperCase();
          
          str_auxFilter = str_auxFilter.split("Á").join("A");
          str_auxFilter = str_auxFilter.split("É").join("E");
          str_auxFilter = str_auxFilter.split("Í").join("I");
          str_auxFilter = str_auxFilter.split("Ó").join("O");
          str_auxFilter = str_auxFilter.split("Ú").join("U");
          return str_column.search(str_auxFilter) !== -1;
        }

      });
    }
    return value;
  }

}
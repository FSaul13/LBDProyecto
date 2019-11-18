import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ColumnTextSearchPipe', pure: false })
export class ColumnTextSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    //console.log(args);
    //console.log(value)
    if (value && value.length > 0) {
      return value.filter(row => {
        let bln_showRow: boolean = true;
        Object.keys(args).forEach(key => {
          let str_auxColumn: string = row[key];
          str_auxColumn = str_auxColumn.toUpperCase();
          str_auxColumn = str_auxColumn.split('Á').join('A');
          str_auxColumn = str_auxColumn.split('É').join('E');
          str_auxColumn = str_auxColumn.split('Í').join('I');
          str_auxColumn = str_auxColumn.split('Ó').join('O');
          str_auxColumn = str_auxColumn.split('Ú').join('U');
          let filter: string = args[key];
          filter = filter.toUpperCase();
          filter = filter.split('Á').join('A');
          filter = filter.split('É').join('E');
          filter = filter.split('Í').join('I');
          filter = filter.split('Ó').join('O');
          filter = filter.split('Ú').join('U');
          if(str_auxColumn.indexOf(filter)==-1){
            bln_showRow = false
          }
        })
        //console.log(row)
        return bln_showRow;
      });
      /*
      let bln_showRow:boolean = true;
      Object.keys(args=>{
        let aux = 
      });
      */
    }
    /*
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
  }*/
    return value;
  }

}
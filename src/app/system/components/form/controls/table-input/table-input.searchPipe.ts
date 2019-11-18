import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'FilterSearchPipe', pure: false })
export class FilterSearchPipe implements PipeTransform {
    transform(value, args?): Array<any> {

        //let searchText = new RegExp(args, 'ig');
        if (value && value.length > 0) {
            return value.filter(table_Data => {
                let bln_return: boolean = true;
                if (!args) {
                    return true;
                }
                args.forEach(filter => {
                    if (filter.type == "text") {
                        if (filter.filterValue) {
                            let str_column: string = table_Data[filter.filterColum].toUpperCase();
                            str_column = str_column.split("Á").join("A");
                            str_column = str_column.split("É").join("E");
                            str_column = str_column.split("Í").join("I");
                            str_column = str_column.split("Ó").join("O");
                            str_column = str_column.split("Ú").join("U");
                            let str_auxfilter = filter.filterValue.toUpperCase();
                            str_auxfilter = str_auxfilter.split("Á").join("A");
                            str_auxfilter = str_auxfilter.split("É").join("E");
                            str_auxfilter = str_auxfilter.split("Í").join("I");
                            str_auxfilter = str_auxfilter.split("Ó").join("O");
                            str_auxfilter = str_auxfilter.split("Ú").join("U");
                            if (str_column.search(str_auxfilter) === -1) {
                                bln_return = false;
                            }
                        }
                    } else if (filter.type == "select") {
                        if (filter.filterValue) {

                            if (filter.filterValue != "showAllOptions") {
                                if (table_Data[filter.filterColum] != filter.filterValue) {
                                    bln_return = false;
                                }
                            }
                        }
                    }
                });
                return bln_return;

            });
        }
        return value;
    }

}
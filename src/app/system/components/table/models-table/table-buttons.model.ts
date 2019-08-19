import { TableColors } from './table-colors.model';
import { TableExtraButtons } from './table-extra-buttons.model';
export class TableButtons {
    delete: boolean;
    deleteIcon: string;
    edit: boolean;
    editIcon: string;
    extras: boolean;
    colors: TableColors;
    extraButtons: TableExtraButtons[];
}
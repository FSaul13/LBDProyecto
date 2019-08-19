import { Day } from './day';
import { Schedule } from './schedule';

export class DaySchedule{
    _idDiaHorario:number;
    _idDia:number;
	_dia:Day;
	_idHorario:number;
	_horario:Schedule;
	_isEnabled:boolean;
	_fechaFin:string;
	_fechaInicio:string;
}
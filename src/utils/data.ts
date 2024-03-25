import { Moment } from "moment";
import {moment} from "obsidian"


export class ScheduleItem {
    datetime: Moment
    text: string

    constructor(
        date: string,
        text: string,
		dateFormat: string = "DD.MM.YYYY HH:mm"
    ) {
        this.datetime = moment(date, dateFormat)
        this.text = text;
    }
}

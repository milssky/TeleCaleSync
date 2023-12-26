import { Moment } from "moment";
import {moment} from "obsidian"


export class ScheduleItem {
    datetime: Moment
    text: string

    constructor(
        date: string,
        text: string
    ) {
        this.datetime = moment(date, "YY-MM-DD hh:mm:ss")
        this.text = text;
    }
}
import { Moment } from "moment";

export class ScheduleItem {
    datetime: Moment
    text: string

    constructor(
        date: Moment,
        text: string
    ) {
        this.datetime = date;
        this.text = text;
    }
}
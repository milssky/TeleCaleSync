import { App, TFile } from "obsidian";
import { ScheduleItem } from "src/utils/data";

export class FileParser {
    private files: TFile[];
    private app: App
    
    // parseReminderTagRegex = /```reminder(?<reminder>\s[\w*:\.\-_\s*\w*]+\s)```/;
    parseReminderTagRegex = /```reminder\s+datetime:\s+(?<datetime>.+)\s+text:\s+(?<text>.+)\s*```/;
    // parseReminderFieldsRegex = /datetime:\s+(?<datetime>.+)\s+text:\s+(?<text>.+)/;

    constructor (
        files: TFile[],
        app: App
    ) {
        this.files = files;
        this.app = app
    }

    public async proccessMDfiles(): Promise<ScheduleItem[]> {
        const scheduleItems: ScheduleItem[] = [];
    
        for (const file of this.files) {
            const scheduleItem = await this.processFile(file);
            scheduleItems.push(scheduleItem);
        }
    
        return scheduleItems;
    }
    
    private async processFile(file: TFile): Promise<ScheduleItem> {
        let text = await this.app.vault.read(file);
        const match = this.parseReminderTagRegex.exec(text);
        
        if (match) {
            const reminderText = match.groups?.text;
            const reminderDatetime = match.groups?.datetime;
            return new ScheduleItem(reminderDatetime!, reminderText!);
        } else {
            console.log("fail");
            throw new Error("Unexpected format");
        }
    }
    
}
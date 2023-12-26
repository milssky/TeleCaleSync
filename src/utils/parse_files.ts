import { App, TFile } from "obsidian";
import { ScheduleItem } from "src/utils/data";

export class FileParser {
    private files: TFile[];
    private app: App
    
    parseReminderRegex = /```reminder\s+datetime:\s+(?<datetime>.+)\s+text:\s+(?<text>.+)\s*```/;

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
            const result = await this.processFile(file);
            if (result.success) {
                scheduleItems.push(result.scheduleItem!);
            } else {
                console.log("Unexpected reminder tag in file ", file.name);
            }
        }
    
        return scheduleItems;
    }
    
    private async processFile(file: TFile): Promise<{ success: boolean; scheduleItem?: ScheduleItem }> {
        try {
            let text = await this.app.vault.read(file);
            const match = this.parseReminderRegex.exec(text);
    
            if (match) {
                const reminderText = match.groups?.text;
                const reminderDatetime = match.groups?.datetime;
                const scheduleItem = new ScheduleItem(reminderDatetime!, reminderText!);
                return { success: true, scheduleItem };
            } else {
                return { success: false };
            }
        } catch (error) {
            return { success: false };
        }
    }
    
    
}
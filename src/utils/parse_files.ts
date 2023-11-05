import { App, TFile } from "obsidian";
import { ScheduleItem } from "src/utils/data";

export class FileParser {
    private files: TFile[];
    private app: App
    
    parseReminderTagRegex = /```reminder(?<reminder>\s[\w*:\.\-_\s*\w*]+\s)```/;
    parseReminderFieldsRegex = /datetime:\s+(?<datetime>.+)\s+text:\s+(?<text>.+)/

    constructor (
        files: TFile[],
        app: App
    ) {
        this.files = files;
        this.app = app
    }

    public proccessMDfiles() {
        this.files.forEach(
            (file, _) => this.processFile(file)
        )
    }

    private async processFile(file: TFile) {
        let text = await this.app.vault.read(file);
        const match = this.parseReminderTagRegex.exec(text);
        if (match) {
            const reminderText = match.groups?.reminder;
            if (reminderText) {
                this.parseDataFromReminderTag(reminderText.trim());
            }
        }
        // TODO: вернуть объект вида "имя файла": "объект напоминания"

    }

    private parseDataFromReminderTag(data: string) {
        console.log(data)
    }
}
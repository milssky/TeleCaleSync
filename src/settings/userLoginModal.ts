import { App, Modal } from "obsidian";
import TeleCaleSyncerPlugin from "src/main";


export class UserLoginModal extends Modal {

    constructor(public plugin: TeleCaleSyncerPlugin) {
        super(plugin.app);
    }

    async display() {
        const { contentEl } = this;
        contentEl.createEl("h1", {text: "Login to Telegram"});
    }

    onOpen(): void {
        this.display();
    }

    onClose(): void {
        const  {contentEl} = this;
        contentEl.empty();
    }
}
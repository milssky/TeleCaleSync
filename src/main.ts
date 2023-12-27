import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import { FileParser } from 'src/utils/parse_files';
import { init_client } from './utils/tg';
import TeleCaleSyncSettingTab from './settings';

// Remember to rename these classes and interfaces!
 
interface PluginSettings {
	datetimeFormat: string;
	apiId: string;
	apiHash: string;
}

const DEFAULT_SETTINGS: PluginSettings = {
	datetimeFormat: '',
	apiId: '',
	apiHash: ''
}

export default class TeleCaleSyncerPlugin extends Plugin {
	settings: PluginSettings;
	async onload() {
		await this.loadSettings();
		// this. addCommand({
		// 	id: 'parse-reminders-from-vault',
		// 	name: 'Parse reminders from all MD files in vault',
		// 	callback: () => {
		// 		new FileParser(this.app.vault.getMarkdownFiles(), this.app).proccessMDfiles();
		// 	}
		// });
		const result = await new FileParser(this.app.vault.getMarkdownFiles(), this.app).proccessMDfiles();
		console.log(result);
		// init_client(this.settings.apiHash, this.settings.apiId);
		// console.log(this.settings.apiId);
		// console.log(this.settings.apiHash);
		this.addSettingTab(new TeleCaleSyncSettingTab(this.app, this));

	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}



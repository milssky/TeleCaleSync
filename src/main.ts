import { Plugin } from 'obsidian';
import { FileParser } from 'src/utils/parse_files';
// import { initClient } from './utils/tg';
import { TgClient } from './utils/tg';
import {TeleCaleSyncSettingTab, DEFAULT_SETTINGS, PluginSettings}  from './settings/settings';

// Remember to rename these classes and interfaces!
 


export default class TeleCaleSyncerPlugin extends Plugin {
	settings: PluginSettings;
	tgClient: TgClient;


	async onload() {
		await this.loadSettings();
		this.addCommand({
			id: 'parse-reminders-from-vault',
			name: 'Parse reminders from all MD files in vault',
			callback: async () => {
				this.tgClient.configureClient(this.settings.apiHash, this.settings.apiId);
				const result = await new FileParser(this.app.vault.getMarkdownFiles(), this.app, this.settings.datetimeFormat).proccessMDfiles();
				for(const item in result) {
					await this.tgClient.sendScheduledMessage(result[item].text, result[item].datetime.unix());
				}
			}	
		});
		this.addCommand({
			id: 'parse-reminder-from-current-file',
			name: 'Parse reminder from current MD file',
			callback: async () => {
				const result = await new FileParser(this.app.vault.getMarkdownFiles(), this.app, this.settings.datetimeFormat).processCurrentOpenedMDfile();
				console.log(result);
				this.tgClient.configureClient(this.settings.apiHash, this.settings.apiId);
				await this.tgClient.sendScheduledMessage(result.text, result.datetime.unix());
			}
		});
		this.addSettingTab(new TeleCaleSyncSettingTab(this.app, this));
		this.tgClient = new TgClient();
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



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
				// TODO: Убрать заглушку
				const result = await new FileParser(this.app.vault.getMarkdownFiles(), this.app).proccessMDfiles();
				console.log(result);
				// this.tgClient.sendMessage('parse_reminders_from_vault');  
			}
		});
		this.addCommand({
			id: 'parse-reminder-from-current-file',
			name: 'Parse reminder from current MD file',
			callback: async () => {
				//TODO: Нужна переработка интерфейса парсера одиночного файла.
				const result = await new FileParser(this.app.workspace.getActiveFile(), this.app).processFile(this.app.workspace.getActiveFile());
				console.log(result);
			}
		});
		// const result = await new FileParser(this.app.vault.getMarkdownFiles(), this.app).proccessMDfiles();
		// console.log(this.settings.apiId);
		// console.log(this.settings.apiHash);
		this.addSettingTab(new TeleCaleSyncSettingTab(this.app, this));
		// this.client = new TelegramClient(new StoreSession('${os.hostname()}_${getSessionId()}'), parseInt(apiId), apiHash, {connectionRetries: 5, useWSS: true});
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



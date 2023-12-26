import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import { FileParser } from 'src/utils/parse_files';

// Remember to rename these classes and interfaces!
 
interface PluginSettings {
	datetimeFormat: string;
}

const DEFAULT_SETTINGS: PluginSettings = {
	datetimeFormat: ''
}

export default class TeleCaleSyncerPlugin extends Plugin {
	settings: PluginSettings;
	async onload() {
		await this.loadSettings();
		this. addCommand({
			id: 'parse-reminders-from-vault',
			name: 'Parse reminders from all MD files in vault',
			callback: () => {
				new FileParser(this.app.vault.getMarkdownFiles(), this.app).proccessMDfiles();
			}
		});

		this.addSettingTab(new SettingTab(this.app, this));

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


class SettingTab extends PluginSettingTab {
	plugin: TeleCaleSyncerPlugin;

	constructor(app: App, plugin: TeleCaleSyncerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Datetime Format')
			.setDesc('Datetime format string. Read moment.js docs.')
			.addText(text => text
				.setPlaceholder('Enter datetime format')
				.setValue(this.plugin.settings.datetimeFormat)
				.onChange(async (value) => {
					this.plugin.settings.datetimeFormat = value;
					await this.plugin.saveSettings();
				}));
		
	}
}

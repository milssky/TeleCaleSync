import TeleCaleSyncerPlugin from "../main";
import { App, ButtonComponent, PluginSettingTab, Setting } from "obsidian";
import { UserLoginModal } from "./userLoginModal";

export interface PluginSettings {
	datetimeFormat: string;
	apiId: string;
	apiHash: string;
}

export const DEFAULT_SETTINGS: PluginSettings = {
	datetimeFormat: '',
	apiId: '',
	apiHash: ''
}


export class TeleCaleSyncSettingTab extends PluginSettingTab {
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
		new Setting(containerEl)
			.setName('API ID')
			.setDesc('API ID string')
			.addText(text => text
				.setPlaceholder('Enter you API ID')
				.setValue(this.plugin.settings.apiId)
				.onChange(async (value) => {
					this.plugin.settings.apiId = value;
					await this.plugin.saveSettings();
				}));
		new Setting(containerEl)
			.setName('API hash')
			.setDesc('API hash string')
			.addText(text => text
				.setPlaceholder('Enter you API hash')
				.setValue(this.plugin.settings.apiHash)
				.onChange(async (value) => {
					this.plugin.settings.apiHash = value;
					await this.plugin.saveSettings();
				}));

		const userLoginConstructor = (userLoginButton: ButtonComponent) => {
			userLoginButton.setButtonText("Login telegram");
			userLoginButton.onClick( async () => {
					const userLoginModal = new UserLoginModal(this.plugin);
					userLoginModal.onClose = async () => {
						this.plugin.saveSettings()
					}
					userLoginModal.open();
				}
			)
		}
		
		new Setting(containerEl)
			.setName("User")
			.setDesc("Connect telegram user")
			.addButton(userLoginConstructor.bind(this))
	}
}

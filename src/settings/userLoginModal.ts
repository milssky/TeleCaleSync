import { Modal, Setting } from "obsidian";
import TeleCaleSyncerPlugin from "src/main";
import { QRCode } from 'qrcode';



export class UserLoginModal extends Modal {
    userLoginDiv: HTMLDivElement
    qrCodeContainer: HTMLDivElement
    password = "";

    constructor(public plugin: TeleCaleSyncerPlugin) {
        super(plugin.app); 
    }

    addHeader() {
        this.contentEl.empty();
		this.userLoginDiv = this.contentEl.createDiv();
		this.titleEl.setText("Авторизация пользователя");
    }

    addPassword() {
		new Setting(this.userLoginDiv)
			.setName("1. Ввести пароль (опционально)")
			.setDesc(
                "Введи ваш пароль перед сканированией QR кода только если используете двухфакторную авторизацию. Пароль не сохраняется!",
			)
			.addText((text) => {
				text.setPlaceholder("*************")
					.setValue("")
					.onChange(async (value: string) => {
						this.password = value;
					});
			});
	}

    addScanner() {
		new Setting(this.userLoginDiv)
			.setName("2. Подготовить сканер QR кода")
			.setDesc("Откройте телеграмм и пройдите Settings > Devices > Link Desktop Device");
	}

    addQrCode() {
        new Setting(this.userLoginDiv)
            .setName("3. Сгенерировать QR код")
            .setDesc("Сгенерируйте QR код и отсканируйте телефоном.")
            .addButton((button) => {
                button.setButtonText("Сгенерировать QR код");
                button.onClick(async () => {
                    try {
                        // initClient(
                        //     this.plugin.settings.apiHash, 
                        //     this.plugin.settings.apiId, 
                        //     this.qrCodeContainer, 
                        //     this.password
                        // );
                        this.plugin.tgClient.configureClient(
                            this.plugin.settings.apiHash,
                            this.plugin.settings.apiId
                        );
                        await this.plugin.tgClient.loginWithQRCode(
                            this.qrCodeContainer,
                            this.password
                        );
                    } catch (e) {
                        console.log(e);
                    }

                })
            });
        this.qrCodeContainer = this.userLoginDiv.createDiv({
            cls: "qr-code-container",
        });
    }

    async display() {
        this.addHeader();
        this.addPassword();
        this.addScanner();
        this.addQrCode();
    }

    onOpen(): void {
        this.display();
    }

    // onClose(): void {
    //     const  {contentEl} = this;
    //     contentEl.empty();
    // }
}
import { TelegramClient, password} from "telegram";
import { StoreSession } from "telegram/sessions";
import QRCode  from "qrcode";

export async function initClient(apiHash, apiId, container: HTMLDivElement, password?: string) {
    console.log(apiId);
    const client = new TelegramClient(new StoreSession("store_id"), parseInt(apiId), apiHash, {connectionRetries: 5, useWSS: true});
    await client.connect();
    await client.session.load()
    // await client.sendMessage("me", {message: 'Hello1234' });
    await client.signInUserWithQrCode({ apiId, apiHash },
        {
              onError: async function(p1: Error) {
                  console.log("error", p1);
                  // true = stop the authentication processes
                  return true;
              },
              qrCode: async (code) => {
                  const url = `tg://login?token=${code.token.toString("base64url")}`
                  console.log("Convert the next string to a QR code and scan it");
                  console.log(url);
                  const qrCodeSvg = await QRCode.toString(url, {type: "svg"});
                  const parser = new DOMParser();
                  const svg = parser.parseFromString(qrCodeSvg, "image/svg+xml").documentElement;
                  svg.setAttribute("width", "150");
                  svg.setAttribute("height", "150");
                  while (container.firstChild) {
                      container.removeChild(container.firstChild);
                  }
                  container.appendChild(svg);
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              password: async (hint) => {
                  // password if needed
                  return password ? password : "";
              }
          }
        );
    await client.session.save()
    await client.sendMessage("me", {message: 'Hello' });
}

export async function signInWithQRCode(container: HTMLDivElement, password?: string) {
    const url = "tg://login?token="
    const qrCodeSvg = await QRCode.toString(url, {type: "svg"});
    const parser = new DOMParser();
    const svg = parser.parseFromString(qrCodeSvg, "image/svg+xml").documentElement;
    svg.setAttribute("width", "150");
    svg.setAttribute("height", "150");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    container.appendChild(svg);
}

export class TgClient {
    constructor(
        apiId: number,
        apiHash: string
    ) {

    }
}
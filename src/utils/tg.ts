import { TelegramClient} from "telegram";
import { StringSession } from "telegram/sessions";

export async function init_client(apiHash, apiId) {
    const client = new TelegramClient(new StringSession(""), parseInt(apiId), apiHash, {connectionRetries: 5, useWSS: true});
    await client.connect();
    const user = await client.signInUserWithQrCode({ apiId, apiHash },
        {
              onError: async function(p1: Error) {
                  console.log("error", p1);
                  // true = stop the authentication processes
                  return true;
              },
              qrCode: async (code) => {
                  console.log("Convert the next string to a QR code and scan it");
                  console.log(
                      `tg://login?token=${code.token.toString("base64url")}`
                  );
              },
              password: async (hint) => {
                  // password if needed
                  return "1111";
              }
          }
        );
    // await client.sendMessage("me", {message: 'Hello'});
}
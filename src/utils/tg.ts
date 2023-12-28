import { TelegramClient} from "telegram";
import { StringSession } from "telegram/sessions";

export async function init_client(apiHash, apiId) {
    const client = new TelegramClient(new StringSession(""), parseInt(apiId), apiHash, {connectionRetries: 5, useWSS: true});
    await client.connect();
    // await client.sendMessage("me", {message: 'Hello'});
}
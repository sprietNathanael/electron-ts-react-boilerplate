// import { APIChannels, SendChannels } from './channelsInterface';

// export interface ReceiveChannels {
// 	[key: string]: Function;
// }
import { BrowserWindow, IpcMain } from 'electron';
import { SendChannels } from './channelInterfaces';

export default class IPCApi {
	apiName: string = 'api';
	validSendChannels: SendChannels = {};
	validReceiveChannels: string[] = [];

	constructor(apiName: string, validSendChannels: SendChannels, validReceiveChannels: string[]) {
		this.apiName = apiName;
		this.validSendChannels = validSendChannels;
		this.validReceiveChannels = validReceiveChannels;
	}

	initIpcMain(ipcMain: IpcMain, mainWindow: BrowserWindow) {
		if (mainWindow) {
			Object.keys(this.validSendChannels).forEach((key) => {
				ipcMain.on(`${this.apiName}+${key}`, async (event, message) => {
					this.validSendChannels[key](mainWindow, event, message);
				});
			});
		}
	}

	sendToRender(mainWindow: BrowserWindow, channel: string, ...args: any[]) {
		mainWindow.webContents.send(`${this.apiName}+receiveTest`, ...args);
	}
}

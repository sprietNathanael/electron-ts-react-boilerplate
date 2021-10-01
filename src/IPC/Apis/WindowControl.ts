import { BrowserWindow } from 'electron';
import { SendChannels } from '../channelInterfaces';
import IPCApi from '../IPCApi';

const apiName = 'windowControl';

// ====================== This is the renderer side
// to Main
const validSendChannels: SendChannels = {
	close: closeWindow,
	maximise: maximiseWindow,
	isMaximised: isMaximised,
	unmaximise: unmaximiseWindow,
	minimise: minimiseWindow,
};

// from Main
const validReceiveChannels: string[] = ['isMaximised'];

const ipcApiInterface = new IPCApi(apiName, validSendChannels, validReceiveChannels);

// ====================== This is the main side
function maximiseWindow(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
	if (!mainWindow.isMaximized()) {
		mainWindow.maximize();
	}
}

function unmaximiseWindow(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
	if (mainWindow.isMaximized()) {
		mainWindow.unmaximize();
	}
}

function isMaximised(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
	ipcApiInterface.sendToRender(mainWindow, 'isMaximised', mainWindow.isMaximized());
}

function minimiseWindow(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
	mainWindow.minimize();
}

function closeWindow(mainWindow: BrowserWindow, event: Electron.IpcMainEvent, message: any) {
	mainWindow.close();
}

export default ipcApiInterface;

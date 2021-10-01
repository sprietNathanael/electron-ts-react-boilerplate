import windowControlAPI from './IPC/Apis/WindowControl';
import { generateContextBridge } from './IPC/contextBridge';

generateContextBridge([windowControlAPI]);

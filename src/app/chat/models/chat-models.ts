import { MessageRead } from "./message-models";
import { UserRead } from '../../authentication/models/user_models';

export interface ChatCreated {
  id: string;
  users: UserRead[];
  isGroup: string;
  groupName: string | null;
}

export interface ChatRead extends ChatCreated {
  messages: MessageRead[];
}

export interface ChatPreview {
  chatId: string;
  user: UserRead;
  isGroup: string;
  groupName: string | null;
  previewMessage: MessageRead | null;
}

export interface MessageCreate {
  chatId: string;
  content: string;
  sendDate: Date;
  updateDate: Date;
  senderId: string;
}

export interface MessageRead extends MessageCreate{
  id: string;
}

export interface MessageUpdate {
  id: string;
  updatedContent: string;
}

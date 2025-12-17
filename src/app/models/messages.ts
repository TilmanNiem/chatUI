export interface Message {
    date: Date,
    content: string,
    senderId: string,
    recieverId: string
    readStatus: ReadStatus
}

export enum ReadStatus {
    READ,
    UNREAD,
    UNRECIEVED
}
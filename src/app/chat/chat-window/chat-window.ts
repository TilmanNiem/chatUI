import { Component, input, signal } from '@angular/core';
import { Message, ReadStatus } from '../../models/messages';

@Component({
  selector: 'app-chat-window',
  imports: [],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css',
})
export class ChatWindow {
  chatId = input.required<string>();

  messages = signal<Message[]>([
    {
      date: new Date(),
      content: "du stinkst",
      readStatus: ReadStatus.UNREAD,
      senderId: "123",
      recieverId: "456"
    },
    {
      date: new Date(),
      content: "du stinkst",
      readStatus: ReadStatus.UNREAD,
      senderId: "123",
      recieverId: "456"
    },
    {
      date: new Date(),
      content: "du stinkst",
      readStatus: ReadStatus.UNREAD,
      senderId: "123",
      recieverId: "456"
    },
  ]);
}

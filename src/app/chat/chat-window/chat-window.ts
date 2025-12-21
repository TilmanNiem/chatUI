import { Component, input, signal } from '@angular/core';
import { MessageRead} from '../models/message-models';

@Component({
  selector: 'app-chat-window',
  imports: [],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css',
})
export class ChatWindow {
  chatId = input.required<string>();

  messages = signal<MessageRead[]>([])
}

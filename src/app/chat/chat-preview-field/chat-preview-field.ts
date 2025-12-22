import { Component, inject, input } from '@angular/core';
import { ChatPreview } from '../models/chat-models';
import { CardModule } from 'primeng/card'
import {Avatar} from 'primeng/avatar';
import {ChatStore} from '../chat-store';

@Component({
  selector: 'app-chat-preview-field',
  imports: [CardModule, Avatar],
  templateUrl: './chat-preview-field.html',
  styleUrl: './chat-preview-field.css',
})
export class ChatPreviewField {
  private readonly chatStore = inject(ChatStore)

  readonly preview = input<ChatPreview>();

  openChat(chatId: string): void {
    this.chatStore.openChat(chatId);
  }
}

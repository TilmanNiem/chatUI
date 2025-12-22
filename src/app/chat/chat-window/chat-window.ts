import {ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MessageRead} from '../models/message-models';
import {Divider} from 'primeng/divider';
import {ChatStore} from '../chat-store';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-chat-window',
  imports: [
    Divider,
    JsonPipe
  ],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindow {
  private readonly store = inject(ChatStore);

  protected readonly activeChat = this.store.activeChat
}

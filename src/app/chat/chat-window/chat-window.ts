import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Divider } from 'primeng/divider';
import { ChatStore } from '../chat-store';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsernamePipe } from '../username-pipe';
import { MessageClient } from '../mesage-client';

@Component({
  selector: 'app-chat-window',
  imports: [
    Divider,
    DatePipe,
    CommonModule,
    InputText,
    Button,
    ReactiveFormsModule,
    FormsModule,
    UsernamePipe,
  ],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindow implements OnInit {
  private readonly store = inject(ChatStore);

  protected readonly activeChat = this.store.activeChat;
  protected readonly activeUser = this.store.activeUser;
  protected readonly messages = this.store.messages;

  protected readonly chatHeader = computed(() => {
    const chat = this.activeChat();
    const activeUser = this.activeUser();
    if (!chat || !activeUser) {
      return '';
    }

    if (chat.isGroup) return chat.groupName;

    const otherParticipant = chat.users.find((user) => user.id !== activeUser.id);
    return otherParticipant ? otherParticipant.username : '';
  });

  protected readonly messageInput = signal<string | null>(null);

  ngOnInit(): void {
    this.store.getCurrentUser();
  }

  sendMessage(): void {
    const chat = this.activeChat();
    const user = this.activeUser();
    if (!chat || !user || !this.messageInput()) {
      return;
    }
    const message = {
      chatId: chat.id,
      content: this.messageInput()!,
      sendDate: new Date(),
      updateDate: new Date(),
      senderId: user.id,
    };
    this.messageInput.set(null);
    this.store.sendMessage(message);
  }
}

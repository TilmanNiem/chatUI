import { Component, inject, OnInit, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ChatPreviewField } from '../chat-preview-field/chat-preview-field';
import { ChatStore } from '../chat-store';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ChatCreate } from '../models/chat-models';
import { ChatCreateDialog } from './chat-create-dialog/chat-create-dialog';

@Component({
  selector: 'app-chats-overview',
  imports: [
    DividerModule,
    ChatPreviewField,
    ProgressSpinner,
    Button,
    DialogModule,
    InputTextModule,
    ChatCreateDialog,
  ],
  templateUrl: './chats-overview.html',
  styleUrl: './chats-overview.css',
})
export class ChatsOverview implements OnInit {
  private readonly chatStore = inject(ChatStore);

  protected readonly chatPreviews = this.chatStore.chatPreviews;
  protected readonly loading = this.chatStore.chatPreviewsLoading;

  protected showDialog = signal<boolean>(false);
  protected chatCreateForm = signal<ChatCreate>({
    userIds: [],
    isGroup: false,
    groupName: null,
  });

  ngOnInit() {
    this.chatStore.getChatPreviews();
  }

  showCreateChatDialog(): void {
    this.showDialog.set(true);
  }

  onSubmit(): void {
    const chat = this.chatCreateForm();
    this.chatStore.createChat(chat);
  }
}

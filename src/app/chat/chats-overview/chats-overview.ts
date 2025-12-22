import {Component, DestroyRef, effect, inject, OnInit, signal, Signal} from '@angular/core';
import { DividerModule } from "primeng/divider";
import { ChatPreview } from '../models/chat-models';
import { ChatPreviewField } from '../chat-preview-field/chat-preview-field'
import {ChatClient} from '../chat-client';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ChatStore} from '../chat-store';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-chats-overview',
  imports: [DividerModule, ChatPreviewField, ProgressSpinner],
  templateUrl: './chats-overview.html',
  styleUrl: './chats-overview.css',
})
export class ChatsOverview implements OnInit {
  private readonly chatStore = inject(ChatStore);

  protected readonly chatPreviews = this.chatStore.chatPreviews;
  protected readonly loading = this.chatStore.chatPreviewsLoading;

  ngOnInit() {
    this.chatStore.getChatPreviews();
  }
}

import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import { DividerModule } from "primeng/divider";
import { ChatPreview } from '../models/chat-models';
import { ChatPreviewField } from '../chat-preview-field/chat-preview-field'
import {ChatClient} from '../chat-client';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chats-overview',
  imports: [DividerModule, ChatPreviewField],
  templateUrl: './chats-overview.html',
  styleUrl: './chats-overview.css',
})
export class ChatsOverview implements OnInit {
  private readonly chatClient= inject(ChatClient);
  private readonly destroyRef = inject(DestroyRef);

  chats = signal<ChatPreview[]>([
  ]);

  ngOnInit(): void {
    this.chatClient.getChatPreviews("123")
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => this.chats.set(res));
  }

}

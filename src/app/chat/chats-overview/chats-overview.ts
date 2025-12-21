import {Component, DestroyRef, inject, signal} from '@angular/core';
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
export class ChatsOverview {
  private readonly chatClient= inject(ChatClient);
  private readonly destroyRef = inject(DestroyRef);

  chats = signal<ChatPreview[]>([
  ]);

  ngOnInit(): void {
    this.chatClient.getChatPreviews("46aa333e-d3df-4225-aa90-70ce9ba379e8")
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => this.chats.set(res));
  }

}

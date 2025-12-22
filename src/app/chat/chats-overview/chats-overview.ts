import {Component, DestroyRef, effect, inject, signal, Signal} from '@angular/core';
import { DividerModule } from "primeng/divider";
import { ChatPreview } from '../models/chat-models';
import { ChatPreviewField } from '../chat-preview-field/chat-preview-field'
import {ChatClient} from '../chat-client';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ChatStore} from '../chat-store';

@Component({
  selector: 'app-chats-overview',
  imports: [DividerModule, ChatPreviewField],
  templateUrl: './chats-overview.html',
  styleUrl: './chats-overview.css',
})
export class ChatsOverview {
  private readonly chatClient= inject(ChatClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly chatStore = inject(ChatStore);

  private readonly userId: Signal<string | null> = this.chatStore.userId

  protected  readonly  chats = signal<ChatPreview[]>([
  ]);

  constructor() {
    console.log("ngOnInit")
    effect(() => {
      console.log("effect", this.userId())
      const userId = this.userId();
      if(userId) {
        this.chatClient.getChatPreviews(userId)
          .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => this.chats.set(res));
      }
    })

  }

}

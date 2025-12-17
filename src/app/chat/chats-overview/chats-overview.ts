import { Component, signal } from '@angular/core';
import { DividerModule } from "primeng/divider";
import { ChatPreview } from '../chat-preview/chat-preview';
import { ChatPreviewModel } from '../models/chat-preview-model';

@Component({
  selector: 'app-chats-overview',
  imports: [DividerModule, ChatPreview],
  templateUrl: './chats-overview.html',
  styleUrl: './chats-overview.css',
})
export class ChatsOverview {

  chats = signal<ChatPreviewModel[]>([
    {
      username: "Niklas",
      lastMessage: "du stinkst"
    },
    {
      username: "GER Feed On",
      lastMessage: "du stinkst1"
    },
    {
      username: "Pörr",
      lastMessage: "du stinkst"
    },
    {
      username: "Leo Link",
      lastMessage: "du stinkst"
    },
    {
      username: "darinki34",
      lastMessage: "du stinkst"
    },
    {
      username: "Robin der Rentner",
      lastMessage: "du stinkst"
    },
  ]);

}

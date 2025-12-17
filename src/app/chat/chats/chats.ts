import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter'
import { ChatsOverview } from "../chats-overview/chats-overview";
import { ChatWindow } from "../chat-window/chat-window";
 
@Component({
  selector: 'app-chats',
  imports: [SplitterModule, ChatsOverview, ChatWindow],
  templateUrl: './chats.html',
  styleUrl: './chats.css',
})
export class Chats {

}

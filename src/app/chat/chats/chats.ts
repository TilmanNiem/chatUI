import { Component, signal } from '@angular/core';
import { SplitterModule } from 'primeng/splitter'
import { ChatsOverview } from "../chats-overview/chats-overview";
import { ChatWindow } from "../chat-window/chat-window";
import { PanelModule } from 'primeng/panel';
 
@Component({
  selector: 'app-chats',
  imports: [SplitterModule, ChatsOverview, ChatWindow, PanelModule],
  templateUrl: './chats.html',
  styleUrl: './chats.css',
})
export class Chats {

  activeChat = signal<string>("123")

}

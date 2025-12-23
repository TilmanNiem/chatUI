import {ChangeDetectionStrategy, Component, inject, OnInit, } from '@angular/core';
import {Divider} from 'primeng/divider';
import {ChatStore} from '../chat-store';
import {CommonModule, DatePipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-chat-window',
  imports: [
    Divider,
    DatePipe,
    CommonModule
  ],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindow implements OnInit {
  private readonly store = inject(ChatStore);

  protected readonly activeChat = this.store.activeChat
  protected readonly activeUser = this.store.activeUser

  ngOnInit(): void {
    this.store.getCurrentUser();
  }
}

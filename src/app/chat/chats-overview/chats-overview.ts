import {Component, DestroyRef, effect, inject, OnInit, signal, Signal} from '@angular/core';
import { DividerModule } from "primeng/divider";
import { ChatPreviewField } from '../chat-preview-field/chat-preview-field'
import {ChatStore} from '../chat-store';
import {ProgressSpinner} from 'primeng/progressspinner';
import { Button } from "primeng/button";
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext';
import { form, required, validate, Field } from '@angular/forms/signals';
import { ChatCreate } from '../models/chat-models';
import { Checkbox } from 'primeng/checkbox'


@Component({
  selector: 'app-chats-overview',
  imports: [DividerModule, ChatPreviewField, ProgressSpinner, Button, DialogModule, InputTextModule, Checkbox, Field],
  templateUrl: './chats-overview.html',
  styleUrl: './chats-overview.css',
})
export class ChatsOverview implements OnInit {
  private readonly chatStore = inject(ChatStore);

  protected readonly chatPreviews = this.chatStore.chatPreviews;
  protected readonly loading = this.chatStore.chatPreviewsLoading;

  protected showDialog = signal<boolean>(false)

  private readonly chatCreate = signal<ChatCreate>({
    userIds: [''],
    isGroup: false,
    groupName: null
  });


  chatCreateForm = form(this.chatCreate, (r) => {
    required(r.userIds);
    required(r.isGroup);
  });

  ngOnInit() {
    this.chatStore.getChatPreviews();
  }


  showCreateChatDialog(): void {
    this.showDialog.set(true);
  }

  onSubmit(): void {
    const value = this.chatCreateForm().value();

    if (this.chatCreateForm().valid()) {
      console.log(value)
      //this.chatStore.createChat(value)
    }
  }

  incrementUserCount(): void {
    const value = this.chatCreate();
    this.chatCreate.set({
      ...value,
      userIds: value.userIds.concat([''])
    })
  }


}

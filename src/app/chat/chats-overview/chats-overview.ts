import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ChatPreviewField } from '../chat-preview-field/chat-preview-field';
import { ChatStore } from '../chat-store';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { form, required, Field, minLength } from '@angular/forms/signals';
import { ChatCreate } from '../models/chat-models';
import { Checkbox } from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {AuthenticationClient} from '../../authentication/authentication-client';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FloatLabel} from 'primeng/floatlabel';
import {UsernamePipe} from '../username-pipe';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-chats-overview',
  imports: [
    DividerModule,
    ChatPreviewField,
    ProgressSpinner,
    Button,
    DialogModule,
    InputTextModule,
    Checkbox,
    Field,
    FormsModule,
    FloatLabel,
    UsernamePipe,
    AsyncPipe,
  ],
  templateUrl: './chats-overview.html',
  styleUrl: './chats-overview.css',
})
export class ChatsOverview implements OnInit {
  private readonly chatStore = inject(ChatStore);
  private readonly authClient = inject(AuthenticationClient)
  private readonly destroyRef = inject(DestroyRef);

  protected readonly chatPreviews = this.chatStore.chatPreviews;
  protected readonly loading = this.chatStore.chatPreviewsLoading;

  protected showDialog = signal<boolean>(false);

  protected usernameInput = signal<string | null>(null);
  protected showGroupNameInput = signal<boolean>(false);

  private readonly chatCreate = signal<ChatCreate>({
    userIds: [],
    isGroup: false,
    groupName: null,
  });

  chatCreateForm = form(this.chatCreate, (r) => {
    required(r.userIds);
    required(r.isGroup);

    minLength(r.userIds, 1);
  });

  ngOnInit() {
    this.chatStore.getChatPreviews();
  }

  showCreateChatDialog(): void {
    this.showDialog.set(true);
  }

  onSubmit(): void {

    this.chatCreate.update(prev => ({
      ...prev,
      isGroup: this.showGroupNameInput(),
    }));
    const value = this.chatCreateForm().value();

      console.log(value, this.chatCreateForm().valid());
    if (this.chatCreateForm().valid()) {
    }

  }

  addUser(): void {
    const username = this.usernameInput();
    if(!username) {
      return;
    }
    const userFilter = {
      usernames: [username]
    }
    this.authClient.searchUsers(userFilter).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(users => {
      users.forEach(user => {
        const userIds = this.chatCreate().userIds;
        const newUserIds = [...userIds, user.id];

        this.chatCreate.update(prev => (
        {
          ...prev,
          userIds: newUserIds,
        }),
          )
      })
    });

    this.usernameInput.set(null);
  }

  removeUser(userId: string): void {
    const userIds = this.chatCreate().userIds;
    const filteredUserIds = userIds.filter(id => id !== userId);

    this.chatCreate.update(prev => ({
      ...prev,
      userIds: filteredUserIds,
    }));
  }
}

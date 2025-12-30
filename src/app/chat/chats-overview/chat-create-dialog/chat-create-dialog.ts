import { Component, DestroyRef, effect, inject, model, signal } from '@angular/core';
import { AuthenticationClient } from '../../../authentication/authentication-client';
import { ChatCreate } from '../../models/chat-models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { UsernamePipe } from '../../username-pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat-create-dialog',
  imports: [FormsModule, Checkbox, FloatLabel, Button, InputText, UsernamePipe, AsyncPipe],
  templateUrl: './chat-create-dialog.html',
  styleUrl: './chat-create-dialog.css',
})
export class ChatCreateDialog {
  private readonly authClient = inject(AuthenticationClient);
  private readonly destroyRef = inject(DestroyRef);

  showDialog = model<boolean>(true);
  chatCreateForm = model<ChatCreate>({
    userIds: [],
    isGroup: false,
    groupName: null,
  });

  protected usernameInput = signal<string | null>(null);
  protected showGroupNameInput = signal<boolean>(false);
  protected groupName = signal<string | null>(null);
  protected userIds = signal<string[]>([]);

  private readonly userCreate = effect(() => {
    this.chatCreateForm.set({
      userIds: this.userIds(),
      isGroup: this.showGroupNameInput(),
      groupName: this.groupName(),
    } as ChatCreate);
  });

  addUser(): void {
    const username = this.usernameInput();
    if (!username) {
      return;
    }
    const userFilter = {
      usernames: [username],
    };
    this.authClient
      .searchUsers(userFilter)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((users) => {
        users.forEach((user) => {
          const userIds = this.userIds();
          const newUserIds = [...userIds, user.id];

          this.userIds.set(newUserIds);
        });
      });

    this.usernameInput.set(null);
  }

  removeUser(userId: string): void {
    const userIds = this.userIds();
    const filteredUserIds = userIds.filter((id) => id !== userId);
    this.userIds.set(filteredUserIds);
  }
}

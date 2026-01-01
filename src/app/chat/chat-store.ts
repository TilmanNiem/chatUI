import { ChatCreate, ChatPreview, ChatRead } from './models/chat-models';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { ChatClient } from './chat-client';
import { inject } from '@angular/core';
import { switchMap, tap, pipe } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';
import { AuthenticationClient } from '../authentication/authentication-client';
import { UserRead } from '../authentication/models/user_models';
import { MessageCreate, MessageRead } from './models/message-models';
import { MessageClient } from './mesage-client';
import { chai } from 'vitest';

type ChatState = {
  activeUser: UserRead | null;
  chatPreviews: ChatPreview[];
  chatPreviewsLoading: boolean;
  activeChat: ChatRead | null;
  activeChatLoading: boolean;
  messageSending: boolean;
  messages: MessageRead[];
};

const initialState: ChatState = {
  activeUser: null,
  chatPreviews: [],
  chatPreviewsLoading: false,
  activeChat: null,
  activeChatLoading: false,
  messageSending: false,
  messages: [],
};

export const ChatStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      client = inject(ChatClient),
      authClient = inject(AuthenticationClient),
      msgClient = inject(MessageClient),
    ) => ({
      openChat: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { activeChatLoading: true })),
          switchMap((id: string) => {
            return client.getChatById(id).pipe(
              tapResponse({
                next: (chat: ChatRead) =>
                  patchState(store, {
                    activeChat: chat,
                    messages: chat.messages,
                    activeChatLoading: false,
                  }),
                error: (err: HttpErrorResponse) => {
                  patchState(store, { activeChatLoading: false });
                  console.error(err.message); //todo: toast message
                },
              }),
            );
          }),
        ),
      ),
      getChatPreviews: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { chatPreviewsLoading: true })),
          switchMap(() => {
            return client.getChatPreviews().pipe(
              tapResponse({
                next: (chat: ChatPreview[]) =>
                  patchState(store, { chatPreviews: chat, chatPreviewsLoading: false }),
                error: (err: HttpErrorResponse) => {
                  patchState(store, { chatPreviewsLoading: false });
                  console.error(err.message); //todo: toast message
                },
              }),
            );
          }),
        ),
      ),
      getCurrentUser: rxMethod<void>(
        pipe(
          switchMap(() => {
            return authClient.getCurrentUser().pipe(
              tapResponse({
                next: (user: UserRead) => patchState(store, { activeUser: user }),
                error: (err: HttpErrorResponse) => {
                  console.error(err.message); //todo: toast message
                },
              }),
            );
          }),
        ),
      ),
      createChat: rxMethod<ChatCreate>(
        pipe(
          tap(() => patchState(store, { chatPreviewsLoading: true, activeChatLoading: true })),
          switchMap((chat) => {
            chat.userIds.push(store.activeUser()?.id!);
            return client.createChat(chat).pipe(
              tapResponse({
                next: (chat: ChatRead) => {
                  patchState(store, {
                    activeChat: chat,
                    messages: chat.messages,
                    activeChatLoading: false,
                    chatPreviewsLoading: false,
                  }); //todo: update chat previews list
                },
                error: (err: HttpErrorResponse) => {
                  patchState(store, { chatPreviewsLoading: false, activeChatLoading: false });
                  console.error(err.message); //todo: toast message
                },
              }),
            );
          }),
        ),
      ),
      sendMessage: rxMethod<MessageCreate>(
        pipe(
          tap(() => patchState(store, { messageSending: true })),
          tap((message) => {
            msgClient.sendMessage(message);
          }),
          tap(() => patchState(store, { messageSending: false })),
        ),
      ),
    }),
  ),

  // WebSocket setup and teardown
  withHooks({
    onInit(store, msgClient = inject(MessageClient)) {
      msgClient.socket$.subscribe((msg) => {
        const incomingChatId = (msg as any)?.chatId;
        const activeChatId = store.activeChat()?.id;

        if (!incomingChatId || incomingChatId === activeChatId) {
          patchState(store, {
            messages: [...store.messages(), msg as MessageRead],
            messageSending: false,
          });
        }
      });
    },
  }),
);

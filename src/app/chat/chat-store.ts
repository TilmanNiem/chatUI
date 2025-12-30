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

type ChatState = {
  activeUser: UserRead | null;
  chatPreviews: ChatPreview[];
  chatPreviewsLoading: boolean;
  activeChat: ChatRead | null;
  activeChatLoading: boolean;
  messageSending: boolean;
  socket: WebSocket | null;
  messages: MessageRead[];
};

const initialState: ChatState = {
  activeUser: null,
  chatPreviews: [],
  chatPreviewsLoading: false,
  activeChat: null,
  activeChatLoading: false,
  messageSending: false,
  socket: null,
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
            const socket = store.socket();
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify(message));
            } else {
              console.error('WebSocket is not connected.');
            }
          }),
        ),
      ),
    }),
  ),

  // WebSocket setup and teardown
  withHooks({
    onInit(store) {
      const clientId = Math.floor(Math.random() * 1000).toString();
      patchState(store, { socket: new WebSocket(`ws://localhost:8000/ws/${clientId}`) });
      const socket = store.socket();
      if (socket) {
        socket.onmessage = (event) => {
          console.log('patch', event.data);
          patchState(store, {
            messages: [...store.messages(), JSON.parse(event.data) as MessageRead],
          });
        };

        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
          console.warn('WebSocket connection closed');
        };
      }
    },
    onDestroy(store) {
      store.socket()?.close();
    },
  }),
);

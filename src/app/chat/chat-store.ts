import {ChatPreview, ChatRead} from './models/chat-models';
import {patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals'
import {ChatClient} from './chat-client';
import {inject} from '@angular/core';
import {switchMap, tap, pipe} from 'rxjs';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {HttpErrorResponse} from '@angular/common/http';
import { tapResponse } from '@ngrx/operators'
import {AuthenticationClient} from '../authentication/authentication-client';
import {UserRead} from '../authentication/models/user_models';

type ChatState = {
  activeUser: UserRead | null;
  chatPreviews: ChatPreview[];
  chatPreviewsLoading: boolean;
  activeChat: ChatRead | null;
  activeChatLoading: boolean;
}

const initialState: ChatState = {
  activeUser: null,
  chatPreviews: [],
  chatPreviewsLoading: false,
  activeChat: null,
  activeChatLoading: false,
}

export const ChatStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, client = inject(ChatClient), authClient = inject(AuthenticationClient)) => ({
    openChat: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { activeChatLoading: true })),
        switchMap((id: string) => {
          return client.getChatById(id).pipe(
            tapResponse({
              next: (chat: ChatRead) =>
                patchState(store, { activeChat: chat, activeChatLoading: false}),
              error: (err: HttpErrorResponse) => {
                patchState(store, { activeChatLoading: false });
                console.error(err.message); //todo: toast message
              }
            })
          )
        } )
      )
    ),
    getChatPreviews: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { chatPreviewsLoading: true })),
        switchMap(() => {
          return client.getChatPreviews().pipe(
            tapResponse({
              next: (chat: ChatPreview[]) =>
                patchState(store, { chatPreviews: chat, chatPreviewsLoading: false}),
              error: (err: HttpErrorResponse) => {
                patchState(store, { chatPreviewsLoading: false });
                console.error(err.message); //todo: toast message
              },
            })
          )
        } )
      )
    ),
    getCurrentUser: rxMethod<void>(
      pipe(
        switchMap(() => {
          return authClient.getCurrentUser().pipe(
            tapResponse({
              next: (user: UserRead) =>
                patchState(store, { activeUser: user}),
              error: (err: HttpErrorResponse) => {
                console.error(err.message); //todo: toast message
              },
            })
          )
        })
      )
    )
  })),
)

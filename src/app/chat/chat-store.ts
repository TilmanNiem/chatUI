import {ChatPreview, ChatRead} from './models/chat-models';
import {patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import {ChatClient} from './chat-client';
import {inject} from '@angular/core';
import {switchMap, tap, pipe} from 'rxjs';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {HttpErrorResponse} from '@angular/common/http';
import { tapResponse } from '@ngrx/operators'

type ChatState = {
  chatPreviews: ChatPreview[];
  chatPreviewsLoading: boolean;
  activeChat: ChatRead | null;
  activeChatLoading: boolean;
}

const initialState: ChatState = {
  chatPreviews: [],
  chatPreviewsLoading: false,
  activeChat: null,
  activeChatLoading: false,
}

export const ChatStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, client = inject(ChatClient)) => ({
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
    )
  }))
)

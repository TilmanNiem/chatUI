import {ChatPreview, ChatRead} from './models/chat-models';
import {patchState, signalStore, withMethods, withState } from '@ngrx/signals'

type ChatState = {
  userId: string | null;
  chatPreviews: ChatPreview[];
  chatPreviewsLoading: boolean;
  activeChat: ChatRead | null;
  activeChatLoading: boolean;
}

const initialState: ChatState = {
  userId: null,
  chatPreviews: [],
  chatPreviewsLoading: false,
  activeChat: null,
  activeChatLoading: false,
}

export const ChatStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setUserId(id: string): void {
      patchState(store, { userId: id});
    }
  }))
)

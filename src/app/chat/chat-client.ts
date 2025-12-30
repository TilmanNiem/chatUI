import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants';
import { ChatCreate, ChatPreview, ChatRead } from './models/chat-models';
import { Observable } from 'rxjs';
import { MessageCreate } from './models/message-models';

@Injectable({
  providedIn: 'root',
})
export class ChatClient {
  private readonly httpClient = inject(HttpClient);

  private readonly BASE_URL = API_BASE_URL + '/chats';

  getChatPreviews(): Observable<ChatPreview[]> {
    return this.httpClient.get<ChatPreview[]>(this.BASE_URL + '/previews');
  }

  getChatById(id: string): Observable<ChatRead> {
    return this.httpClient.get<ChatRead>(this.BASE_URL + '/' + id);
  }

  createChat(chat: ChatCreate): Observable<ChatRead> {
    return this.httpClient.post<ChatRead>(this.BASE_URL, chat);
  }
}

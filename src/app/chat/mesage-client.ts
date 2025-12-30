import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants';
import { ChatCreate, ChatPreview, ChatRead } from './models/chat-models';
import { Observable } from 'rxjs';
import { MessageCreate, MessageRead } from './models/message-models';

@Injectable({
  providedIn: 'root',
})
export class MessageClient {
  private readonly httpClient = inject(HttpClient);

  private readonly BASE_URL = API_BASE_URL + '/messages';

  sendMessage(message: MessageCreate): Observable<MessageRead> {
    return this.httpClient.post<MessageRead>(this.BASE_URL + '/send', message);
  }
}

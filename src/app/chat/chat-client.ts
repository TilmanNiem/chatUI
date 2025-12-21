import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../constants';
import {ChatPreview} from './models/chat-models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatClient {
  private readonly httpClient = inject(HttpClient);

  private readonly BASE_URL = API_BASE_URL + '/chats';

  getChatPreviews(userId: string): Observable<ChatPreview[]> {
    return this.httpClient.get<ChatPreview[]>(this.BASE_URL + '/chats/preview', {headers: { 'userId': userId}});
  }
}

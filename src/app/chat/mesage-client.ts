import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_BASE_URL } from '../constants';
import { ChatCreate, ChatPreview, ChatRead } from './models/chat-models';
import { Observable, Subject } from 'rxjs';
import { MessageCreate, MessageRead } from './models/message-models';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MessageClient {
  private socket!: WebSocket;
  private readonly httpClient = inject(HttpClient);
  private messages = new Subject<string>();

  private readonly BASE_URL = API_BASE_URL + '/messages';
}

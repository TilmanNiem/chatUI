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

  connect(clientId: string): Observable<string> {
    this.socket = new WebSocket(`ws://localhost:8000/ws/${clientId}`);
    this.socket.onmessage = (event) => {
      this.messages.next(event.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.warn('WebSocket connection closed');
    };

    return this.messages.asObservable();
  }

  sendMessage(message: MessageCreate) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
      console.log(message);
    }
  }

  disconnect() {
    this.socket?.close();
  }

  //sendMessage(message: MessageCreate): Observable<MessageRead> {
  //  return this.httpClient.post<MessageRead>(this.BASE_URL + '/send', message);
  //}
}

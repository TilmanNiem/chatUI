import { webSocket } from 'rxjs/webSocket';
import { Injectable, OnDestroy } from '@angular/core';
import { MessageCreate } from './models/message-models';

@Injectable({
  providedIn: 'root',
})
export class MessageClient implements OnDestroy {
  private token = localStorage.getItem('token') ?? '';
  socket$ = webSocket(`ws://localhost:8000/ws?token=${this.token}`);

  ngOnDestroy(): void {
    this.socket$.complete();
  }

  sendMessage(msg: MessageCreate): void {
    this.socket$.next(msg);
  }
}

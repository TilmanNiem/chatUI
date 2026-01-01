import { webSocket } from 'rxjs/webSocket';
import { Injectable, OnDestroy } from '@angular/core';
import { MessageCreate } from './models/message-models';
import { WS_BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class MessageClient implements OnDestroy {
  private readonly token = localStorage.getItem('token') ?? '';
  private readonly websocketURL: string = WS_BASE_URL;
  public socket$ = webSocket(this.websocketURL + `?token=${this.token}`);

  ngOnDestroy(): void {
    this.socket$.complete();
  }

  sendMessage(msg: MessageCreate): void {
    this.socket$.next(msg);
  }
}

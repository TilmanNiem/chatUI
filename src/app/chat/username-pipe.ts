import { Pipe, PipeTransform, Injectable, inject} from '@angular/core';
import {BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { AuthenticationClient } from '../authentication/authentication-client';
import { UserRead } from '../authentication/models/user_models';

@Pipe({ name: 'username', pure: true })
@Injectable({ providedIn: 'root' })
export class UsernamePipe implements PipeTransform {

  private readonly authClient = inject(AuthenticationClient);

  transform(userId?: string | null): Observable<string | null> {
    if (!userId) {
      return of(null);
    }

    return this.authClient.getUserById(userId).pipe(map(user => user.username ?? ''));
  }


}


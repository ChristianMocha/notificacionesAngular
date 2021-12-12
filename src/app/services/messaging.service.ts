import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireDB: AngularFireDatabase, private angularFireAuth: AngularFireAuth, private angularFireMessaging: AngularFireMessaging) {
      
  }

  requestPermission() {
    console.log("entrando");
    this.angularFireMessaging.requestPermission
      .pipe(mergeMapTo(this.angularFireMessaging.tokenChanges))
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },  
      );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload:any) => {
        console.log("new message received. ", payload.notification.body);
        this.currentMessage.next(payload.notification.body);
      })
  }
}

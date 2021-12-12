import { Component } from '@angular/core';
import { MessagingService } from './services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notifications2';
  message:any;

  constructor(private afMessaging: MessagingService ){
    this.afMessaging.receiveMessage()
    this.message = this.afMessaging.currentMessage
    console.log(this.message);
  }


  requestPermission() {
    this.afMessaging.requestPermission()
  }
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

// This component will display ALL messages
// -> including: the message sent by the HeroService when it fetches the heroes

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {

  // Injecting another instance of MessageService, this time into the message component
  // -> declaring a public messageService property 
  // -> PUBLIC: binding to it in the template => only binding occurs if a component has a public property  
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {}
}

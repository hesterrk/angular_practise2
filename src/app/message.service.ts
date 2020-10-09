import { Injectable } from '@angular/core';

// This Service: displays cache of messages and has 2 methods
// This service will be injected into HeroService 

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  // Add message to cache
  add(message: string) {
    this.messages.push(message);
  }

  // Clear message from cache

  clear() {
    this.messages = [];
  }
}

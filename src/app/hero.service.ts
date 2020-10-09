import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';

// Injectable marks this class as one that participates in the dependency injection system
// Provides as an injectable service BUT can also have its own dependncies injected into it

// Providers: by default -> the providedIn property, which creates a provider for the service at root level => means an instance of HeroService can be injected into any class that we specify + if this service is not used then angualr removes the entire services (optimises app)

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // Declaring a private messageService property
  // Angular will inject an instance of MessageService into that property when it creates HeroService
  constructor(private messageService: MessageService) {}

  // Method to return the mock heroes
  // Using the messageService property to send a message when the heroes are fetched from server
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    //HEROES holds our mock data
    return of(HEROES);
  }
  // Method to get individual hero to call in HeroDetail component
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find((hero) => hero.id === id));
  }
}

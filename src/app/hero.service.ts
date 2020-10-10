import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Injectable marks this class as one that participates in the dependency injection system
// Provides as an injectable service BUT can also have its own dependncies injected into it

// Providers: by default -> the providedIn property, which creates a provider for the service at root level => means an instance of HeroService can be injected into any class that we specify + if this service is not used then angualr removes the entire services (optimises app)

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // Defining heroesURL which has address of the heroes resource on the server
  // -> the api (resource to which the requests are made) is the base
  // -> the heroes is the collectionName => which is the heroes data which is in in-memory-data-service
  private heroesUrl = 'api/heroes';

  // Special header for the put request to save the hero's updated name
  // we would use PUT if we want to overwrite a course object with a completely new version of that same course object
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Declaring a private messageService property
  // Angular will inject an instance of MessageService into that property when it creates HeroService
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // // Method to return the mock heroes
  // // Using the messageService property to send a message when the heroes are fetched from server
  // getHeroes(): Observable<Hero[]> {
  //   // this.messageService.add('HeroService: fetched heroes');
  //   //HEROES holds our mock data
  //   return of(HEROES);
  // }

  // Method to return the mock heroes using HttpClient
  getHeroes(): Observable<Hero[]> {
    //returns our heroes array from server
    // By default httpclient.get() method returns the response as a untyped JSON object
    // -> so we add the type specifier <Hero[]> for the .get() call
    // ==> this returns our heroes array as an observable of Hero type
    // NOTE => The server's data API determines the shape of the JSON data e.g put it in an object instead of an array
    return (
      this.http
        .get<Hero[]>(this.heroesUrl)
        // Error handling => to catch errors we "pipe" the Observable result from the .get() error responsee through a catchError() operator (catchError comes from RxJS) which passes it to an error handler
        // -> handleError() method (used by many Heroservice api call methods) reports the error and returns an safe result/value so app keeps working(this is optional), it also is configured with the name of the operation that failed 'get api'
        // Tap => logs the operation, just looks at the returned observable values and logs a message
        .pipe(
          tap((_) => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        )
    );
  }

  // Method to get individual hero to call in HeroDetail component
  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   // this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find((hero) => hero.id === id));
  // }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // Method to update an individual hero's name
  // .put's params:
  // 1 -> URL
  // 2 -> data to update (hero)
  // 3 -> options: httpOptions represents a special header to save the request

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // Method to add a new hero
  // This method expects the server to generate an id for the new hero
  // This method makes and returns a new Observable Hero

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero with id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // Method to delete a hero
  // the '|' is a union type from TS => means hero can be have the type of object or number

  deleteHero(hero: Hero | number): Observable<Hero> {
    console.log(hero, 'HERO WHAT IS IT');
    // Getting the id from the input param
    // If it has the type Hero (object) then gets the Hero object's id
    // A hero can be deleted by providing a Hero object or a hero ID (number type)
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    // the url represents the hero to delete
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // handleError method definition: handle any HTTP operation that fails
  // -> Params: operation is name of the operation that failed; result is value to return as observable result: it has a '?' to show thats its optional(we dont always have to return a value)
  // the 'T' is declaring a type of function that can have multiple run-time type values BECAUSE: each service method returns a different kind of Observable value

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Reporting the error to the console
      console.error(error);

      // Making error into user friendly message
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning a safe empty result
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}

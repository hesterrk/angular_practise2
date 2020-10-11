import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../heroes/hero';
import { HeroService } from '../hero.service';

// This Component:
//  -> Starts with an empty list
//  -> Typing on the input box doesn’t change the list for 299ms
// -> The list of matching heroes appear after 300ms
// -> Perform multiple searches in a row — 300ms apart
// -> Doesn’t perform a search if the search term doesn’t change

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  // heroes property is an Observable with type Hero[]
  heroes$: Observable<Hero[]>;

  // This property is the observable stream
  // searchTerms is a Subject
  // --> Subject: special TYPE of observable (object) that can emit an event + can receive a stream of events (aka search terms each time a user inserts a new term) => is an Observable and holds a list of observables => emits a stream of these search terms
  // --> because a subject is an object is has methods like .next() => feeds a new value to the subject .next(newTerm)
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // When user types name/term into box, it passes this term in searchTerm property which puts it into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // the lastest search term gets piped in, then passed into searchHeroes api call, then the result of that call gets assigned to this.heroes$ => so this variable becomes the array of those names that the search term matches with
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term -> reduces the number of calls to searchHeroes() api call
      debounceTime(300),

      // ignores the new term if its the same as previous one
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // -> each time the searchTerms property receive an event (new term)
      // -> returns the latest search term observable
      // -> switchMap preserves the original request order and discards results from prior csalls (from earlier search terms)
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}

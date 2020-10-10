import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from '../hero.service';

//Each time you click a hero, a new message appears under it. Use the "clear" button to clear the message history
// Injecting MessageService instance into this component
// import { MessageService } from '../message.service';

// The selector name: the unique name used to identify the app component in the HTML DOM tree once it is rendered into the browser
// selector property of the component is just a string that is used to identify the component or an element in the DOM

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  //heroes is our property that holds our mock data
  heroes: Hero[];

  // Selected hero has the type Hero
  // selectedHero: Hero;

  // Defining a heroService property with the type of HeroService (aka identifying this as a place for HeroService to be injected)
  // Here we are creating one instance of our HeroService (aka it can be used in other classes)
  constructor(
    private heroService: HeroService // private messageService: MessageService
  ) {}

  //calling our getHeroes() function: which angular does after the HeroesComponent has been constructed
  ngOnInit(): void {
    this.getHeroes();
  }

  // This method assigns the clicked hero from the template to the component's selectedHero property
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   // Using messageService to add a message when we select a hero
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  // Method to retrieve heroes from the service
  // getHeroes() at end is a method on the HeroService
  //HeroService is making a request from server => so waits for the return of the Observable
  //subscribe() method => passes the array returned in the observable to the callback => sets the component's hero property to it
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  // Add method (click event in heroes template)
  // trim() method => JS removes whitespace from both side of the entered name (as its in a input box)
  // If nothing is entered in => nothing happens

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    //else
    // Pass in a hero-like object containing the new name as the 'Hero' object
    // -> the 'as' says consider this object the same as the Hero object
    this.heroService
      .addHero({ name } as Hero)
      // Once the server creates a new hero (observable) through the addHero method => we can then add this new hero to the heroes list (property)
      .subscribe((hero) => this.heroes.push(hero));
  }



  // Delete method (click event in heroes template)

  delete(hero: Hero): void {
    // This removes the deleted hero from the displayed list
    //Filter leaves our heroes array with all the heros except the one that we clicked delete on
    this.heroes = this.heroes.filter(h => h !== hero)
    // Deleting the selected hero from the server 
    // Nothing to do in terms of subscribing but HAS TO => the service will not send the delete request to the server => an Observable does nothing until something subscribes
    this.heroService.deleteHero(hero).subscribe()


  }





}

import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../heroes/hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  // This component initially recieived the hero object through its 'hero' property and displays it
  // Input property => input allows data to flow from parent to child component
  // This hero receives its value from Heroes Component (parent): the value being selectedHero's value
  // @Input() hero: Hero

  hero: Hero;

  // ActivatedRoute => holds info about the route for this instance of this component aka the route params - the specific id (each instance is a different hero to display)
  // HeroService => gets us the data from remote server - so will get the specific hero to display in each instance
  // Location => an Angular service for interacting with browser => used for naviation => back to the dashboard component

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // Finds the id of the specific clicked hereo in the URL
    // -> the + converts the string (as the number in url is in string format) into a number
    // -> the paramMap is a dictionary that provides access to the required and optional parameters specific to a route => it has a few methods on it including 'get' => which retrives a single value in a param in this case the "id"
    const id = +this.route.snapshot.paramMap.get('id');
    // console.log(this.route.snapshot.paramMap, 'pMAPP');
    //paramsMap => {params: {id: 4}}
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  // Method to navigate back to dashboard component
  // -> it navigates backward one step in the browser's history stack using Location service that we injected into constructor

  goBack(): void {
    this.location.back();
  }

  // Method to save/persist the edited name changes to the server
  // Once its saved, it automatically navigates back to the previous view
  // updateHero method is defined in the HeroService
  // If this updatedHero method resolves successfuly it returns an Observable (contains the response data back from server), so once this happens we can then call the goBack method
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}

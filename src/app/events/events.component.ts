import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { EventItem } from '../models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: EventItem[] = [];
  displayedEvents: EventItem[] = [];
  totalEvents = 0;
  searchTerm = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.events = this.eventService.getEvents();
    this.displayedEvents = [...this.events];
    this.totalEvents = this.events.length;
  }

  onSearch(term: string): void {
    this.searchTerm = term || '';
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) {
      this.displayedEvents = [...this.events];
      return;
    }
    this.displayedEvents = this.events.filter((e) => {
      return (
        e.title.toLowerCase().includes(q) ||
        (e.description || '').toLowerCase().includes(q) ||
        (e.eventType || '').toLowerCase().includes(q)
      );
    });
  }
}

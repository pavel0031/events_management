import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { EventItem } from '../models/event.model';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
})
export class EventCreateComponent {
  event: EventItem = this.createEmptyEvent();
  feedback = '';

  constructor(
    private eventService: EventService,
    private router: Router,
  ) {}

  createEmptyEvent(): EventItem {
    return {
      id: 0,
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      eventType: 'Conference',
      isPublic: true,
      maxAttendees: 50,
    };
  }

  save(): void {
    if (!this.event.title || !this.event.startDate || !this.event.endDate) {
      this.feedback = 'Please fill in title, start date, and end date.';
      return;
    }

    this.eventService.addEvent({ ...this.event });
    this.feedback = 'Event created successfully.';
    this.event = this.createEmptyEvent();
    setTimeout(() => this.router.navigate(['/events']), 600);
  }

  cancel(): void {
    this.router.navigate(['/events']);
  }
}

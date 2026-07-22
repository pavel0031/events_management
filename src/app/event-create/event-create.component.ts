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
feedback: string = '';

  event: EventItem = {
    eventNo: 0,
    eventTitle: '',
    eventDescription: '',
    startDate: '',
    endDate: '',
    eventType: '',
    isPublic: false,
    maxAttendees: 0
  };

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  saveEvent() {
  this.eventService.saveEvent(this.event).subscribe({
    next: (response) => {
      console.log("Event saved successfully", response);
      alert("Event inserted successfully");

      this.event = {
        eventNo: 0,
        eventTitle: '',
        eventDescription: '',
        startDate: '',
        endDate: '',
        eventType: '',
        isPublic: false,
        maxAttendees: 0
      };
    },
    error: (error) => {
      console.error("Insert failed", error);
      alert("Failed to insert event");
    }
  });
}

  cancel(): void {
    this.router.navigate(['/events']);
  }
}
  /*
  event: EventItem = this.createEmptyEvent();
  feedback = '';

  constructor(
    private eventService: EventService,
    private router: Router,
  ) {}

  createEmptyEvent(): EventItem {
    return {
      eventNo: 0,
      eventTitle: '',
      eventDescription: '',
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
    */


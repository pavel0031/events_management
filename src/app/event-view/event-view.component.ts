import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { EventItem } from '../models/event.model';
import { Registration } from '../models/registration.model';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css'],
})
export class EventViewComponent implements OnInit {
  event: EventItem | null = null;
  registrations: Registration[] = [];
  editMode = false;
  editEvent: EventItem = this.createEmptyEvent();
  feedback = '';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadEvent();
  }

  loadEvent(): void {
    const eventNoParam = this.route.snapshot.paramMap.get('eventNo');
    if (!eventNoParam) {
      this.router.navigate(['/events']);
      return;
    }

    const eventNo = Number(eventNoParam);
    if (Number.isNaN(eventNo) || eventNo <= 0) {
      this.router.navigate(['/events']);
      return;
    }

    // load registrations after the event has been fetched
    this.eventService.getEventById(eventNo).subscribe(
      (data) => {
        this.event = data;
        this.registrations = this.eventService.getRegistrationsForEvent(eventNo);
      },
      () => {
        // if the event couldn't be loaded, go back to list
        this.router.navigate(['/events']);
      },
    );
  }

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

  startEdit(): void {
    if (!this.event) {
      return;
    }
    this.editMode = true;
    this.editEvent = { ...this.event };
    this.feedback = '';
  }
  saveEdit(): void {
    if (
      !this.editEvent.eventTitle ||
      !this.editEvent.startDate ||
      !this.editEvent.endDate
    ) {
      this.feedback = 'Please complete the event fields before saving.';
      return;
    }

    // call the HTTP update endpoint (service expects id + event)
    this.eventService.updateEvent(this.editEvent.eventNo, this.editEvent).subscribe(
      () => {
        this.feedback = 'Event updated successfully.';
        this.editMode = false;
        this.loadEvent();
      },
      (err) => {
        this.feedback = 'Failed to update event.';
        console.error(err);
      },
    );
  }

  cancelEdit(): void {
    this.editMode = false;
    this.feedback = '';
  }

  deleteEvent(): void {
    if (!this.event) {
      return;
    }
    this.eventService.deleteEvent(this.event.eventNo).subscribe(
      () => this.router.navigate(['/events']),
      (err) => {
        this.feedback = 'Failed to delete event.';
        console.error(err);
      },
    );
  }

  registerAttendee(payload: { name: string; email: string }): void {
    if (!this.event) {
      return;
    }
    this.eventService.addRegistration({
      attendeeNo: 0,
      eventNo: this.event.eventNo,
      attendeeName: payload.name,
      attendeeEmail: payload.email,
      registrationDate: new Date().toISOString().slice(0, 16),
    });
    this.registrations = this.eventService.getRegistrationsForEvent(
      this.event.eventNo,
    );
    this.feedback = 'Attendee registered successfully.';
  }
}

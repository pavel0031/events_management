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
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.router.navigate(['/events']);
      return;
    }

    const eventId = Number(idParam);
    this.event = this.eventService.getEventById(eventId) || null;
    if (!this.event) {
      this.router.navigate(['/events']);
      return;
    }

    this.registrations = this.eventService.getRegistrationsForEvent(eventId);
  }

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
      !this.editEvent.title ||
      !this.editEvent.startDate ||
      !this.editEvent.endDate
    ) {
      this.feedback = 'Please complete the event fields before saving.';
      return;
    }

    this.eventService.updateEvent(this.editEvent);
    this.feedback = 'Event updated successfully.';
    this.editMode = false;
    this.loadEvent();
  }

  cancelEdit(): void {
    this.editMode = false;
    this.feedback = '';
  }

  deleteEvent(): void {
    if (!this.event) {
      return;
    }
    this.eventService.deleteEvent(this.event.id);
    this.router.navigate(['/events']);
  }

  registerAttendee(payload: { name: string; email: string }): void {
    if (!this.event) {
      return;
    }
    this.eventService.addRegistration({
      id: 0,
      eventId: this.event.id,
      attendeeName: payload.name,
      attendeeEmail: payload.email,
      registrationDate: new Date().toISOString().slice(0, 16),
    });
    this.registrations = this.eventService.getRegistrationsForEvent(
      this.event.id,
    );
    this.feedback = 'Attendee registered successfully.';
  }
}

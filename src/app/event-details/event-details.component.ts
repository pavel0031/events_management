import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { EventItem } from '../models/event.model';
import { Registration } from '../models/registration.model';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit, OnChanges {
  @Input() event: EventItem | null = null;
  @Input() registrations: Registration[] = [];
  @Output() edit = new EventEmitter<EventItem>();
  @Output() delete = new EventEmitter<EventItem>();
  @Output() registerToggle = new EventEmitter<void>();
  @Output() registrationSubmit = new EventEmitter<{
    name: string;
    email: string;
  }>();
 totalattendee = 0;
 registrationAttendees: Registration[] = [];

 countTotalAttendee(eventNo: number): void {
    this.eventService.getAllAttendees().subscribe({
      next: (attendees) => {
        this.totalattendee = attendees.filter((attendee) => attendee.eventNo === eventNo).length;
      },
      error: (err) => {
        console.error('Error loading attendees', err);
      }
    });
  }

  ngOnInit() {  
    const eventNo = this.activatedRoute.snapshot.paramMap.get('eventNo');
    if (eventNo) {
      const id = +eventNo;
      this.countTotalAttendee(id);

      this.eventService.getEventById(id).subscribe({
        next: (data) => (this.event = data),
        error: (err) => console.error('Error loading event', err),
      });

      this.eventService.getAllAttendees().subscribe({
        //next: (data) => (this.registrationAttendees = data.filter((r) => r.eventNo === id)),
        next: (data) => {this.registrationAttendees = data
                        .filter((r) => r.eventNo === id)
                        .sort((a, b) => a.attendeeNo - b.attendeeNo); },
        error: (err) => console.error('Error loading registrationAttendees', err),
      });
    } else if (this.event) {
      // component used via Inputs — compute from provided event
      this.countTotalAttendee(this.event.eventNo);
      this.eventService.getAllAttendees().subscribe({
        next: (data) => (this.registrationAttendees = data.filter((r) => r.eventNo === this.event!.eventNo)),
        error: (err) => console.error('Error loading registrationAttendees', err),
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event'] && this.event) {
      // when input event changes, recalc attendees
      this.countTotalAttendee(this.event.eventNo);
      this.eventService.getAllAttendees().subscribe({
        next: (data) => (this.registrationAttendees = data.filter((r) => r.eventNo === this.event!.eventNo)),
        error: (err) => console.error('Error loading registrationAttendees', err),
      });
    }
    if (changes['registrations'] && this.event) {
      // if parent passed registrations array, use it to set list and count
      this.registrationAttendees = this.registrations.filter((r) => r.eventNo === this.event!.eventNo);
      this.totalattendee = this.registrationAttendees.length;
    }
  }
  
  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {}
  
  showRegistration = false;
  registrationName = '';
  registrationEmail = '';

  toggleRegistration(): void {
    this.showRegistration = !this.showRegistration;
    if (!this.showRegistration) {
      this.registrationName = '';
      this.registrationEmail = '';
    }
  }

  submitRegistration(): void {
    if (!this.event) {
      return;
    }

    if (!this.registrationName.trim() || !this.registrationEmail.trim()) {
      return;
    }

    const request = {
      attendeeNo: 0,
      eventNo: this.event.eventNo,
      attendeeName: this.registrationName,
      attendeeEmail: this.registrationEmail,
      registrationDate: new Date().toISOString(),
    };

    this.eventService.registerAttendee(request).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        alert('Registration successful');
        this.registrationName = '';
        this.registrationEmail = '';
        this.showRegistration = false;
        // refresh counts and list after successful registration
        if (this.event) {
          this.countTotalAttendee(this.event.eventNo);
          this.eventService.getAllAttendees().subscribe({
            next: (data) => (this.registrationAttendees = data.filter((r) => r.eventNo === this.event!.eventNo)),
            error: (err) => console.error('Error loading registrationAttendees', err),
          });
        }
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed');
      },
    });
  }
}

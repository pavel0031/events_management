import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { EventItem } from '../models/event.model';
import { Registration } from '../models/registration.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
 events: EventItem[] = [];
 constructor(private eventService: EventService){}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        console.log(data);
      },
      error: (err) => {
        console.error("Error loading events", err);
      }
    });
  }
  @Input() event: EventItem | null = null;
  @Input() registrations: Registration[] = [];
  @Output() edit = new EventEmitter<EventItem>();
  @Output() delete = new EventEmitter<EventItem>();
  @Output() registerToggle = new EventEmitter<void>();
  @Output() registrationSubmit = new EventEmitter<{
    name: string;
    email: string;
  }>();

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
    if (!this.registrationName.trim() || !this.registrationEmail.trim()) {
      return;
    }
    this.registrationSubmit.emit({
      name: this.registrationName.trim(),
      email: this.registrationEmail.trim(),
    });
    this.registrationName = '';
    this.registrationEmail = '';
    this.showRegistration = false;
  }
}

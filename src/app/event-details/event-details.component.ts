import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventItem } from '../models/event.model';
import { Registration } from '../models/registration.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent {
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

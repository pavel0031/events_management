import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventItem } from '../models/event.model';
import { Registration } from '../models/registration.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
 
  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // Insert event
  saveEvent(event: EventItem): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/save-event`,
      event
    );
  }

  // Get all events
  getAllEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(
      `${this.baseUrl}/event-data`
    );
  }

  // Get event by ID
  getEventById(eventNo: number): Observable<EventItem> {
    return this.http.get<EventItem>(
      `${this.baseUrl}/event/${eventNo}`
    );
  }

  // Update event
  updateEvent(eventNo: number, event: EventItem): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/event/${eventNo}`,
      event
    );
  }

  // Delete event
  deleteEvent(eventNo: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/delete-event/${eventNo}`
    );
  }

  
  private registrations: Registration[] = [
    {
      AttendeeNo: 1,
      eventNo: 1,
      attendeeName: 'Sara Ahmed',
      attendeeEmail: 'sara@example.com',
      registrationDate: '2026-05-01T09:12',
    },
    {
      AttendeeNo: 2,
      eventNo: 2,
      attendeeName: 'Rohan Das',
      attendeeEmail: 'rohan@example.com',
      registrationDate: '2026-05-02T10:45',
    },
    {
      AttendeeNo: 3,
      eventNo: 3,
      attendeeName: 'Laila Khan',
      attendeeEmail: 'laila@example.com',
      registrationDate: '2026-05-03T11:40',
    },
    {
      AttendeeNo: 4,
      eventNo: 2,
      attendeeName: 'Nabil Hossain',
      attendeeEmail: 'nabil@example.com',
      registrationDate: '2026-05-03T15:25',
    },
    {
      AttendeeNo: 5,
      eventNo: 4,
      attendeeName: 'Tania Roy',
      attendeeEmail: 'tania@example.com',
      registrationDate: '2026-05-04T13:12',
    },
    {
      AttendeeNo: 6,
      eventNo: 5,
      attendeeName: 'Amina Jahan',
      attendeeEmail: 'amina@example.com',
      registrationDate: '2026-05-05T14:55',
    },
    {
      AttendeeNo: 7,
      eventNo: 3,
      attendeeName: 'Imran Ali',
      attendeeEmail: 'imran@example.com',
      registrationDate: '2026-05-05T17:20',
    },
    {
      AttendeeNo: 8,
      eventNo: 6,
      attendeeName: 'Fahim Sultan',
      attendeeEmail: 'fahim@example.com',
      registrationDate: '2026-05-06T09:05',
    },
    {
      AttendeeNo: 9,
      eventNo: 8,
      attendeeName: 'Ruma Akter',
      attendeeEmail: 'ruma@example.com',
      registrationDate: '2026-05-07T12:44',
    },
    {
      AttendeeNo: 10,
      eventNo: 1,
      attendeeName: 'Mahmood Karim',
      attendeeEmail: 'mahmood@example.com',
      registrationDate: '2026-05-07T16:31',
    },
    {
      AttendeeNo: 11,
      eventNo: 7,
      attendeeName: 'Shabnam Sultana',
      attendeeEmail: 'shabnam@example.com',
      registrationDate: '2026-05-08T19:12',
    },
    {
      AttendeeNo: 12,
      eventNo: 5,
      attendeeName: 'Tanvir Hasan',
      attendeeEmail: 'tanvir@example.com',
      registrationDate: '2026-05-09T08:51',
    },
  ];
/*
  getEvents(): EventItem[] {
    return [...this.events];
  }

  getEventById(id: number): EventItem | undefined {
    return this.events.find((event) => event.id === id);
  }

  addEvent(event: EventItem): void {
    const nextId = this.events.length
      ? Math.max(...this.events.map((item) => item.id)) + 1
      : 1;
    this.events.push({ ...event, id: nextId });
  }

  updateEvent(updated: EventItem): void {
    const index = this.events.findIndex((item) => item.id === updated.id);
    if (index !== -1) {
      this.events[index] = { ...updated };
    }
  }

  deleteEvent(id: number): void {
    this.events = this.events.filter((item) => item.id !== id);
    this.registrations = this.registrations.filter((reg) => reg.eventId !== id);
  }
*/
  getRegistrations(): Registration[] {
    return [...this.registrations];
  }

  getRegistrationsForEvent(eventId: number): Registration[] {
    return this.registrations.filter((reg) => reg.eventNo === eventId);
  }

  addRegistration(registration: Registration): void {
    const nextId = this.registrations.length
      ? Math.max(...this.registrations.map((item) => item.AttendeeNo)) + 1
      : 1;
    this.registrations.push({ ...registration, AttendeeNo: nextId });
  }

  updateRegistration(updated: Registration): void {
    const index = this.registrations.findIndex(
      (item) => item.AttendeeNo === updated.AttendeeNo,
    );
    if (index !== -1) {
      this.registrations[index] = { ...updated };
    }
  }

  deleteRegistration(id: number): void {
    this.registrations = this.registrations.filter((item) => item.AttendeeNo !== id);
  }
  // getEventCountByMonth(): Array<{ month: string; count: number }> {
  //   const months = [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Aug',
  //     'Sep',
  //     'Oct',
  //     'Nov',
  //     'Dec',
  //   ];
  //   const counts = new Array(12).fill(0);

  //   this.events.forEach((event) => {
  //     const monthIndex = new Date(event.startDate).getMonth();
  //     counts[monthIndex] += 1;
  //   });

  //   return months.map((month, index) => ({ month, count: counts[index] }));
  // }
  

  // getEventCountByType(): Array<{ type: string; count: number }> {
  //   const totals: { [type: string]: number } = {};
  //   this.events.forEach((event) => {
  //     totals[event.eventType] = (totals[event.eventType] || 0) + 1;
  //   });
  //   return Object.keys(totals).map((type) => ({ type, count: totals[type] }));
  // }
}

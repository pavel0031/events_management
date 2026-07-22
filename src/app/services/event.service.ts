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


  // Register attendee
  registerAttendee(request: Registration): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/register-attendee`,
      request
    );
  }

  // Get all attendees
  getAllAttendees(): Observable<Registration[]> {
    return this.http.get<Registration[]>(
      `${this.baseUrl}/attendees`
    );
  }

  // Delete attendee
  deleteAttendee(id: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/attendee/${id}`
    );
  }
  
  private registrations: Registration[] = [];

  getRegistrations(): Registration[] {
    return [...this.registrations];
  }

  getRegistrationsForEvent(eventId: number): Registration[] {
    return this.registrations.filter((reg) => reg.eventNo === eventId);
  }

  addRegistration(registration: Registration): void {
    const nextId = this.registrations.length
      ? Math.max(...this.registrations.map((item) => item.attendeeNo)) + 1
      : 1;
    this.registrations.push({ ...registration, attendeeNo: nextId });
  }

  updateRegistration(updated: Registration): void {
    const index = this.registrations.findIndex(
      (item) => item.attendeeNo === updated.attendeeNo,
    );
    if (index !== -1) {
      this.registrations[index] = { ...updated };
    }
  }

  deleteRegistration(id: number): void {
    this.registrations = this.registrations.filter((item) => item.attendeeNo !== id);
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

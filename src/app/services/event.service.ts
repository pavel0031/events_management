import { Injectable } from '@angular/core';
import { EventItem } from '../models/event.model';
import { Registration } from '../models/registration.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: EventItem[] = [
    {
      id: 1,
      title: 'Annual Marketing Summit',
      description:
        'A private event for the marketing team to plan campaigns and review strategy.',
      startDate: '2026-06-07T10:00',
      endDate: '2026-06-07T14:00',
      eventType: 'Corporate',
      isPublic: false,
      maxAttendees: 45,
    },
    {
      id: 2,
      title: 'Community Health Workshop',
      description: 'Public workshop with health experts and local caregivers.',
      startDate: '2026-07-12T09:30',
      endDate: '2026-07-12T12:30',
      eventType: 'Workshop',
      isPublic: true,
      maxAttendees: 90,
    },
    {
      id: 3,
      title: 'Startup Pitch Night',
      description: 'Founders share ideas with investors in a live pitch event.',
      startDate: '2026-07-20T18:00',
      endDate: '2026-07-20T21:00',
      eventType: 'Conference',
      isPublic: true,
      maxAttendees: 120,
    },
    {
      id: 4,
      title: 'Board Review Session',
      description: 'Executive review for internal board members.',
      startDate: '2026-08-03T13:00',
      endDate: '2026-08-03T16:00',
      eventType: 'Corporate',
      isPublic: false,
      maxAttendees: 30,
    },
    {
      id: 5,
      title: 'Summer Music Festival',
      description: 'Open music festival supporting local bands and artists.',
      startDate: '2026-08-18T15:00',
      endDate: '2026-08-18T22:00',
      eventType: 'Festival',
      isPublic: true,
      maxAttendees: 300,
    },
    {
      id: 6,
      title: 'Design Thinking Workshop',
      description: 'Hands-on design thinking sessions for product teams.',
      startDate: '2026-09-02T09:00',
      endDate: '2026-09-02T13:00',
      eventType: 'Workshop',
      isPublic: false,
      maxAttendees: 50,
    },
    {
      id: 7,
      title: 'Charity Gala Dinner',
      description: 'Private fundraising dinner for community causes.',
      startDate: '2026-09-11T19:00',
      endDate: '2026-09-11T23:00',
      eventType: 'Fundraiser',
      isPublic: false,
      maxAttendees: 140,
    },
    {
      id: 8,
      title: 'Technology Conference',
      description: 'Public conference with speakers from the tech industry.',
      startDate: '2026-10-05T08:30',
      endDate: '2026-10-05T17:00',
      eventType: 'Conference',
      isPublic: true,
      maxAttendees: 220,
    },
  ];

  private registrations: Registration[] = [
    {
      id: 1,
      eventId: 1,
      attendeeName: 'Sara Ahmed',
      attendeeEmail: 'sara@example.com',
      registrationDate: '2026-05-01T09:12',
    },
    {
      id: 2,
      eventId: 2,
      attendeeName: 'Rohan Das',
      attendeeEmail: 'rohan@example.com',
      registrationDate: '2026-05-02T10:45',
    },
    {
      id: 3,
      eventId: 3,
      attendeeName: 'Laila Khan',
      attendeeEmail: 'laila@example.com',
      registrationDate: '2026-05-03T11:40',
    },
    {
      id: 4,
      eventId: 2,
      attendeeName: 'Nabil Hossain',
      attendeeEmail: 'nabil@example.com',
      registrationDate: '2026-05-03T15:25',
    },
    {
      id: 5,
      eventId: 4,
      attendeeName: 'Tania Roy',
      attendeeEmail: 'tania@example.com',
      registrationDate: '2026-05-04T13:12',
    },
    {
      id: 6,
      eventId: 5,
      attendeeName: 'Amina Jahan',
      attendeeEmail: 'amina@example.com',
      registrationDate: '2026-05-05T14:55',
    },
    {
      id: 7,
      eventId: 3,
      attendeeName: 'Imran Ali',
      attendeeEmail: 'imran@example.com',
      registrationDate: '2026-05-05T17:20',
    },
    {
      id: 8,
      eventId: 6,
      attendeeName: 'Fahim Sultan',
      attendeeEmail: 'fahim@example.com',
      registrationDate: '2026-05-06T09:05',
    },
    {
      id: 9,
      eventId: 8,
      attendeeName: 'Ruma Akter',
      attendeeEmail: 'ruma@example.com',
      registrationDate: '2026-05-07T12:44',
    },
    {
      id: 10,
      eventId: 1,
      attendeeName: 'Mahmood Karim',
      attendeeEmail: 'mahmood@example.com',
      registrationDate: '2026-05-07T16:31',
    },
    {
      id: 11,
      eventId: 7,
      attendeeName: 'Shabnam Sultana',
      attendeeEmail: 'shabnam@example.com',
      registrationDate: '2026-05-08T19:12',
    },
    {
      id: 12,
      eventId: 5,
      attendeeName: 'Tanvir Hasan',
      attendeeEmail: 'tanvir@example.com',
      registrationDate: '2026-05-09T08:51',
    },
  ];

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

  getRegistrations(): Registration[] {
    return [...this.registrations];
  }

  getRegistrationsForEvent(eventId: number): Registration[] {
    return this.registrations.filter((reg) => reg.eventId === eventId);
  }

  addRegistration(registration: Registration): void {
    const nextId = this.registrations.length
      ? Math.max(...this.registrations.map((item) => item.id)) + 1
      : 1;
    this.registrations.push({ ...registration, id: nextId });
  }

  updateRegistration(updated: Registration): void {
    const index = this.registrations.findIndex(
      (item) => item.id === updated.id,
    );
    if (index !== -1) {
      this.registrations[index] = { ...updated };
    }
  }

  deleteRegistration(id: number): void {
    this.registrations = this.registrations.filter((item) => item.id !== id);
  }

  getEventCountByMonth(): Array<{ month: string; count: number }> {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const counts = new Array(12).fill(0);

    this.events.forEach((event) => {
      const monthIndex = new Date(event.startDate).getMonth();
      counts[monthIndex] += 1;
    });

    return months.map((month, index) => ({ month, count: counts[index] }));
  }

  getEventCountByType(): Array<{ type: string; count: number }> {
    const totals: { [type: string]: number } = {};
    this.events.forEach((event) => {
      totals[event.eventType] = (totals[event.eventType] || 0) + 1;
    });
    return Object.keys(totals).map((type) => ({ type, count: totals[type] }));
  }
}

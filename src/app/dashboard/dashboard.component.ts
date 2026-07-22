import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalEvents = 0;
  publicEvents = 0;
  privateEvents = 0;
  monthlyData: Array<{ month: string; count: number }> = [];
  typeData: Array<{ type: string; count: number }> = [];

  constructor(
    private eventService: EventService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.refreshStats();
  }

  refreshStats(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.totalEvents = events.length;
        this.publicEvents = events.filter((item) => item.isPublic).length;
        this.privateEvents = events.filter((item) => !item.isPublic).length;
        this.monthlyData = this.getEventCountByMonth(events);
        this.typeData = this.getEventCountByType(events);
      },
      error: (err) => {
        console.error("Error loading events", err);
      }
    });
  }

  private getEventCountByMonth(events: any[]): Array<{ month: string; count: number }> {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = new Array(12).fill(0);

    events.forEach((event) => {
      const date = new Date(event.startDate);
      if (!Number.isNaN(date.getTime())) {
        counts[date.getMonth()] += 1;
      }
    });

    return months.map((month, index) => ({ month, count: counts[index] }));
  }

  private getEventCountByType(events: any[]): Array<{ type: string; count: number }> {
    const totals: { [type: string]: number } = {};

    events.forEach((event) => {
      const type = event.eventType?.trim() || 'Unknown';
      totals[type] = (totals[type] || 0) + 1;
    });

    return Object.keys(totals).map((type) => ({ type, count: totals[type] }));
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  getBarHeight(count: number): number {
    const max = Math.max(...this.monthlyData.map((item) => item.count), 1);
    return Math.max(10, (count / max) * 100);
  }

  getPieGradient(): string {
    const total =
      this.typeData.reduce((sum, entry) => sum + entry.count, 0) || 1;
    let current = 0;
    const colors = [
      '#1976d2',
      '#ff9800',
      '#8bc34a',
      '#e91e63',
      '#00bcd4',
      '#9c27b0',
    ];
    const segments = this.typeData.map((entry, index) => {
      const value = (entry.count / total) * 100;
      const start = current;
      const end = current + value;
      current = end;
      return `${colors[index % colors.length]} ${start}% ${end}%`;
    });
    return `conic-gradient(${segments.join(', ')})`;
  }
}

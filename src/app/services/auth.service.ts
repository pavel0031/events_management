import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'eventManagementUser';
  private readonly validEmail = 'admin@grade.com';
  private readonly validPassword = 'admin123';

  login(email: string, password: string): boolean {
    if (email === this.validEmail && password === this.validPassword) {
      localStorage.setItem(this.storageKey, JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.storageKey) !== null;
  }

  getUserEmail(): string | null {
    const data = localStorage.getItem(this.storageKey);
    if (!data) {
      return null;
    }
    try {
      return JSON.parse(data).email;
    } catch {
      return null;
    }
  }
}

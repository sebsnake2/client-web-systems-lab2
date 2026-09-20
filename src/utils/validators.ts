/* eslint-disable @typescript-eslint/no-namespace */

export namespace Validation {
  export function required(value: string): boolean {
    return value.trim().length > 0;
  }

  export function validYear(value: string): boolean {
    if (!/^\d+$/.test(value)) {
      return false;
    }

    const year = Number(value);
    const currentYear = new Date().getFullYear();

    return year > 0 && year <= currentYear;
  }

  export function validEmail(value: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(value.trim());
  }
}

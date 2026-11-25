import { Injectable, signal } from '@angular/core';

/** השפות הנתמכות במערכת */
export type Lang = 'he' | 'en';

/**
 * שרות ההגדרות של המערכת.
 * מחזיק שני פרמטרים: שפה נוכחית, ותאריך אחרון להגשת בקשה.
 */
@Injectable({ providedIn: 'root' })
export class SettingsService {
  /** השפה השמורה - כברירת מחדל עברית */
  readonly language = signal<Lang>('he');

  /** התאריך האחרון להגשת בקשה - ניתן לשנות אותו מכל מקום במערכת */
  readonly lastSubmissionDate = signal<Date>(new Date('2026-12-31'));

  /** האם השפה הנוכחית היא עברית */
  isHebrew(): boolean {
    return this.language() === 'he';
  }

  /** האם הממשק מוצג מימין לשמאל */
  get direction(): 'rtl' | 'ltr' {
    return this.isHebrew() ? 'rtl' : 'ltr';
  }

  /** החלפת שפה בזמן ריצה */
  setLanguage(lang: Lang): void {
    this.language.set(lang);
  }

  /** עדכון התאריך האחרון להגשה */
  setLastSubmissionDate(date: Date): void {
    this.lastSubmissionDate.set(date);
  }

  /**
   * בודק אם עבר המועד האחרון להגשה.
   * מחזיר כמה ימים עברו (0 אם המועד טרם עבר) ואם המועד אכן עבר.
   */
  checkDeadline(currentDate: Date): { passed: boolean; daysPassed: number } {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // מנרמלים את שני התאריכים לחצות היום, כדי ש"עברו X ימים" יהיה מדויק
    const current = this.startOfDay(currentDate);
    const deadline = this.startOfDay(this.lastSubmissionDate());

    const diffDays = Math.floor((current.getTime() - deadline.getTime()) / MS_PER_DAY);

    return {
      passed: diffDays > 0,
      daysPassed: Math.max(0, diffDays),
    };
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../services/settings.service';

/** מבנה הנתונים של טופס הבקשה */
interface ArnonaRequest {
  fullName: string;
  phone: string;
  address: string;
  childrenCount: number | null;
  incomePerPerson: number | null;
  notes: string;
}

@Component({
  selector: 'app-arnona-request',
  imports: [FormsModule],
  templateUrl: './arnona-request.html',
  styleUrl: './arnona-request.css',
})
export class ArnonaRequestComponent {
  /** הזרקת השרות בקומפוננטה */
  private readonly settings = inject(SettingsService);

  /** השפה מכוסה ב-Service - התבנית קוראת ממנה ישירות */
  protected readonly language = this.settings.language;
  protected readonly direction = () => this.settings.direction;

  /** נתוני הטופס */
  protected readonly model = signal<ArnonaRequest>(this.emptyRequest());

  /** הודעת תוצאה שמוצגת למשתמש */
  protected readonly message = signal<string | null>(null);
  protected readonly messageType = signal<'error' | 'success' | null>(null);

  /** כותרות ושמות שדות לפי שפה */
  protected readonly text = {
    he: {
      title: 'בקשה להנחה בארנונה',
      fullName: 'שם מלא',
      phone: 'טלפון',
      address: 'כתובת',
      childrenCount: 'מספר ילדים',
      incomePerPerson: 'הכנסה ממוצעת לנפש',
      notes: 'הערות',
      send: 'שלח',
    },
    en: {
      title: 'Property Tax Discount Request',
      fullName: 'Full Name',
      phone: 'Phone',
      address: 'Address',
      childrenCount: 'Number of Children',
      incomePerPerson: 'Average Income per Person',
      notes: 'Notes',
      send: 'Send',
    },
  } as const;

  /** מחזיר את טקסטי הממשק לפי השפה הנוכחית */
  protected t() {
    return this.text[this.language()];
  }

  /** החלפת שפה (בונוס - מדגים שימוש בפונקציה של השרות) */
  protected toggleLanguage(): void {
    this.settings.setLanguage(this.language() === 'he' ? 'en' : 'he');
  }

  /** עדכון שדה בודד במודל */
  protected updateField<K extends keyof ArnonaRequest>(field: K, value: ArnonaRequest[K]): void {
    this.model.update((current) => ({ ...current, [field]: value }));
  }

  /** טיפול בלחיצה על "שלח" */
  protected onSubmit(): void {
    // שולחים את התאריך הנוכחי לפונקציה של השרות
    const result = this.settings.checkDeadline(new Date());

    if (result.passed) {
      this.messageType.set('error');
      this.message.set(
        this.language() === 'he'
          ? `אנו מצטערים, עברו כבר ${result.daysPassed} ימים מזמן הגשת הבקשות`
          : `We are sorry, ${result.daysPassed} days have already passed since the submission deadline`,
      );
      return;
    }

    // הבקשה התקבלה - כאן אפשר בעתיד לשלוח לשרת
    this.messageType.set('success');
    this.message.set(this.language() === 'he' ? 'הבקשה נשלחה בהצלחה' : 'The request was sent successfully');
  }

  private emptyRequest(): ArnonaRequest {
    return {
      fullName: '',
      phone: '',
      address: '',
      childrenCount: null,
      incomePerPerson: null,
      notes: '',
    };
  }
}

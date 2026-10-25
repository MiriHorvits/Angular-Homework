import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

interface SubjectGrade {
  subject: string;
  grade: number;
}

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css',
})
export class GradesComponent {
  readonly grades: SubjectGrade[] = [
    { subject: 'מתמטיקה', grade: 92 },
    { subject: 'אנגלית', grade: 78 },
    { subject: 'מדעים', grade: 62 },
    { subject: 'היסטוריה', grade: 54 },
    { subject: 'עברית', grade: 86 },
  ];

  get averageGrade(): number {
    const total = this.grades.reduce((sum, subjectGrade) => sum + subjectGrade.grade, 0);
    return total / this.grades.length;
  }
}

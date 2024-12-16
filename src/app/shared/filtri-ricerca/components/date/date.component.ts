import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FieldConfig } from '@shared/filtri-ricerca/interfaces/field.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule],
  template: `
    <mat-form-field [formGroup]="group" fxFlex>
      <input matInput [matDatepicker]="picker" [formControlName]="field.name" [placeholder]="field.label">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      <mat-hint></mat-hint>
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.name)?.hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>
  `,
  styles: [
  ]
})
export class DateComponent {

  field!: FieldConfig;
  group!: FormGroup;

}

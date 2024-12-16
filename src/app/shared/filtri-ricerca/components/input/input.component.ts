import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldConfig } from '@shared/filtri-ricerca/interfaces/field.interface';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field [formGroup]="group" fxFlex [ngClass]="{'uneditable-field': field.readonly}">
      <input matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType!" [readonly]="field.readonly">
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.name)?.hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>
  `,
  styles: [
  ]
})
export class InputComponent {

  field!: FieldConfig;
  group!: FormGroup;

}

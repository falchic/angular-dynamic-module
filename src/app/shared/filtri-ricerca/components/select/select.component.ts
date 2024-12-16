import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FieldConfig } from '@shared/filtri-ricerca/interfaces/field.interface';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule,],
  template: `
    <mat-form-field [formGroup]="group">
      <mat-select [placeholder]="field.label" [formControlName]="field.name" [disabled]="field.readonly!">
        <mat-option *ngFor="let item of field.options" [value]="item">{{item}}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [
  ]
})
export class SelectComponent {

  field!: FieldConfig;
  group!: FormGroup;

}

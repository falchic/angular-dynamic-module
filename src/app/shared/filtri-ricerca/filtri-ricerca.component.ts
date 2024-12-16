import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';
import { MatButtonModule } from '@angular/material/button';
import { FieldConfig } from './interfaces/field.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-filtri-ricerca',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DynamicFieldDirective, MatButtonModule, MatCardModule],
  templateUrl: './filtri-ricerca.component.html',
  styleUrls: ['./filtri-ricerca.component.scss']
})
export class FiltriRicercaComponent implements OnInit {

  @Input() fields: FieldConfig[] | undefined;
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createControl();
  }

  createControl(): FormGroup<any> {
    const group = this.fb.group({});
    if (this.fields) {
      this.fields.forEach(field => {
        let val = undefined;
        const control = this.fb.control(
          val ? val : field.value,
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
      });
    }
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList: any[] = [];
      validations.forEach((valid: { validator: any; }) => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  search() {
    let formData = this.form.value;
    this.validateAllFormFields(this.form);
    if (this.form.valid) {
      this.searchEvent.emit(formData);
    }
  }

  reset() {
    this.form.reset();
  }

}

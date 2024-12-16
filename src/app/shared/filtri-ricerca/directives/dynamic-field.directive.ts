import { Directive, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { InputComponent } from '../components/input/input.component';
import { FormGroup } from '@angular/forms';
import { SelectComponent } from '../components/select/select.component';
import { FieldConfig } from '../interfaces/field.interface';

const componentMapper = {
  input: InputComponent,
  select: SelectComponent,
  date: InputComponent
};

@Directive({
  selector: '[dynamicField]',
  standalone: true
})
export class DynamicFieldDirective {

  @Input() field!: FieldConfig;
  @Input() group!: FormGroup;

  componentRef: any;

  constructor(private container: ViewContainerRef, private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.componentRef = this.container.createComponent(componentMapper[this.field.type]);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
    this.renderer2.addClass(this.componentRef.location.nativeElement, 'field-' + this.field.name);
  }

}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, Input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FieldConfig } from '../../interface/field-config.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule],
    
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {

  private data = inject(MAT_DIALOG_DATA);

  public form: FormGroup = this.data.form;
  public fields: FieldConfig[] = this.data.fields;
  public loading: boolean = this.data.loading;
  public title: string = this.data.title;

  public submitted = new EventTarget() as any;

  pickerRefs: Record<string, any> = {};

  registerPicker(name: string, ref: any) {
    this.pickerRefs[name] = ref;
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}

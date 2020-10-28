import { Component, Input, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormService } from '../../services/form.service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.sass']
})
export class PopupComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private formService: FormService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl(null,[Validators.required, Validators.maxLength(255)]),
      last_name: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      middle_name: new FormControl(null, [Validators.maxLength(255)]),
      birthdate: new FormControl(null, [Validators.required]),
      order_amount: new FormControl(null, [Validators.min(0), Validators.max(1000000)])
    })

    console.log(this.data);
    

    this.form.patchValue({
      first_name: this.data.first_name.value,
      last_name: this.data.last_name.value,
      middle_name: this.data.middle_name.value,
      birthdate: this.data.birthdate.value ? new Date(this.data.birthdate.value).toISOString().substring(0, 10) : '',
      order_amount: this.data.order_amount.value
    })
  }

  onSubmit() {
    const formFieldVaues = {
        form_field_values: [
          {
            form_field_id: this.data.first_name.form_field_id,
            value: this.form.get('first_name').value
          },
          {
            form_field_id: this.data.last_name.form_field_id,
            value: this.form.get('last_name').value
          },
          {
            form_field_id: this.data.middle_name.form_field_id,
            value: this.form.get('middle_name').value
          },
          {
            form_field_id: this.data.birthdate.form_field_id,
            value: this.form.get('birthdate').value
          },
          {
            form_field_id: this.data.order_amount.form_field_id,
            value: this.form.get('order_amount').value
          }
        ]
    }
    console.log(formFieldVaues);
    console.log(this.data.form_id);
    if (this.data.form_id) {
      this.formService.update(this.data.form_id, formFieldVaues).subscribe(res => console.log(res))
    } else {
      this.formService.create(formFieldVaues).subscribe(res => console.log(res))
    }
    this.dialogRef.close()
  }

  onCancel() {
    this.dialogRef.close()
  }

}

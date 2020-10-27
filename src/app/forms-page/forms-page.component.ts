import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {FormService} from '../shared/services/form.service'
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../shared/components/popup/popup.component';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.sass']
})
export class FormsPageComponent implements OnInit, OnDestroy, AfterViewInit {

  pageCount: any[];
  forms: any[];

  @ViewChild('search', {read: ElementRef}) searchRef: ElementRef;
  search$: Observable<any>;
  searchSubscription: Subscription;

  formsSubscription: Subscription;


  constructor(private formService: FormService,
              public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.formsSubscription = this.formService.fetch().subscribe(
      res => {
        this.forms = res.data;
        this.pageCount = new Array(res.meta.pages_count)
      }
    )
  }

  ngAfterViewInit() {
    this.search$ = fromEvent(this.searchRef.nativeElement as HTMLLIElement, 'input')
      .pipe(
        map(e => e.target),
        debounceTime(1000)
      )
    this.searchSubscription = this.search$.subscribe(
      res => {
        this.formsSubscription = this.formService.getBySearch(res.value).subscribe(
          res => {
            this.forms = res.data;
            this.pageCount = new Array(res.meta.pages_count)
          }
        )
      },
      error => {
        alert(error.error.message)
      }
    )
  }

  onEdit(event, form) { 

    this.matDialog.open(PopupComponent, {data: {
      first_name: {
        value: form.form_field_values[0].value, 
        form_field_id: form.form_field_values[0].form_field_id
      },
      last_name: {
        value: form.form_field_values[1].value, 
        form_field_id: form.form_field_values[1].form_field_id
      },
      middle_name: {
        value: form.form_field_values[2].value, 
        form_field_id: form.form_field_values[2].form_field_id
      },
      birthdate: {
        value: form.form_field_values[3].value, 
        form_field_id: form.form_field_values[3].form_field_id
      },
      order_amount: {
        value: form.form_field_values[4].value, 
        form_field_id: form.form_field_values[4].form_field_id
      },
      form_id: form.id
    }});

  }

  changePage(event, currentPage) {
    console.log(currentPage);
    this.formsSubscription = this.formService.fetch(currentPage).subscribe(
      res => {
        this.forms = res.data
      }
    )
  }

  onDelete(event, form) {
    const decision  = window.confirm(`Are you sure you want to delete the form ${form.id}`);
    console.log(form);
    if (decision) {
      this.formService.delete(form.id).subscribe(
        res => {
          console.log(res)
        },
        error => {
          alert(error.error.message)
        },
        () => {
          this.formsSubscription = this.formService.fetch().subscribe(
            res => {
              this.forms = res.data
            }
          )
        }
      )
    }
    
  }

  onSearch(event) {
    console.log(event);
  }

  ngOnDestroy() {
    if (this.formsSubscription) {
      this.formsSubscription.unsubscribe()
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe()
    }
  }
}

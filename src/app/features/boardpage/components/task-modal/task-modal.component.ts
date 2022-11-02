import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {
  @Output() editTaskEvent = new EventEmitter<string>();
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() submitEditingNameEvent = new EventEmitter<{name: string}>()

  @Input() taskName!: string;

  public form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const name: FormControl = new FormControl(this.taskName, [Validators.minLength(1)])
    this.form = this.formBuilder.group({
     name
    });
  }

  onSubmitForm(): void {
    this.submitEditingNameEvent.emit(this.form.getRawValue());
  }

  onCloseModal(): void {
    this.closeModalEvent.emit();
  }

}

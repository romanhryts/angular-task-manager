import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAddBoard } from '../../../../models/board/add-board';
import { IBoard } from '../../../../models/board/board';


@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.css']
})
export class BoardModalComponent implements OnInit {
  @Input() modalType!: 'ADD' | 'EDIT';
  @Input() editingBoard!: IBoard | null;

  @Output() addBoardEvent = new EventEmitter<IAddBoard>();
  @Output() editBoardEvent = new EventEmitter<IAddBoard>();
  @Output() closeModalEvent = new EventEmitter<void>();

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.modalType === 'EDIT' ? this.editingBoard?.name : ''],
      description: [this.modalType === 'EDIT' ? this.editingBoard?.description : '']
    })
  }

  onAddBoard(): void {
    const isValidData: boolean = !this.form.controls['name'].errors && !this.form.controls['description'].errors;
    if (isValidData) {
      const data = this.form.getRawValue() as IAddBoard;
      this.addBoardEvent.emit(data);
    }
  }

  onEditBoard(): void {
    const isValidData: boolean = !this.form.controls['name'].errors && !this.form.controls['description'].errors;
    if (isValidData) {
      const data = this.form.getRawValue() as IAddBoard;
      this.editBoardEvent.emit(data);
    }
  }

  onCloseModal(): void {
    this.closeModalEvent.emit();
  }
}

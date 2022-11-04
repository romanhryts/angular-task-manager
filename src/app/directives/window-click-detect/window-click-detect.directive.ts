import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';

@Directive({
  selector: '[appWindowClickDetect]'
})
export class WindowClickDetectDirective {
  @Output() windowClick = new EventEmitter<void>();
  public boardMenu!: ElementRef;
  public taskMenu!: ElementRef;

  constructor() {
  }


  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event) {
    try {
      if (this.boardMenu && this.boardMenu!.nativeElement !== event.target) {
        this.windowClick.emit();
      }
      if (this.taskMenu!.nativeElement !== event.target) {
        this.windowClick.emit();
      }
    } catch (e) {
      // while we are on dashboard page, this functionality causes error, because it
      // couldn't find 'task' element which renders on other route (this directive is reusable)
      // so here we just catch this error
    }
  }

}

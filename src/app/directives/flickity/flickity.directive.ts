import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import * as Flickity from 'flickity';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';

function getWindow(): Window {
  return window;
}

@Directive({
  selector: '[appFlickity]',
})
export class FlickityDirective implements OnInit, OnDestroy {
  @Input() flickityConfig: Flickity.Options = {
    imagesLoaded: true,
    pageDots: true,
    groupCells: true,
    wrapAround: true,
    draggable: true,
    prevNextButtons: true,
    contain: true,
    lazyLoad: true,
    resize: true,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() ready = new EventEmitter<any>();

  flickity: Flickity | undefined;

  resize = Subscription.EMPTY;

  constructor(
    public readonly elementRef: ElementRef,
    private readonly changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.flickity = new Flickity(
        this.elementRef.nativeElement,
        this.flickityConfig
      );
      this.ready.emit(this.flickity);
    });

    this.resize = fromEvent(getWindow(), 'resize')
      .pipe(startWith(1), debounceTime(500))
      .subscribe(() => this.changeDetection.markForCheck());
  }

  ngOnDestroy() {
    if (this.flickity) {
      this.flickity.destroy();
    }

    this.resize.unsubscribe();
  }
}

import { Directive, ElementRef, Input, Renderer, OnInit, AfterContentChecked } from '@angular/core';
import { Observable } from '@reactivex/rxjs';
@Directive({
  selector: '[hField]',
  
})
export class FieldHighlightDirective implements OnInit {
  @Input() hField: string;
  constructor(private el: ElementRef, private renderer: Renderer) {
   //   
  }

  ngAfterContentChecked() {
      console.log(this.el.nativeElement);
      console.log(this.el.nativeElement.innerText);
  }
  
  ngOnInit() {
      
      /*if(this.el.nativeElement.innerHtml.toLowerCase().includes(this.hField.toLowerCase()) {
          this.renderer.setElementClass(this.el.nativeElement, 'field-highlight', true);
      }*/
  }
  
}

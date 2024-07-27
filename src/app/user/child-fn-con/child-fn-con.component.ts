import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
 
@Component({
  selector: 'app-child-fn-con',
  templateUrl: './child-fn-con.component.html',
  styleUrls: ['./child-fn-con.component.css']
})
export class ChildFnConComponent implements OnInit {
  @Output() parentFnEvent = new EventEmitter<any>();
  @Input() allparams:any;
  constructor() { }

  ngOnInit(): void {
    console.log("parent data-> ",this.allparams);
    
  }


  callParent(){
    this.parentFnEvent.emit('calling parent fn')
  }

  childFn(){
    this.parentFnEvent.emit('Hello from child..')
  }




}

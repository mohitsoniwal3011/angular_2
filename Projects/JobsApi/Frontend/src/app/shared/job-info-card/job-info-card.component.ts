import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job, JobEventInfo } from 'src/app/interfaces';


@Component({
  selector: 'app-job-info-card',
  templateUrl: './job-info-card.component.html',
  styleUrls: ['./job-info-card.component.scss']
})
export class JobInfoCardComponent implements OnInit {

  constructor() { }

  @Input() width : string = '100%';

  @Output() onDelete = new EventEmitter<Job>();

  @Output() onEdit = new EventEmitter<JobEventInfo>();

  @Input() job : Job = {
    _id: '',
    company: '',
    position: '',
    joblocation: '',
    createdBy: '',
    jobtype: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    __v: 0
  };

  @Input() ind : number =0; 
  ngOnInit(): void {
  }

  deleteEvent(){
    this.onDelete.emit(this.job);
  }

  editEvent(){
    this.onEdit.emit(
      {
        index : this.ind, 
        job : this.job
      }
    );
  }
}

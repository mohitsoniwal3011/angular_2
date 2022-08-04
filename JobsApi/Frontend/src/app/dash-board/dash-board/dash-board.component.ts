import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(
    private router : Router,
    private storageService : StorageServiceService, 
    private utilityService : UtilityService,
    private notificationService : NotificationService 
  ) { }
  sidenavopen= true;
  username = '';
  showLogOutOption : boolean = false

  toggleSideNav(){
    this.sidenavopen = !this.sidenavopen;
  }
  ngOnInit(): void {
    
    this.utilityService.getProfile().subscribe(res => {
      this.username = res.name;
    });
    
  }

  showJobs(){
    this.router.navigate(['Jobs', {relativeTo: this.router}])
  }

  logOutUser(){
    this.notificationService.open('Logging out...', 'error')
    this.storageService.clearToken();
    this.router.navigate(['/home'])
  }
}

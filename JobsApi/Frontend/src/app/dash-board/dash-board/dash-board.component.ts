import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { ResizedEvent } from 'angular-resize-event';
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
    private router: Router,
    private storageService: StorageServiceService,
    private utilityService: UtilityService,
    private notificationService: NotificationService
  ) { }
  sidenavopen = true;
  username = '';
  showLogOutOption: boolean = false
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  isOpened: boolean = true;
  mode: MatDrawerMode = "side";

  toggleSideNav() {
    this.sidenavopen = !this.sidenavopen;
  }
  ngOnInit(): void {


    this.utilityService.getProfile().subscribe(res => {
      this.username = res.name;
    });
    this.changeSideNav();
    console.log("window size : ", window.innerWidth);
  }

  showJobs() {
    this.router.navigate(['Jobs', { relativeTo: this.router }])
  }

  logOutUser() {
    this.notificationService.open('Logging out...', 'error')
    this.storageService.clearToken();
    this.router.navigate(['/home'])
  }

  onResized(event: ResizedEvent) {
    this.height = event.newRect.height;
    this.width = event.newRect.width;
    this.changeSideNav();
  }

  changeSideNav(){
    if(this.width >= 1200){
      this.isOpened = true;
      this.mode = "side"
    }
    else if (this.width > 992  ) {
      this.isOpened = false;
      this.mode = "side"
    }
    else{
      this.isOpened = false;
      this.mode = "over";
    }
  }
}

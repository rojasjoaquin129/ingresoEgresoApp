import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre: any;
  userSubs: Subscription | null = null;
  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth').pipe(filter(({ user }) => user != null)).subscribe(({ user }) => {
      this.nombre = user?.nombre
    })
  }
  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
  }
  logOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    }
    )
  }
}

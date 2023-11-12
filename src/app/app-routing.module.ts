import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from "./components/login/login.component";
import { SignupComponent} from "./components/signup/signup.component";
import { PagenotfoundComponent} from "./components/pagenotfound/pagenotfound.component";
import { TaskListComponent} from "./components/task-list/task-list.component";
import { authGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', component: LoginComponent, data: { showNavbar: false }  },
  { path: 'signup', component: SignupComponent, data: { showNavbar: false }  },
  { path: 'task-list', component: TaskListComponent, canActivate: [authGuard], data: { showNavbar: true } },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent, data: { showNavbar: false }  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

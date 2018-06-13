import { PaginationComponent } from './components/shared/pagination.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import * as Raven from 'raven-js';
import { AppErrorHandler } from './app.error-handler';
import { ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
//import { UniversalModule } from 'angular2-universal';

import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleService } from './services/vehicle.service';

Raven.config('https://459b5673426f466bb4ca2bd48ee6a213@sentry.io/1218503').install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
    //    UniversalModule,
        CommonModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'vehicles/new', component: VehicleFormComponent},
            { path: 'vehicles/:id', component: VehicleFormComponent},
            { path: 'vehicles', component: VehicleListComponent},
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler},
        VehicleService
    ]
})
export class AppModuleShared {
}

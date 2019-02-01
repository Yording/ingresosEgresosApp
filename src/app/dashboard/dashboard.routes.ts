import { StatictsComponent } from '../entry-exit/staticts/staticts.component';
import { Routes } from '@angular/router';
import { EntryExitComponent } from '../entry-exit/entry-exit.component';
import { DetailComponent } from '../entry-exit/detail/detail.component';

export const dashboardsRoutes: Routes = [
    { path: "", component: StatictsComponent },
    { path: "entry-exit", component: EntryExitComponent},
    { path: "detail", component: DetailComponent}
]
import { Routes } from '@angular/router';
import { StreamComponent } from './stream/stream.component';

export const routes: Routes = [
  { path: '', component: StreamComponent }, // Default route for the StreamComponent
  { path: '**', redirectTo: '' }, // Redirect all unknown routes to the default
];

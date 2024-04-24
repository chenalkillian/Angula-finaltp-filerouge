import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorpsComponent } from './corps/corps.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InstructionComponent } from './instruction/instruction.component';
const routes: Routes = [
  { path: '', component: CorpsComponent  },
  { path: 'instruction', component: InstructionComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-opp',
  standalone: true,
  imports: [],
  templateUrl: './crear-opp.component.html',
  styleUrls: ['./crear-opp.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class CrearOppComponent {
  constructor(public dialogRef: MatDialogRef<CrearOppComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

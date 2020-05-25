import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-del',
  templateUrl: './del.component.html',
  styles: []
})
export class DelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DelComponent>,) { }

  ngOnInit(): void {
  }

  onYesClick(){
    this.dialogRef.close(true)
  }
  onNoClick(){
    this.dialogRef.close(false);
  }
}

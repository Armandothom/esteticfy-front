import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-erro',
  templateUrl: './dialog-erro.component.html',
  styleUrls: ['./dialog-erro.component.scss']
})
export class DialogErro implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogErro>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  titleErro = '';
  bodyErro = '';
  clickableLink = false;
  batchMsg = false;
  url = '';
  ngOnInit() {
    this.titleErro = this.data.titleErro
    this.bodyErro = this.data.bodyErro
    this.clickableLink = this.data.redirectClick
    this.batchMsg = this.data.batchMsg;
    if (this.data.redirectClick) {
      this.url = this.data.redirectUrl;
    }
  }

  close() {
    this.dialogRef.close();
  }

  redirectUpgrade() {
    this.dialogRef.close({upgrade : true});
  }

}

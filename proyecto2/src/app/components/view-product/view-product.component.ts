import { Component, OnInit, Inject } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public producto: Producto) { }

  ngOnInit(): void {
  }

}

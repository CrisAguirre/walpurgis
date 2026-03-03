import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PRODUCTS } from '../../data/products.data';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { WhatsappService } from '../../core/services/whatsapp.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  selectedImg = 0;
  justAdded = false;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private wa: WhatsappService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = PRODUCTS.find(p => p.id === id);
  }

  addToCart(): void {
    if (!this.product) return;
    this.cartService.addToCart(this.product);
    this.justAdded = true;
    setTimeout(() => this.justAdded = false, 2000);
  }

  askInfo(): void {
    if (!this.product) return;
    this.wa.askAboutProduct(this.product.name, this.product.price);
  }
}

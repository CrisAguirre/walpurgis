import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() viewProduct = new EventEmitter<Product>();

  hovered = false;
  justAdded = false;

  constructor(private cartService: CartService, private router: Router) {}

  onAddToCart(): void {
    this.cartService.addToCart(this.product);
    this.justAdded = true;
    setTimeout(() => this.justAdded = false, 1800);
  }

  onView(): void {
    this.router.navigate(['/producto', this.product.id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../core/models/cart-item.model';
import { CartService } from '../../core/services/cart.service';
import { WhatsappService } from '../../core/services/whatsapp.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private wa: WhatsappService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(i => this.items = i);
  }

  get totalPrice(): number { return this.cartService.totalPrice; }

  increase(id: string): void {
    const item = this.items.find(i => i.product.id === id);
    if (item) this.cartService.updateQuantity(id, item.quantity + 1);
  }

  decrease(id: string): void {
    const item = this.items.find(i => i.product.id === id);
    if (item) this.cartService.updateQuantity(id, item.quantity - 1);
  }

  remove(id: string): void { this.cartService.removeItem(id); }

  clearCart(): void { this.cartService.clearCart(); }

  sendOrder(): void { this.wa.sendOrder(this.items, this.totalPrice); }
}

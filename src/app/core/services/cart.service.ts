import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);

  get cartItems$() { return this.items$.asObservable(); }

  get totalCount(): number {
    return this.items$.value.reduce((acc, item) => acc + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.items$.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  addToCart(product: Product): void {
    const current = this.items$.value;
    const existing = current.find(i => i.product.id === product.id);
    if (existing) {
      this.items$.next(current.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      this.items$.next([...current, { product, quantity: 1 }]);
    }
  }

  removeItem(productId: string): void {
    this.items$.next(this.items$.value.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) { this.removeItem(productId); return; }
    this.items$.next(this.items$.value.map(i =>
      i.product.id === productId ? { ...i, quantity } : i
    ));
  }

  clearCart(): void {
    this.items$.next([]);
  }
}

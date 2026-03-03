import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  readonly WHATSAPP_NUMBER = '573226257413';

  openCatalogChat(): void {
    const msg = encodeURIComponent(
      '¡Hola! 🖤 Estoy visitando Walpurgis Store y me gustaría obtener más información sobre sus productos.'
    );
    window.open(`https://wa.me/${this.WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  }

  sendOrder(items: CartItem[], total: number): void {
    if (!items.length) return;
    const lines = items.map(i =>
      `• ${i.product.shortName} ×${i.quantity} — $${(i.product.price * i.quantity).toLocaleString('es-CO')}`
    ).join('\n');
    const message =
      `🖤 *Nuevo pedido — Walpurgis Store* 🖤\n\n` +
      `${lines}\n\n` +
      `*Total: $${total.toLocaleString('es-CO')} COP*\n\n` +
      `Por favor indícame disponibilidad y método de pago. ¡Gracias!`;
    window.open(`https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  }

  askAboutProduct(productName: string, price: number): void {
    const msg = `¡Hola! 🖤 Me interesa el producto: *${productName}* (COP $${price.toLocaleString('es-CO')}). ¿Está disponible?`;
    window.open(`https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }
}

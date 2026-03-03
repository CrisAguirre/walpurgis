import { Component } from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  constructor(private wa: WhatsappService) {}
  openWhatsApp(): void { this.wa.openCatalogChat(); }
}

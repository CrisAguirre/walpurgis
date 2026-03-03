import { Component } from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-btn',
  templateUrl: './whatsapp-btn.component.html',
  styleUrls: ['./whatsapp-btn.component.css']
})
export class WhatsappBtnComponent {
  constructor(private wa: WhatsappService) {}
  onClick(): void { this.wa.openCatalogChat(); }
}

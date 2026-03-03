import { Component, OnInit, OnDestroy, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { PRODUCTS } from '../../data/products.data';
import { Product, Category } from '../../core/models/product.model';

interface Slide {
  type: 'video' | 'image';
  src: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('slideVideo') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;

  slides: Slide[] = [
    {
      type: 'video',
      src: 'assets/videos slider/wv_0.mp4',
      title: 'La Noche Tiene Su Propio Lenguaje',
      subtitle: 'Nueva Colección',
    },
    {
      type: 'video',
      src: 'assets/videos slider/wv_1.mp4',
      title: 'Porta el Símbolo, Siente el Poder',
      subtitle: 'Joyería Oscura',
    },
    {
      type: 'video',
      src: 'assets/videos slider/wv_2.mp4',
      title: 'Tu Esencia No Necesita Permiso',
      subtitle: 'Accesorios Únicos',
    },
    {
      type: 'video',
      src: 'assets/videos slider/wv_3.mp4',
      title: 'Forjado en las Sombras, Hecho Para Ti',
      subtitle: 'Diseño Exclusivo',
    },
    {
      type: 'video',
      src: 'assets/videos slider/Video_Walpurgis_Night_Generado.mp4',
      title: 'Lo Oscuro También Es Bello',
      subtitle: 'Colección Gótica',
    },
    {
      type: 'image',
      src: 'assets/slider home/theme_1.jpg',
      title: 'Cada Pieza Cuenta una Historia',
      subtitle: 'Walpurgis Store',
    },
  ];

  categories: Category[] = ['Todos', 'Collares', 'Pendientes', 'Gargantillas'];
  selectedCategory: Category = 'Todos';
  filteredProducts: Product[] = [];
  allProducts = PRODUCTS;

  activeSlide = 0;
  prevSlide = -1;
  private slideInterval: any;

  ngOnInit(): void {
    this.filterProducts();
  }

  ngAfterViewInit(): void {
    // Pequeño delay para que el DOM esté listo
    setTimeout(() => {
      this.playActiveVideo();
      this.startAutoPlay();
    }, 300);
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }

  startAutoPlay(): void {
    this.slideInterval = setInterval(() => this.nextSlideBtn(), 6000);
  }

  private playActiveVideo(): void {
    if (!this.videoElements) return;
    this.videoElements.toArray().forEach((ref, index) => {
      const video = ref.nativeElement;
      if (index === this.activeSlide) {
        video.currentTime = 0;
        video.play().catch(() => {/* autoplay policy */});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  nextSlideBtn(): void {
    this.prevSlide = this.activeSlide;
    this.activeSlide = (this.activeSlide + 1) % this.slides.length;
    setTimeout(() => this.playActiveVideo(), 50);
  }

  prevSlideBtn(): void {
    this.prevSlide = this.activeSlide;
    this.activeSlide = (this.activeSlide - 1 + this.slides.length) % this.slides.length;
    setTimeout(() => this.playActiveVideo(), 50);
  }

  goToSlide(i: number): void {
    this.prevSlide = this.activeSlide;
    this.activeSlide = i;
    clearInterval(this.slideInterval);
    setTimeout(() => {
      this.playActiveVideo();
      this.startAutoPlay();
    }, 50);
  }

  selectCategory(cat: Category): void {
    this.selectedCategory = cat;
    this.filterProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.selectedCategory === 'Todos'
      ? this.allProducts
      : this.allProducts.filter(p => p.category === this.selectedCategory);
  }
}

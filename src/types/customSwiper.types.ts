import { ReactNode } from "react";
import Swiper from "swiper";
import { SwiperClass } from "swiper/react";
import { SwiperOptions } from "swiper/types";

export interface NavigationOptions {
  /**
   * Navigation kullanılsın mı?
   */
  enabled?: boolean;
  /**
   * Varsayılan butonlar yerine özel butonlar kullanmak için
   */
  customButtons?: boolean;
  /**
   * Sadece belirli bir butonu göstermek için
   */
  showPrevButton?: boolean;
  showNextButton?: boolean;
  /**
   * Özel buton referansları
   */
  prevButtonRef?: React.RefObject<HTMLElement>;
  nextButtonRef?: React.RefObject<HTMLElement>;
  /**
   * Butonların CSS sınıfları
   */
  prevButtonClass?: string;
  nextButtonClass?: string;
  /**
   * Buton içeriği özelleştirmek için render propları
   */
  renderPrevButton?: (isDisabled: boolean) => ReactNode;
  renderNextButton?: (isDisabled: boolean) => ReactNode;
}

export interface PaginationOptions {
  /**
   * Pagination kullanılsın mı?
   */
  enabled?: boolean;
  /**
   * Pagination tipi
   */
  type?: 'bullets' | 'fraction' | 'progressbar' | 'custom';
  /**
   * Pagination için özel CSS sınıfı
   */
  className?: string;
  /**
   * Pagination içeriği özelleştirmek için render prop
   */
  renderCustomPagination?: (swiper: Swiper, current: number, total: number) => ReactNode;
  /**
   * Pagination'ın konumu
   */
  position?: 'top' | 'bottom';
}

export interface AutoplayOptions {
  /**
   * Otomatik oynatma aktif mi?
   */
  enabled?: boolean;
  /**
   * Slaytlar arasındaki bekleme süresi (ms)
   */
  delay?: number;
  /**
   * Kullanıcı etkileşiminde otomatik oynatma dursun mu?
   */
  disableOnInteraction?: boolean;
  /**
   * Fare üzerine geldiğinde otomatik oynatma dursun mu?
   */
  pauseOnMouseEnter?: boolean;
}

export interface SwiperNavigationButtonsProps {
  /**
   * Swiper instance
   */
  swiper: SwiperClass | null;
  /**
   * Navigasyon ayarları
   */
  navigation: boolean | NavigationOptions;
  /**
   * İlk slide'da olup olmadığını belirtir
   */
  isBeginning: boolean;
  /**
   * Son slide'da olup olmadığını belirtir
   */
  isEnd: boolean;
  /**
   * Döngü modu aktif mi?
   */
  loop?: boolean;
  /**
   * Özel CSS sınıfı
   */
  className?: string;
}

export interface ExtendedSwiperOptions extends Omit<SwiperOptions, 'virtual'> {
  preloadImages?: boolean;
  lazy?: boolean | {
    loadPrevNext?: boolean;
    loadPrevNextAmount?: number;
    loadOnTransitionStart?: boolean;
  };
  virtual?: boolean | {
    enabled?: boolean;
    slides?: unknown[];
    cache?: boolean;
    renderSlide?: (slide: unknown, index: number) => React.ReactNode;
    renderExternal?: (data: {
      offset: number;
      from: number;
      to: number;
      slides: unknown[];
    }) => void;
    addSlidesBefore?: number;
    addSlidesAfter?: number;
  };
}

export interface CustomSwiperProps {
  /**
   * Slider içeriği
   */
  children: ReactNode[];
  /**
   * Swiper için özel sınıf adı
   */
  className?: string;
  /**
   * Swiper için wrapper sınıf adı
   */
  wrapperClassName?: string;
  /**
   * Swiper yapılandırma seçenekleri
   * @see https://swiperjs.com/swiper-api
   */
  options?: SwiperOptions;
  /**
   * Swiper instance hazır olduğunda çağrılacak callback
   */
  onSwiperInit?: (swiper: Swiper) => void;
  /**
   * Aktif slayt değiştiğinde çağrılacak callback
   */
  onSlideChange?: (swiper: Swiper) => void;
  /**
   * Her ekran boyutu için kaç slayt gösterileceğini belirler
   */
  breakpoints?: {
    [width: number]: {
      slidesPerView: number;
      spaceBetween?: number;
      slidesPerGroup?: number;
    };
  };
  /**
   * Otomatik oynatma seçeneği
   */
  autoplay?: boolean | AutoplayOptions;
  /**
   * Navigasyon ayarları
   */
  navigation?: boolean | NavigationOptions;
  /**
   * Sayfalama ayarları
   */
  pagination?: boolean | PaginationOptions;
  /**
   * Döngü modu aktif mi?
   */
  loop?: boolean;
  /**
   * Slaytlar arası geçiş efekti süresi (ms)
   */
  speed?: number;
  /**
   * Slaytları sürüklemek için kullanılabilir mi?
   */
  grabCursor?: boolean;
  /**
   * Slaytlar arasındaki boşluk (px)
   */
  spaceBetween?: number;
  /**
   * Görünür slayt sayısı, kesirli değerler kullanılabilir (örn: 1.5)
   */
  slidesPerView?: number | 'auto';
  /**
   * Sürükleme yönü ('horizontal' veya 'vertical')
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * İçerik yüklenirken gösterilecek loading komponenti
   */
  loadingComponent?: ReactNode;
  /**
   * Slayt yerleşimi için CSS sınıfı (Grid destekli)
   */
  grid?: {
    rows: number;
    fill: 'row' | 'column';
  };
  /**
   * Ek erişilebilirlik özellikleri
   */
  a11y?: {
    enabled?: boolean;
    prevSlideMessage?: string;
    nextSlideMessage?: string;
    firstSlideMessage?: string;
    lastSlideMessage?: string;
    paginationBulletMessage?: string;
  };
  /**
   * Performans optimizasyonu için lazy loading kullanılsın mı?
   */
  lazy?: boolean | {
    loadPrevNext?: boolean;
    loadPrevNextAmount?: number;
    loadOnTransitionStart?: boolean;
  };
  /**
   * İçerik için özel render fonksiyonu
   */
  renderSlide?: (item: ReactNode, index: number) => ReactNode;
  /**
   * Her slayt için sınıf adı
   */
  slideClassName?: string;
  /**
   * Aktif slayt için sınıf adı
   */
  activeSlideClassName?: string;
  /**
   * Swiperın dışında bir container kullanmak istiyorsanız `false` yapın
   */
  useContainer?: boolean;
  /**
   * Slider'ın initial olarak hangi slayt ile başlayacağı
   */
  initialSlide?: number;
  /**
   * Swiper'ın ana elementine ref
   */
  swiperRef?: React.RefObject<Swiper | null>;
  /**
   * Responsive şekilde düzenlenmiş bir yapı için custom container sorguları
   */
  containerQueries?: boolean;
  /**
   * Önbelleğe alınacak slayt sayısı (performans iyileştirmesi için)
   */
  slidesPerGroup?: number;
  /**
   * Slaytları merkeze hizalama
   */
  centeredSlides?: boolean;
  /**
  * Slider poster görseli barındırıyorsa, görselin boyutunu ayarlamak için
  */
  hasPoster?: boolean;
}

export interface SwiperCustomProps {
  /**
   * Slider içeriği
   */
  children: React.ReactNode;
  /**
   * Swiper için özel sınıf adı
   */
  className?: string;
  /**
   * Swiper için navigation sınıf adı
   */
  navigationClassName?: string;
  /**
   * Her ekran boyutu için kaç slayt gösterileceğini belirler
   */
  breakpoints?: {
    [width: number]: {
      slidesPerView: number;
      spaceBetween?: number;
      slidesPerGroup?: number;
    };
  };
  /**
   * Otomatik oynatma seçeneği
   */
  autoplay?: boolean | AutoplayOptions;
  /**
   * Navigasyon ayarları
   */
  navigation?: boolean | NavigationOptions;
  /**
   * Sayfalama ayarları
   */
  pagination?: boolean | PaginationOptions;
  /**
   * Döngü modu aktif mi?
   */
  loop?: boolean;
  /**
   * Slaytlar arası geçiş efekti süresi (ms)
   */
  speed?: number;
  /**
   * Slaytları sürüklemek için kullanılabilir mi?
   */
  grabCursor?: boolean;
  /**
   * Slaytlar arasındaki boşluk (px)
   */
  spaceBetween?: number;
  /**
   * Görünür slayt sayısı, kesirli değerler kullanılabilir (örn: 1.5)
   */
  slidesPerView?: number | 'auto';
  /**
   * Sürükleme yönü ('horizontal' veya 'vertical')
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * İçerik yüklenirken gösterilecek loading komponenti
   */
  loadingComponent?: ReactNode;
  /**
   * Önbelleğe alınacak slayt sayısı (performans iyileştirmesi için)
   */
  slidesPerGroup?: number;
  /**
   * Slaytları merkeze hizalama
   */
  centeredSlides?: boolean;
  /**
  * Slider poster görseli barındırıyorsa, görselin boyutunu ayarlamak için
  */
  hasPoster?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
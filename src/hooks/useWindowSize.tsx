import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Ekran boyutlarını takip eden custom hook
 * 
 * Responsive tasarımlar ve breakpoint'lere göre değişen davranışlar için kullanılır
 * Performans optimizasyonu için debounce uygulanmıştır
 */
export const useWindowSize = (): WindowSize => {
  // Varsayılan değerler (SSR için 0 kullanılır, client-side'da güncellenecek)
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // SSR kontrolü
    if (typeof window === 'undefined') {
      return;
    }

    // Debounce için timeout
    let timeoutId: NodeJS.Timeout | null = null;

    // Boyut değişikliğini handle eden fonksiyon
    const handleResize = () => {
      // Performans için debounce uygulama
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150); // 150ms debounce süre
    };

    // İlk render için boyutu al
    handleResize();

    // Event listener ekle
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
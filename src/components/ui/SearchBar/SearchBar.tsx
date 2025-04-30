"use client";
import { useState, useEffect, useRef, FC, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { searchItems, setQuery, clearResults } from '@/store/features/search/searchSlice';

interface SearchBarProps {
  placeholder: string;
  className?: string;
}

/**
 * SearchBar komponenti - kullanıcıların içerik araması yapmasını sağlar
 */
const SearchBar: FC<SearchBarProps> = ({
  placeholder,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { query, categories, isLoading } = useAppSelector(state => state.search);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearchRef = useRef<ReturnType<typeof debounce> | null>(null);

  // Debounced arama fonksiyonunu bir kez oluşturur
  useEffect(() => {
    debouncedSearchRef.current = debounce((term: string) => {
      dispatch(searchItems(term));
    }, 300);

    return () => {
      debouncedSearchRef.current?.cancel();
    };
  }, [dispatch]);

  // Arama kutusunun dışına tıklandığında dropdown'ı kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Arama kutusunu kapatma fonksiyonu
  const handleCloseSearchBox = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Input değiştiğinde arama yap
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuery(value));

    if (value.trim().length > 1) {
      setIsOpen(true);
      debouncedSearchRef.current?.(value.trim());
    } else {
      setIsOpen(false);
      dispatch(clearResults());
      handleCloseSearchBox();
    }
  }, [dispatch, handleCloseSearchBox]);

  // Arama kutusuna tıklandığında
  const handleInputFocus = useCallback(() => {
    if (query.trim().length > 1) {
      setIsOpen(true);
    }
  }, [query]);

  // Form gönderildiğinde arama sayfasına yönlendir
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/ara?q=${encodeURIComponent(query.trim())}`);
      handleCloseSearchBox();
    }
  }, [query, router, handleCloseSearchBox]);

  // Arama sonuçlarını vurgulamak için
  const highlightMatch = (text: string, queryText: string): React.ReactNode => {
    if (!queryText) return text;

    try {
      // Regex için özel karakterleri escape et (güvenlik için)
      const safeQuery = queryText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${safeQuery})`, 'gi');
      const parts = text.split(regex);

      return parts.map((part, i) =>
        part.toLowerCase() === queryText.toLowerCase() ? (
          <strong key={i} className="font-bold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      );
    } catch (error) {
      // Regex hatası durumunda normal metni döndür
      console.error('Regex error:', error);
      return text;
    }
  };

  // Link tipini belirle
  const getItemLink = (item: { type: string; id: string }): string => {
    switch (item.type) {
      case 'oyun':
        return `/oyun/${item.id}`;
      case 'sanatci':
        return `/sanatci/${item.id}`;
      case 'sahne':
        return `/sahne/${item.id}`;
      default:
        return `/${item.type}/${item.id}`;
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form
        className="relative"
        onSubmit={handleSubmit}
        role="search"
      >
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full px-4 py-2 border text-secondary text-sm border-gray-300 rounded-4xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
          aria-label="Arama"
        />
        <button
          type="submit"
          className="w-7 h-7 flex justify-center items-center absolute right-[5px] top-[5px] text-white bg-primary rounded-full cursor-pointer transition-colors"
          aria-label="Ara"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

      {/* Arkaplandaki karartma overlay'i */}
      <div
        className={`fixed inset-0 bg-black z-40 top-[76px] transition-opacity duration-300 
          ${isOpen ? 'opacity-60 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleCloseSearchBox}
      />

      {/* Arama Sonuçları Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white rounded-2xl shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Aranıyor...
            </div>
          ) : categories.length > 0 ? (
            <div className="p-4">
              {categories.map((category, idx) => (
                <div key={idx} className="flex flex-row-reverse items-start justify-between py-2 first:pt-0 last:pb-0 border-b border-gray-100 last:border-b-0">
                  <div className="flex justify-between items-center pt-2">
                    <h3 className="text-sm font-semibold text-primary">{category.title}</h3>
                  </div>
                  <ul>
                    {category.items.map(item => (
                      <li key={item.id} className="py-1">
                        <Link
                          href={getItemLink(item)}
                          className="flex items-center text-light-blue hover:text-primary transition-colors"
                          onClick={handleCloseSearchBox}
                        >
                          <div>
                            <div className="font-normal">
                              {highlightMatch(item.title, query)}
                              {typeof item.location === 'string' ? (
                                <>
                                  {' / '}
                                  {highlightMatch(item.location, query)}
                                </>
                              ) : null}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : query.trim().length > 2 ? (
            <div className="p-4 text-center text-gray-500">
              Aramanızla eşleşen sonuç bulunamadı.
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
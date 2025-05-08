// src/components/ui/Modal/Modal.tsx
"use client";

import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom';
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  isFilterModal?: boolean;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  contentClassName = "",
  showCloseButton = true,
  closeOnOutsideClick = true,
  size = "md",
  isFilterModal = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  // Server-side render kontrolü
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Animasyon ve görünürlük yönetimi
  useEffect(() => {
    if (isOpen) {
      // Modal açıldığında önce DOM'a ekle, sonra animasyon için görünür yap
      document.body.style.overflow = "hidden"; // Arka plan kaydırmasını engelle
      const timer = setTimeout(() => {
        setVisible(true);
      }, 10); // Çok kısa bir gecikme DOM'un güncellenmesini sağlar
      return () => clearTimeout(timer);
    } else {
      // Modal kapandığında önce görünmez yap (animasyon için), sonra DOM'dan kaldır
      setVisible(false);

      // Animasyon tamamlandıktan sonra overflow'u düzelt
      const timer = setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 300); // 300ms animasyon süresinden sonra
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ESC tuşu ile modalı kapatma
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Modal dışına tıklama ile kapatma
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // modalRef dışındaki alana tıklandıysa modalı kapat
    if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  // Modal içeriğini render etmek için koşul: tarayıcıda çalışıyor ve modal açık
  if (!isBrowser || (!isOpen && !visible)) {
    return null;
  }

  // Modal boyut sınıfları
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-5xl",
  };

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out ${className}`}
      aria-modal="true"
      role="dialog"
    >
      {/* Karartılmış Arka Plan (Overlay) - onClick direkt burada */}
      <div
        className={`fixed inset-0 bg-black ${visible ? 'opacity-50' : 'opacity-0'} transition-opacity duration-300`}
        onClick={handleOutsideClick}
      ></div>

      {/* Modal İçeriği */}
      <div className="flex items-center justify-center w-full h-full p-4">
        <div
          ref={modalRef}
          className={`relative bg-white rounded-xl shadow-xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-auto 
            transform ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} transition-all duration-300 ${contentClassName}`}
        >
          {/* Modal Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              {title && (
                <h2 id="modal-title" className="text-xl font-bold text-secondary">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={onClose}
                  aria-label="Kapat"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Modal Body */}
          <div className="p-4">
            {children}
          </div>

          {/* Modal Footer - Sadece filter modal için göster */}
          {isFilterModal && (
            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <Button variant="text-dark" onClick={onClose} className="!px-0">Tümünü Sil</Button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                onClick={onClose}
              >
                Filtreleri Uygula
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
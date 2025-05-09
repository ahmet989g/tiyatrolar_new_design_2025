// src/components/ui/Modal/Modal.tsx
"use client";

import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom';
import Button from "../Button";
import { CloseIcon } from "@/components/Icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
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
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  // Server-side rendering kontrolü
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Modal görünürlük kontrolü
  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;

    if (isMounted) {
      if (isOpen) {
        // Modal açılıyor
        setIsRendered(true); // İlk önce DOM'a ekle

        // Tarayıcı bir sonraki frame'de render tamamlandıktan sonra animasyon sınıflarını ekle
        animationTimeout = setTimeout(() => {
          setIsVisible(true);
        }, 10);

        // Body scroll lock
        document.body.style.overflow = 'hidden';
      } else {
        // Modal kapanıyor
        setIsVisible(false); // Önce animasyon sınıflarını kaldır

        // Animasyon bittiğinde DOM'dan kaldır
        animationTimeout = setTimeout(() => {
          setIsRendered(false);
        }, 300); // 300ms animasyon süresi

        // Body scroll kilidini kaldır
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (animationTimeout) clearTimeout(animationTimeout);
    };
  }, [isOpen, isMounted]);

  // ESC tuşu ile kapanma
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Dışarı tıklama ile kapanma
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Tarayıcıda değilse veya gösterilmiyorsa render etme
  if (!isMounted || !isRendered) {
    return null;
  }

  // Modal boyut sınıfları
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    full: "max-w-5xl",
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-50' : 'opacity-0'
          }`}
        onClick={handleOutsideClick}
        aria-hidden="true"
      />

      {/* Modal İçeriği */}
      <div
        className="relative z-10 flex items-center justify-center rounded-xl overflow-hidden"
        onClick={handleOutsideClick}
      >
        <div
          ref={modalRef}
          className={`relative bg-white rounded-xl shadow-xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-auto 
            transform transition-all duration-300 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            } ${contentClassName} ${className}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
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
                  className="rounded-full text-secondary hover:text-primary cursor-pointer border-2 transition-colors focus:outline-none"
                  onClick={onClose}
                  aria-label="Kapat"
                >
                  <CloseIcon size={26} />
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
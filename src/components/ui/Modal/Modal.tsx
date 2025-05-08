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
  size?: "sm" | "md" | "lg" | "xl";
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
  size = "lg",
  isFilterModal = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC tuşu ile modalı kapatma
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Arka plan kaydırmasını engelle
    } else {
      window.removeEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto"; // Arka plan kaydırmasını geri yükle
    };
  }, [isOpen, onClose]);

  // Modal dışına tıklama ile kapatma
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }

  // Server-side rendering kontrolü
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isOpen || !isBrowser) {
    return null;
  }

  const modalSizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  const modalOverlay = (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center overflow-none bg-black bg-opacity-50 p-4 ${className}`}
      onClick={handleOutsideClick}
    ></div>
  );

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className={`relative bg-white rounded-xl shadow-xl ${modalSizeClasses[size]} w-full max-h-[90vh] overflow-auto ${contentClassName}`}
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
                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
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

        {/* Modal Footer */}
        {isFilterModal && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <Button variant="text-dark" onClick={onClose} className="!px-0">Tümünü Sil</Button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              onClick={onClose}
            >
              Filtreleri Uygula
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const modalWrapper = (
    <>
      {modalContent}
      {modalOverlay}
    </>
  );

  return createPortal(modalWrapper, document.body);
}

export default Modal;
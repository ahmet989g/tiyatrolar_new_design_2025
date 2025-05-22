"use client";

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { TicketIcon } from '@/components/Icons';

interface GradientButtonProps {
  href: string;
  children?: React.ReactNode;
  text?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Fare hareketlerine tepki veren radyal gradient efektli buton bileşeni
 */
const GradientButton: React.FC<GradientButtonProps> = ({
  href,
  children,
  text = "Bilet Al",
  className = "",
  onClick
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Fare pozisyonunu izleme
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const percentageX = (offsetX / rect.width) * 100;
    const percentageY = (offsetY / rect.height) * 100;

    setMousePosition({
      x: percentageX,
      y: percentageY
    });
  }, []);

  // Fare hover başlangıcı
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  // Fare hover bitişi
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <Link
      href={href}
      className={`relative flex items-center justify-center gap-1 text-lg text-white py-3 px-6 min-w-[140px] rounded-xl overflow-hidden ${className}`}
      style={{
        background: 'var(--linear-gradient-ticket)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Hover efekti */}
      <span className="absolute inset-0 w-full h-full z-10 overflow-hidden">
        <span
          className="gradient-button-hover block w-full h-full rounded-xl"
          style={{
            backgroundImage: 'var(--radial-gradient-ticket)',
            backgroundSize: '200% 200%',
            backgroundPosition: `calc((100 - ${mousePosition.x}) * 1%) calc((100 - ${mousePosition.y}) * 1%)`,
            opacity: isHovering ? 1 : 0
          }}
        />
      </span>

      {/* Buton içeriği */}
      <span className="relative z-20 flex items-center justify-center gap-1.5 font-medium">
        {children || (
          <>
            <TicketIcon className="-rotate-45" size={26} />
            <span>{text}</span>
          </>
        )}
      </span>
    </Link>
  );
};

export default GradientButton;
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, memo } from 'react'

/**
 * Tiyatro katkı sağlayıcı bileşeni
 * Bu bileşen, tiyatro katkı sağlayıcılarının bilgilerini gösterir.
 */

interface ContributerItemProps {
  name: string;
  slug: string;
  image: string;
  role: number;
  role_title?: string;
  className?: string;
}

const ContributerItem: FC<ContributerItemProps> = ({
  name,
  slug,
  image,
  role,
  role_title,
  className = '',
}) => {
  return (
    <article>
      <Link href={`/katilimci/${slug}`} className={`contributer-item block relative ${className}`}>
        <div className="relative rounded-xl overflow-hidden group">
          {/* Resim Container */}
          <div className="relative aspect-[3/4]">
            <Image
              src={image}
              alt={`${name} afişi`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </div>
      </Link>
      <div className="flex flex-col mt-2">
        <h3 className="">
          <Link href={`/katilimci/${slug}`} className="text-md font-semibold text-light-blue hover:text-primary whitespace-nowrap overflow-hidden truncate w-full block">
            {name}
          </Link>
        </h3>
        {role === 2 && (
          <div>
            <span className="text-md font-semibold text-primary">
              {role_title}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}

export default memo(ContributerItem);
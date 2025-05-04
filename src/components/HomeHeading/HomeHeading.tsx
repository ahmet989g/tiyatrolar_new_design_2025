import React, { FC } from 'react'
import { HomeHeadingProps } from '@/types/homeHeading'
import Link from 'next/link'
import LoadingComponent from './LoadingComponent';
import ChevronRightIcon from '../Icons/ChevronRightIcon';

const HomeHeading: FC<HomeHeadingProps> = ({
  title,
  description,
  buttonTitle,
  buttonLink,
  isLoading = false,
}) => {
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="inline-flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
        {description && <p className="text-sm text-secondary font-semibold">{description}</p>}
      </div>
      {buttonTitle && (
        <Link href={buttonLink || '#'} className="flex items-center gap-2 border border-light-blue text-light-blue rounded-full px-5 py-1 text-md font-semibold hover:bg-light-blue hover:text-white transition duration-200">
          {buttonTitle}
          <ChevronRightIcon size={18} />
        </Link>
      )}
    </div>
  )
}

export default HomeHeading
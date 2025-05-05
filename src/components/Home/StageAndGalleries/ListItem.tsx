import React, { FC } from 'react'

interface ListItemProps {
  title: string;
  slug: string;
  location: string;
  image: string;
  theaterCount: number;
  favoriteCount: number;
  className?: string;
}

const ListItem: FC<ListItemProps> = ({
  title,
  slug,
  location,
  image,
  theaterCount,
  favoriteCount,
  className = ''
}) => {
  return (
    <div className={`stage-item ${className}`}>
      {title}
      {slug}
      {location}
      {image}
      {theaterCount}
      {favoriteCount}
    </div>
  )
}

export default ListItem
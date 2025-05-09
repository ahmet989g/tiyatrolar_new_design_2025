import React, { FC } from 'react'

interface FilterRadioCardProps {
  className?: string;
  title: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
  isDisabled?: boolean;
  iconComponent?: React.ReactNode;
}

const FilterRadioCard: FC<FilterRadioCardProps> = ({
  className,
  title,
  description,
  isSelected,
  onClick,
  isDisabled = false,
  iconComponent,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`p-4 rounded-xl border text-left cursor-pointer transition-colors ${className}`}
    >
      <div className="flex items-start">
        {iconComponent && <div className="mr-2">{iconComponent}</div>}
        <div>
          <div className="font-semibold">{title}</div>
          {description && <div className={`text-xs font-medium mt-2 ${isSelected ? 'text-white' : 'text-current'}`}>{description}</div>}
        </div>
      </div>
    </button>
  )
}

export default FilterRadioCard;
import { CheckIcon } from '@/components/Icons';
import React, { FC } from 'react'

interface CheckboxProps {
  className?: string;
  label?: string;
  isChecked: boolean;
  onChange: () => void;
  //onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  className = "",
  label = "",
  isChecked,
  onChange,
  ...props
}) => {
  return (
    <label className={`flex items-center ${className}`} {...props}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={onChange}
        />
        <div
          className={`w-5 h-5 border-2 mr-2 flex items-center justify-center transition-colors 
            ${isChecked
              ? 'border-secondary text-secondary'
              : 'border-light-blue'
            }`}
        >
          {isChecked && (
            <CheckIcon size={16} />
          )}
        </div>
      </div>
      <span className={`text-sm font-semibold ${isChecked ? "text-secondary" : "text-light-blue"} transition-colors duration-200 ease-in-out`}>{label}</span>
    </label>
  )
}

export default Checkbox
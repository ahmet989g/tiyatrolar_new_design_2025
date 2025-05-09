import { SVGProps, FC } from 'react';

interface CheckIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const CheckIcon: FC<CheckIconProps> = ({ size = 24, ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 -960 960 960" fill="currentColor" {...props}>
      <path d="m379.33-368 340.34-339.67q15.91-15.66 37.78-15.66 21.88 0 37.55 15.7 15.67 15.7 15.67 37.53 0 21.83-15.67 37.77L417-255q-15.91 15.67-37.79 15.67T341.67-255L165-431.67q-15.67-15.97-15.67-37.82 0-21.84 15.71-37.51 15.7-15.67 37.53-15.67 21.83 0 37.76 15.67l139 139Z" />
    </svg>
  );
};

export default CheckIcon;
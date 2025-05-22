import { SVGProps, FC } from 'react';

interface LabelIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const LabelIcon: FC<LabelIconProps> = ({ size = 24, ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 -960 960 960" fill="currentColor" {...props}>
      <path d="M162.87-151.87q-37.78 0-64.39-26.61t-26.61-64.39v-474.26q0-37.78 26.61-64.39t64.39-26.61h434.26q21.7 0 41.11 9.71 19.42 9.7 31.98 26.83l177.13 237.13Q865.5-510.35 865.5-480t-18.15 54.46L670.22-188.41q-12.56 17.13-31.98 26.83-19.41 9.71-41.11 9.71H162.87Zm-.24-90.76h434.98L774.74-480 597.61-717.37H162.63v474.74ZM468.8-480Z" />
    </svg>
  );
};

export default LabelIcon;
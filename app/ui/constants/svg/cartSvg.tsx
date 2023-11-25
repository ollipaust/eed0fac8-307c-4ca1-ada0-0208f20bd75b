import React from "react";

interface SvgCartIconFullProps {
    svgCartType?: string;
    width?: number;
    height?: number;  
    cartItemCount?: number; // New prop to indicate the number of items in the cart

}

interface SvgCartIconPlusProps {
    svgCartType?: string;
    width?: number;
    height?: number;
    onClick?: () => void; // Add onClick as an optional prop
}

export const SvgCartIconFull: React.FC<SvgCartIconFullProps> = ({svgCartType, width, height, cartItemCount}) => (
  <svg
    className={`svgCartIcon svgCartIcon--${svgCartType}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
  >
    <path
      fill="#1C274C"
      d="M2.084 2.751a.75.75 0 0 1 .956-.459l.302.106c.616.217 1.14.401 1.552.603.44.217.819.483 1.103.899.282.412.398.865.452 1.362.024.222.037.468.043.738h10.639c1.684 0 3.201 0 3.645.577.444.577.27 1.447-.076 3.186l-.5 2.425c-.315 1.528-.473 2.293-1.025 2.742-.551.45-1.332.45-2.893.45H10.98c-2.789 0-4.183 0-5.05-.914C5.063 13.552 5 12.582 5 9.64V7.038c0-.74 0-1.235-.041-1.615-.04-.363-.11-.545-.2-.677-.088-.129-.221-.25-.525-.398-.322-.158-.761-.314-1.429-.549l-.261-.091a.75.75 0 0 1-.459-.957ZM7.5 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM16.5 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
    />
     {cartItemCount && cartItemCount > 0 && (
        <text x="50%" y="50%" fontSize="10" fill="#fff" textAnchor="middle" dominantBaseline="middle">
          {cartItemCount}
        </text>
      )}
  </svg>
);
export const SvgCartIconPlus: React.FC<SvgCartIconPlusProps> = ({svgCartType, width, height, onClick}) => (
    <svg
      className={`svgCartIcon svgCartIcon--${svgCartType}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      onClick={onClick}
    >
        <path
        fillRule="evenodd"
        d="M3.04 2.292a.75.75 0 0 0-.497 1.416l.261.091c.668.235 1.107.39 1.43.549.303.149.436.27.524.398.09.132.16.314.2.677.04.38.042.875.042 1.615V9.64c0 2.942.063 3.912.93 4.826.866.914 2.26.914 5.05.914h5.302c1.561 0 2.342 0 2.893-.45.552-.45.71-1.214 1.025-2.742l.5-2.425c.347-1.74.52-2.609.076-3.186S18.816 6 17.131 6H6.492a9.033 9.033 0 0 0-.043-.738c-.054-.497-.17-.95-.452-1.362-.284-.416-.662-.682-1.103-.899-.412-.202-.936-.386-1.552-.603l-.302-.106ZM13 8.25a.75.75 0 0 1 .75.75v1.25H15a.75.75 0 0 1 0 1.5h-1.25V13a.75.75 0 0 1-1.5 0v-1.25H11a.75.75 0 0 1 0-1.5h1.25V9a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
        />
        <path
        d="M7.5 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM16.5 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
        />
    </svg>
  );
  
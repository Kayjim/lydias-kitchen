import React from "react";

const SVG = ({
    style = {},
    fill = '#fff',
    width = '100%',
    className = '',
    height = '100%',
    viewBox = '0 0 32 32',
}) => (
    <svg 
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    className={className}
    >
        <path d='../icons/037-commerce-and-shopping.svg'></path>
    </svg>
)

export default SVG;

export default function Logo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo"
      role="img"
    >
      <g transform="translate(20, 10)">
        <g transform="translate(20, -10)">
          <path
            d="M150 130 L225 320 H255 L330 130 H290 L240 270 L190 130 Z"
            fill="#FF6B00"
          />
          <g transform="translate(295, 140)">
            <rect
              width="80"
              height="50"
              rx="4"
              fill="none"
              stroke="#FF6B00"
              strokeWidth="8"
            />
            <path
              d="M5 5 L40 28 L75 5"
              fill="none"
              stroke="#FF6B00"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
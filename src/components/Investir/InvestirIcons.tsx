export const GeoRings = ({
  size = 200,
  color = "#C9A96E",
  opacity = 0.08,
}: {
  size?: number;
  color?: string;
  opacity?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    opacity={opacity}
  >
    <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="1" />
    <circle cx="100" cy="100" r="72" stroke={color} strokeWidth="0.6" />
    <circle cx="100" cy="100" r="50" stroke={color} strokeWidth="0.6" />
    <circle cx="100" cy="100" r="28" stroke={color} strokeWidth="1" />
    <circle cx="100" cy="100" r="5" fill={color} />
    <line x1="5" y1="100" x2="195" y2="100" stroke={color} strokeWidth="0.4" />
    <line x1="100" y1="5" x2="100" y2="195" stroke={color} strokeWidth="0.4" />
  </svg>
);

export const GeoHex = ({
  className = "",
  color = "#C9A96E",
  opacity = 0.07,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) => (
  <svg
    className={className}
    viewBox="0 0 160 160"
    fill="none"
    opacity={opacity}
  >
    <polygon
      points="80,5 147,42.5 147,117.5 80,155 13,117.5 13,42.5"
      stroke={color}
      strokeWidth="1.2"
    />
    <polygon
      points="80,22 130,50 130,110 80,138 30,110 30,50"
      stroke={color}
      strokeWidth="0.6"
    />
    <polygon
      points="80,38 114,57 114,103 80,122 46,103 46,57"
      stroke={color}
      strokeWidth="0.6"
    />
    <circle cx="80" cy="80" r="6" stroke={color} strokeWidth="1" fill="none" />
    <circle cx="80" cy="80" r="2" fill={color} />
  </svg>
);

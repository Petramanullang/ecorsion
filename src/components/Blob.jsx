export default function Blob({
  className = "",
  fill = "var(--neon-cyan)",
  stroke = "var(--ink)",
}) {
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <path
        d="M421.5,78.6C468,106.6,501.6,157.4,511.4,213.9C521.2,270.4,507.2,332.6,474.3,380.6C441.3,428.6,389.4,462.3,334.7,485.5C280,508.6,222.5,521.3,167.3,504.9C112.1,488.5,59.3,443,45.5,384.7C31.7,326.4,56.9,255.3,93.9,198.8C130.9,142.3,179.7,100.4,238.6,76.5C297.5,52.6,366.9,46.7,421.5,78.6Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="10"
      />
    </svg>
  );
}

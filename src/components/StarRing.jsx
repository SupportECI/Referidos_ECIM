export default function StarRing({ size, radius, color = '#DDBB4E', className = '' }) {
  const starPath = "M0,-8 L2.35,-2.47 L8.5,-2.47 L3.6,1.1 L5.5,7 L0,3.4 L-5.5,7 L-3.6,1.1 L-8.5,-2.47 L-2.35,-2.47 Z";
  const count = 12;
  const stars = Array.from({ length: count }, (_, i) => {
    const angle = i * 30;
    return (
      <g
        key={i}
        transform={`translate(100,100) rotate(${angle}) translate(0,-${radius}) rotate(${-angle})`}
      >
        <path d={starPath} fill={color} />
      </g>
    );
  });

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
    >
      {stars}
    </svg>
  );
}

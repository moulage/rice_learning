interface SceneArtProps {
  sceneId: string;
  active: boolean;
}

export function SceneArt({ sceneId, active }: SceneArtProps) {
  const tone = active ? '#157a67' : '#9aa5a2';
  const accent = active ? '#e8613c' : '#b7c0be';

  if (sceneId.includes('wall') || sceneId.includes('school')) {
    return (
      <svg viewBox="0 0 120 72" role="img" aria-label="城墙插画">
        <rect x="8" y="30" width="104" height="32" rx="4" fill={tone} />
        {[16, 34, 52, 70, 88].map((x) => <rect key={x} x={x} y="20" width="14" height="12" fill={accent} />)}
        <rect x="50" y="40" width="20" height="22" fill="#f7f2e9" />
      </svg>
    );
  }

  if (sceneId.includes('tower') || sceneId.includes('museum')) {
    return (
      <svg viewBox="0 0 120 72" role="img" aria-label="古塔插画">
        {[56, 44, 32, 20].map((y, index) => (
          <path
            key={y}
            d={`M${30 + index * 4} ${y + 16} H${90 - index * 4} L${84 - index * 4} ${y} H${36 + index * 4} Z`}
            fill={index % 2 === 0 ? tone : accent}
          />
        ))}
        <rect x="54" y="58" width="12" height="6" fill={tone} />
      </svg>
    );
  }

  if (sceneId.includes('market') || sceneId.includes('shop') || sceneId.includes('station')) {
    return (
      <svg viewBox="0 0 120 72" role="img" aria-label="城市生活插画">
        <rect x="12" y="30" width="96" height="32" rx="4" fill={tone} />
        <path d="M8 30 L24 12 L40 30 L56 12 L72 30 L88 12 L104 30 Z" fill={accent} />
        <rect x="46" y="42" width="28" height="20" fill="#f7f2e9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 72" role="img" aria-label="学习地点插画">
      <circle cx="60" cy="34" r="24" fill={accent} opacity="0.35" />
      <rect x="36" y="30" width="48" height="30" rx="5" fill={tone} />
      <path d="M30 30 L60 10 L90 30 Z" fill={accent} />
      <rect x="54" y="42" width="12" height="18" fill="#f7f2e9" />
    </svg>
  );
}

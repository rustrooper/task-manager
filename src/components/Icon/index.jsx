import { memo } from 'react';
import sprite from '@assets/icons/sprite.svg';

import './styles.scss';

export const Icon = memo(({ type, link, size = 'md', bgColor, className = 'icon', textContent }) => {
  const style = {
    backgroundColor: `${bgColor}`,
  };

  const colors = {
    red: '#F44336', // Bright red
    pink: '#E91E63', // Vibrant pink
    purple: '#9C27B0', // Deep purple
    indigo: '#3F51B5', // Rich indigo
    skyblue: '#03A9F4', // Light sky blue
    green: '#4CAF50', // Fresh green
    orange: '#FF9800', // Warm orange
    brown: '#795548', // Muted brown
  };

  if (link)
    return <img className={`${className}${size ? ` icon_size_${size}` : ''}`.trim()} src={link} style={style} />;

  if (type)
    return (
      <svg className={`${className}${size ? ` icon_size_${size}` : ''}`.trim()} style={style}>
        <use xlinkHref={`${sprite}#${type}`} />
      </svg>
    );

  return (
    <div className={`${className}${size ? ` icon_size_${size}` : ''}`.trim()} style={style}>
      {textContent}
    </div>
  );
});

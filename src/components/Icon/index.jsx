import { memo } from 'react';
import sprite from '@assets/icons/sprite.svg';

import './styles.scss';

export const Icon = memo(({ type, link, size = 'md', bgColor, className = 'icon', textContent }) => {
  if (link)
    return (
      <img
        className={`${className}${size ? ` icon_size_${size}` : ''}${
          bgColor ? ` icon_bg-color_${bgColor}` : ''
        }`.trim()}
        src={link}
      />
    );

  if (type)
    return (
      <svg
        className={`${className}${size ? ` icon_size_${size}` : ''}${
          bgColor ? ` icon_bg-color_${bgColor}` : ''
        }`.trim()}>
        <use xlinkHref={`${sprite}#${type}`} />
      </svg>
    );

  return (
    <div
      className={`${className}${size ? ` icon_size_${size}` : ''}${bgColor ? ` icon_bg-color_${bgColor}` : ''}`.trim()}>
      {textContent}
    </div>
  );
});

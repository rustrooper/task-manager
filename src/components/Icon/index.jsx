import { memo } from 'react';
import sprite from '@assets/icons/sprite.svg';
import './styles.scss';

export const Icon = memo(({ spriteId, link, size = 24, bgColor = '', className = 'icon', textContent = '' }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: `${bgColor}`,
  };

  if (link) return <img className={className} src={link} style={style} />;

  if (spriteId)
    return (
      <svg className={className} style={style}>
        <use xlinkHref={`${sprite}#${spriteId}`} />
      </svg>
    );

  return (
    <div className={className} style={style}>
      {textContent}
    </div>
  );
});

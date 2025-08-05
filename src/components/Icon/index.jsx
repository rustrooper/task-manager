import {memo} from react
import sprite from '@assets/icons/sprite.svg';
import './styles.scss';

export const Icon = memo(({ spriteId, link, color = '#32a852', className = 'icon', textContent = '' }) => {
  if (link) return <img className={className} src={link} />;

  if (spriteId)
    return (
      <svg className={className}>
        <use xlinkHref={`${sprite}#${spriteId}`} />
      </svg>
    );

  return (
    <div className={className} style={{ backgroundColor: color }}>
      {textContent}
    </div>
  );
});

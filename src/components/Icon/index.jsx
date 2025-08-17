import { memo } from 'react';
import sprite from '@assets/icons/sprite.svg';

import './styles.scss';

export const Icon = memo(({ type, size = 'md', className = 'icon' }) => {
  if (type)
    return (
      <svg className={`${className}${size ? ` icon_size_${size}` : ''}`.trim()}>
        <use xlinkHref={`${sprite}#${type}`} />
      </svg>
    );
});

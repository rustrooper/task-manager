import { setColor } from './helpers';
import { memo } from 'react';

import './styles.scss';

export const Avatar = memo(({ user, className = 'avatar', size = 'lg' }) => {
  if (user?.icon) return <img className={`${className}${size ? ` icon_size_${size}` : ''}`} src={user.icon} />;

  const userColor = setColor(user);
  const initials = [user.name?.[0], user.lastname?.[0]].join('').toUpperCase();
  return (
    <div
      className={`${className}${size ? ` icon_size_${size}` : ''}${userColor ? ` icon_bg-color_${userColor}` : ''}`.trim()}>
      {initials}
    </div>
  );
});

import { setColor } from './helpers';
import { memo } from 'react';

import './styles.scss';

export const Avatar = memo(({ user, className = 'avatar', size = 'lg' }) => {
  if (user?.icon)
    return <img className={`${className}${size ? ` assignees-selector__user_size_${size}` : ''}`} src={user.icon} />;

  const userColor = setColor(user);
  const initials = [user.name?.[0], user.lastname?.[0]].join('').toUpperCase();
  return (
    <div
      className={`${className}${size ? ` assignees-selector__user_size_${size}` : ''}${userColor ? ` assignees-selector__user_bg-color_${userColor}` : ''}`.trim()}>
      {initials}
    </div>
  );
});

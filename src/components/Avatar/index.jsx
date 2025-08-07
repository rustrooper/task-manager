import { setColor } from './helpers';
import { Icon } from '@components/Icon';
import './styles.scss';
import { memo } from 'react';

export const Avatar = memo(({ user, className = 'avatar', size = 30 }) => {
  if (user?.icon) return <Icon className={className} link={user.icon} size={size} />;

  const userColor = setColor(user);
  const initials = [user.name?.[0], user.lastname?.[0]].join('').toUpperCase();
  return <Icon className={className} size={size} bgColor={userColor} textContent={initials} />;
});

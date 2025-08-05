import { setColor } from './helpers';
import { Icon } from '@components/Icon';
import './styles.scss';

export const Avatar = ({ user, className = 'avatar' }) => {
  if (user?.icon) return <Icon className={className} link={user.icon} />;

  const userColor = setColor(user);
  const initials = [user.name?.[0], user.lastname?.[0]].join('').toUpperCase();
  return <Icon className={className} color={userColor} textContent={initials} />;
};

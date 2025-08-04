import { setColor } from './helpers';
// import { getRandomColor } from '@utils/getRandomColor';

export const Avatar = ({ user, className }) => {
  if (user?.icon) return <Icon className={className} link={user.icon} />;

  const userColor = setColor(user);
  const initials = [user.name?.[0], user.lastname?.[0]].join('').toUpperCase();
  return <Icon className={className} color={userColor} textConten={initials} />;
};

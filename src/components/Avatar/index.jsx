import { LocalStorageService } from '@utils/localStorageService';
import { getRandomColor } from '@utils/getRandomColor';

export const Avatar = ({ user }) => {
  const setColor = () => {
    if (user.color) {
      return user.color;
    }

    const usersData = LocalStorageService.get('usersData') || [];
    const existingUser = usersData.find(u => u.id === user.id);

    if (existingUser?.color) {
      return existingUser.color;
    }

    const newColor = getRandomColor();
    const updatedUser = { ...user, color: newColor };

    const updatedUsersData = existingUser
      ? usersData.map(u => (u.id === user.id ? updatedUser : u))
      : [...usersData, updatedUser];

    LocalStorageService.set('usersData', updatedUsersData);
    return newColor;
  };
};

if (user?.icon) return <img className={className} src={user.icon} width="100%" height="100%" />;

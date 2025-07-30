import sprite from '../../assets/icons/sprite.svg';
import './styles.scss';
import LocalStorageService from '../../utils/localStorageService';

const Icon = ({ icon, className = '', textContent = '', user }) => {
  const getRandomColor = () => {
    // 1. Выбираем случайный базовый тон (Hue) от 0 до 360°
    const baseHue = Math.floor(Math.random() * 360);

    // 2. Генерируем гармоничный цвет, используя один из методов:
    //    - Аналогичные цвета (±30° от базового)
    //    - Триадные цвета (±120°)
    //    - Дополнительный цвет (+180°)
    // Здесь выбран вариант "аналогичные цвета" для мягкой гармонии
    const hueShift = 30; // Можно изменить на 120 или 180 для других схем
    const hue = (baseHue + (Math.random() > 0.5 ? hueShift : -hueShift)) % 360;

    // 3. Фиксируем насыщенность и яркость для приятных цветов
    const saturation = 70 + Math.floor(Math.random() * 30); // 70-100%
    const lightness = 50 + Math.floor(Math.random() * 20); // 50-70%

    // 4. Конвертируем HSL в HEX
    const hslToHex = (h, s, l) => {
      l /= 100;
      const a = (s * Math.min(l, 1 - l)) / 100;
      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
          .toString(16)
          .padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };

    return hslToHex(hue, saturation, lightness);
  };

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

  if (user?.icon) return <img className={className} src={user.icon} width="100%" height="100%" />;

  if (icon)
    return (
      <svg className={`icon ${className}`}>
        <use xlinkHref={`${sprite}#${icon}`} />
      </svg>
    );

  return (
    <div className={className} style={{ backgroundColor: setColor() }}>
      {textContent}
    </div>
  );
};

export default Icon;

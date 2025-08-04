import sprite from '@assets/icons/sprite.svg';
import './styles.scss';
import { LocalStorageService } from '@utils/localStorageService';

export const Icon = ({ icon, link, className = '', textContent = '', user }) => {
  const setColor = () => {
    const hash = str => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      return hash;
    };

    const colors = ['#F44336', '#E91E63', '#9C27B0', '#3F51B5', '#03A9F4', '#4CAF50', '#FF9800', '#795548'];
    const index = Math.abs(hash(user.name)) % colors.length;
    const color = colors[index];

    return color;
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

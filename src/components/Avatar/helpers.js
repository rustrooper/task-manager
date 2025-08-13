export const setColor = user => {
  const hashStr = str => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash;
  };

  const colors = ['#F44336', '#E91E63', '#9C27B0', '#3F51B5', '#03A9F4', '#4CAF50', '#FF9800', '#795548'];
  const index = Math.abs(hashStr(user.name)) % colors.length;
  const color = colors[index];

  return color;
};

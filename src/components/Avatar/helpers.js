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

  const colors = ['red', 'pink', 'purple', 'indigo', 'skyblue', 'green', 'orange', 'brown'];
  const index = Math.abs(hashStr(user.name)) % colors.length;
  const color = colors[index];

  return color;
};

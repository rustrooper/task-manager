export const filterTasks = (columns, searchTerm, tasksPeriod) => {
  const now = new Date();
  const nowDay = now.getDate();
  const dayOfWeek = now.getDay();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(nowDay - 1);

  const yesterdayDate = yesterday.getDate();
  const yesterdayMonth = yesterday.getMonth();
  const yesterdayYear = yesterday.getFullYear();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(nowDay - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfLastWeek = new Date(now);
  startOfLastWeek.setDate(nowDay - (dayOfWeek === 0 ? 13 : dayOfWeek + 6));
  startOfLastWeek.setHours(0, 0, 0, 0);

  const endOfLastWeek = new Date(startOfLastWeek);
  endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
  endOfLastWeek.setHours(23, 59, 59, 999);

  const trimmedSearchTerm = searchTerm.trim().toLowerCase();

  return columns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task => {
      const matchesSearch =
        !trimmedSearchTerm ||
        task.title.toLowerCase().includes(trimmedSearchTerm) ||
        task.description.toLowerCase().includes(trimmedSearchTerm);

      if (!matchesSearch) return false;

      const taskDate = new Date(task.createdAt);
      const taskDay = taskDate.getDate();
      const taskMonth = taskDate.getMonth();
      const taskYear = taskDate.getFullYear();

      switch (tasksPeriod.value) {
        case 'today': {
          return taskDay === nowDay && taskMonth === nowMonth && taskYear === nowYear;
        }
        case 'yesterday': {
          return taskDay === yesterdayDate && taskMonth === yesterdayMonth && taskYear === yesterdayYear;
        }
        case 'thisWeek': {
          return taskDate >= startOfWeek;
        }
        case 'lastWeek': {
          return taskDate >= startOfLastWeek && taskDate <= endOfLastWeek;
        }
        case 'thisMonth': {
          return taskMonth === nowMonth && taskYear === nowYear;
        }
        default: {
          return true;
        }
      }
    }),
  }));
};

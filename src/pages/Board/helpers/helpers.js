export const filterTasks = (columns, searchTerm, tasksPeriod) => {
  const now = new Date();

  return columns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task => {
      const matchesSearch =
        !searchTerm.trim() ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      const taskDate = new Date(task.createdAt);
      switch (tasksPeriod.value) {
        case 'today': {
          return (
            taskDate.getDate() === now.getDate() &&
            taskDate.getMonth() === now.getMonth() &&
            taskDate.getFullYear() === now.getFullYear()
          );
        }
        case 'yesterday': {
          const yesterday = new Date(now);
          yesterday.setDate(now.getDate() - 1);
          return (
            taskDate.getDate() === yesterday.getDate() &&
            taskDate.getMonth() === yesterday.getMonth() &&
            taskDate.getFullYear() === yesterday.getFullYear()
          );
        }
        case 'thisWeek': {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          return taskDate >= startOfWeek;
        }
        case 'lastWeek': {
          const startOfLastWeek = new Date(now);
          startOfLastWeek.setDate(now.getDate() - now.getDay() - 7);
          const endOfLastWeek = new Date(startOfLastWeek);
          endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
          return taskDate >= startOfLastWeek && taskDate <= endOfLastWeek;
        }
        case 'thisMonth': {
          return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear();
        }
        default: {
          return true;
        }
      }
    }),
  }));
};

import { isSameDay, isWithinInterval, startOfWeek, endOfWeek, subWeeks, subDays, isSameMonth } from 'date-fns';

export const filterTasks = (columns, searchTerm, tasksPeriod) => {
  const now = new Date();
  const trimmedSearchTerm = searchTerm.trim().toLowerCase();

  const today = now;
  const yesterday = subDays(now, 1);
  const thisWeekStart = startOfWeek(now);
  const lastWeekStart = startOfWeek(subWeeks(now, 1));
  const lastWeekEnd = endOfWeek(subWeeks(now, 1));

  return columns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task => {
      const matchesSearch =
        !trimmedSearchTerm ||
        task.title.toLowerCase().includes(trimmedSearchTerm) ||
        task.description.toLowerCase().includes(trimmedSearchTerm);

      if (!matchesSearch) return false;

      const taskDate = new Date(task.createdAt);

      switch (tasksPeriod.value) {
        case 'today':
          return isSameDay(taskDate, today);

        case 'yesterday':
          return isSameDay(taskDate, yesterday);

        case 'thisWeek':
          return taskDate >= thisWeekStart;

        case 'lastWeek':
          return isWithinInterval(taskDate, {
            start: lastWeekStart,
            end: lastWeekEnd,
          });

        case 'thisMonth':
          return isSameMonth(taskDate, now);

        default:
          return true;
      }
    }),
  }));
};

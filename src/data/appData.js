export const periodOptions = [
  { id: 1, label: 'Today', value: 'today' },
  { id: 2, label: 'Yesterday', value: 'yesterday' },
  { id: 3, label: 'This Week', value: 'thisWeek' },
  { id: 4, label: 'Last Week', value: 'lastWeek' },
  { id: 5, label: 'This Month', value: 'thisMonth' },
];

export const users = [
  {
    id: 1,
    name: 'daniel',
    lastname: 'simonov',
    icon: '/src/assets/icons/avatar.jpg',
  },
  {
    id: 2,
    name: 'alex',
    lastname: 'sigeiev',
  },
  {
    id: 3,
    name: 'pasha',
    lastname: 'volya',
  },
];

export const tags = ['design system', 'development', 'testing', 'analytics'];

export const initialColumns = [
  {
    id: 1,
    title: 'To Do',
    tasks: [
      {
        id: 11,
        title: 'Design Homepage',
        description: 'Create wireframes',
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    title: 'In Progress',
    tasks: [
      {
        id: 22,
        title: 'API Integration',
        description: 'Connect backend',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
  },
];

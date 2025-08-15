import { v4 as uuidv4 } from 'uuid';

export const periodOptions = [
  { id: uuidv4(), label: 'Today', value: 'today' },
  { id: uuidv4(), label: 'Yesterday', value: 'yesterday' },
  { id: uuidv4(), label: 'This Week', value: 'thisWeek' },
  { id: uuidv4(), label: 'Last Week', value: 'lastWeek' },
  { id: uuidv4(), label: 'This Month', value: 'thisMonth' },
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
    lastname: 'sigeev',
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
    id: uuidv4(),
    title: 'To Do',
    tasks: [
      {
        id: uuidv4(),
        title: 'Design Homepage',
        description: 'Create wireframes',
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'In Progress',
    tasks: [
      {
        id: uuidv4(),
        title: 'API Integration',
        description: 'Connect backend',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
  },
];

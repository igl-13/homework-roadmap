import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Checkbox, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface HomeworkModule {
  id: number;
  date: string;
  title: string;
  color: string;
  tasks: {
    id: number;
    title: string;
    completed: boolean;
  }[];
}

const homeworkModules: HomeworkModule[] = [
  {
    id: 1,
    date: '19 АПРЕЛЯ',
    title: 'Найм маркетолога',
    color: '#ff9f43',
    tasks: [
      { id: 1, title: 'Цель на курс', completed: false },
      { id: 2, title: 'Чек-лист ГФД', completed: false },
      { id: 3, title: 'Вакансия', completed: false },
      { id: 4, title: 'Найм', completed: false },
    ]
  },
  {
    id: 2,
    date: '26 АПРЕЛЯ',
    title: 'УТП',
    color: '#ff9f43',
    tasks: [
      { id: 1, title: 'CustDev', completed: false },
      { id: 2, title: 'Карта эмпатии', completed: false },
      { id: 3, title: 'Аватары', completed: false },
      { id: 4, title: 'Карточка продукта', completed: false },
      { id: 5, title: 'Анализ конкурентов', completed: false },
    ]
  },
  {
    id: 3,
    date: '10 МАЯ',
    title: 'Управление РЕОМ',
    color: '#ff7675',
    tasks: [
      { id: 1, title: 'Оргструктура', completed: false },
      { id: 2, title: 'Регламент планерок', completed: false },
      { id: 3, title: 'KPI для отдела маркетинга', completed: false },
      { id: 4, title: 'ДТП отчет', completed: false },
    ]
  },
  {
    id: 4,
    date: '17 МАЯ',
    title: 'Создание оффера и продающей страницы',
    color: '#ff7675',
    tasks: [
      { id: 1, title: 'УТП и офферы', completed: false },
      { id: 2, title: 'Лендинг', completed: false },
      { id: 3, title: 'Usability', completed: false },
    ]
  },
  {
    id: 5,
    date: '24 МАЯ',
    title: 'Типовые воронки',
    color: '#a55eea',
    tasks: [
      { id: 1, title: 'Маркетинговая воронка RACE', completed: false },
      { id: 2, title: 'Consumer Journey Map', completed: false },
      { id: 3, title: 'Новые воронки на основе CJM', completed: false },
    ]
  },
  {
    id: 6,
    date: '31 МАЯ',
    title: 'Структурный подход к рекламе',
    color: '#54a0ff',
    tasks: [
      { id: 1, title: 'Домашка 1', completed: false },
      { id: 2, title: 'Домашка 2', completed: false },
      { id: 3, title: 'Домашка 3', completed: false },
    ]
  },
  {
    id: 7,
    date: '7 ИЮНЯ',
    title: 'Структурный подход к рекламе',
    color: '#54a0ff',
    tasks: [
      { id: 1, title: 'Домашка 1', completed: false },
      { id: 2, title: 'Домашка 2', completed: false },
      { id: 3, title: 'Домашка 3', completed: false },
    ]
  },
  {
    id: 8,
    date: '21 ИЮНЯ',
    title: 'Контент-маркетинг',
    color: '#26de81',
    tasks: [
      { id: 1, title: 'Домашка 1', completed: false },
      { id: 2, title: 'Домашка 2', completed: false },
      { id: 3, title: 'Домашка 3', completed: false },
    ]
  },
  {
    id: 9,
    date: '28 ИЮНЯ',
    title: 'Нейросети',
    color: '#ff9f43',
    tasks: [
      { id: 1, title: 'Домашка 1', completed: false },
      { id: 2, title: 'Домашка 2', completed: false },
      { id: 3, title: 'Домашка 3', completed: false },
    ]
  },
  {
    id: 10,
    date: '1 ИЮЛЯ',
    title: 'Выпускной',
    color: '#ff9f43',
    tasks: [
      { id: 1, title: 'Финальная работа', completed: false },
    ]
  }
];

const RoadMap: React.FC = () => {
  const [openModules, setOpenModules] = useState<number[]>([]);
  const [modules, setModules] = useState(homeworkModules);

  const handleModuleClick = (moduleId: number) => {
    setOpenModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleTaskToggle = (moduleId: number, taskId: number) => {
    setModules(prevModules => 
      prevModules.map(module => 
        module.id === moduleId
          ? {
              ...module,
              tasks: module.tasks.map(task =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              )
            }
          : module
      )
    );
  };

  const totalTasks = modules.reduce((acc, module) => acc + module.tasks.length, 0);
  const completedTasks = modules.reduce((acc, module) => 
    acc + module.tasks.filter(task => task.completed).length, 0);

  return (
    <Box>
      <Typography variant="h1" sx={{ 
        fontSize: '2rem',
        fontWeight: 'bold',
        mb: 3,
        p: 2,
        borderRadius: '25px',
        backgroundColor: '#ff9f43',
        color: 'white'
      }}>
        Домашние задания
      </Typography>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {modules.map((module) => (
          <Paper 
            key={module.id}
            elevation={0}
            sx={{ 
              mb: 2,
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: '15px',
              overflow: 'hidden'
            }}
          >
            <ListItem 
              button 
              onClick={() => handleModuleClick(module.id)}
              sx={{
                bgcolor: module.color,
                color: 'white',
                '&:hover': {
                  bgcolor: module.color,
                  opacity: 0.9
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                width: '100%',
                position: 'relative'
              }}>
                <Box sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  bgcolor: 'white',
                  color: module.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  fontWeight: 'bold'
                }}>
                  {module.id}
                </Box>
                <ListItemText 
                  primary={module.title}
                  secondary={module.date}
                  secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.8)' } }}
                />
                {openModules.includes(module.id) ? <ExpandLess /> : <ExpandMore />}
              </Box>
            </ListItem>
            <Collapse in={openModules.includes(module.id)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {module.tasks.map((task) => (
                  <ListItem 
                    key={task.id}
                    sx={{
                      pl: 4,
                      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                      '&:last-child': {
                        borderBottom: 'none'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={task.completed}
                        onChange={() => handleTaskToggle(module.id, task.id)}
                        sx={{
                          color: module.color,
                          '&.Mui-checked': {
                            color: module.color,
                          }
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText 
                      primary={task.title}
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default RoadMap; 
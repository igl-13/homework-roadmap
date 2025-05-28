import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Paper, List, ListItem, ListItemText, ListItemIcon, Checkbox, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  maxWidth: 800,
  marginLeft: 'auto',
  marginRight: 'auto',
}));

interface HomeworkModule {
  id: number;
  date: string;
  title: string;
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
    tasks: [
      { id: 1, title: 'CustDev', completed: false },
      { id: 2, title: 'Карта эмпатии', completed: false },
      { id: 3, title: 'Боли и выгоды', completed: false },
      { id: 4, title: 'Конкуренты', completed: false },
      { id: 5, title: 'УТП', completed: false },
    ]
  }
];

const RoadMap: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  
  const totalTasks = homeworkModules.reduce((acc, module) => acc + module.tasks.length, 0);
  const completedTasks = homeworkModules.reduce((acc, module) => 
    acc + module.tasks.filter(task => task.completed).length, 0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'left' }}>
          Прогресс выполнения
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1" color="primary">
            {completedTasks} из {totalTasks} заданий
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={(completedTasks / totalTasks) * 100} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#1976d2',
            }
          }} 
        />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="homework tabs">
          <Tab label="Все модули" />
          <Tab label="Выполненные" />
          <Tab label="В процессе" />
        </Tabs>
      </Box>

      <List>
        {homeworkModules.map((module) => (
          <Paper 
            key={module.id} 
            elevation={1} 
            sx={{ 
              mb: 2, 
              borderRadius: 2,
              overflow: 'hidden',
              backgroundColor: module.id === 1 ? '#ff7675' : '#ffa502'
            }}
          >
            <Box sx={{ 
              p: 2, 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'white'
            }}>
              <Typography variant="h6">{module.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 2 }}>{module.date}</Typography>
                <Typography variant="body2">
                  {module.tasks.filter(task => task.completed).length} из {module.tasks.length}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor: 'background.paper' }}>
              <List>
                {module.tasks.map((task) => (
                  <ListItem 
                    key={task.id}
                    sx={{
                      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                      '&:last-child': {
                        borderBottom: 'none'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={task.completed}
                        tabIndex={-1}
                        disableRipple
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
            </Box>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default RoadMap; 
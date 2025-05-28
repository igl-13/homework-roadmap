import React from 'react';
import { Box, Typography, LinearProgress, Paper, List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  maxWidth: 800,
  marginLeft: 'auto',
  marginRight: 'auto',
}));

interface HomeworkItem {
  id: number;
  title: string;
  completed: boolean;
}

const homeworkItems: HomeworkItem[] = [
  { id: 1, title: 'Домашнее задание 1: Анализ ЦА', completed: false },
  { id: 2, title: 'Домашнее задание 2: Аватар клиента', completed: false },
  { id: 3, title: 'Домашнее задание 3: Боли и потребности', completed: false },
  { id: 4, title: 'Домашнее задание 4: Конкуренты', completed: false },
  { id: 5, title: 'Домашнее задание 5: Продуктовая матрица', completed: false },
];

const RoadMap: React.FC = () => {
  const completedCount = homeworkItems.filter(item => item.completed).length;
  const progress = (completedCount / homeworkItems.length) * 100;

  return (
    <StyledPaper elevation={3}>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Прогресс выполнения: {Math.round(progress)}%
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            height: 10, 
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#4caf50',
            }
          }} 
        />
      </Box>

      <List>
        {homeworkItems.map((item) => (
          <ListItem 
            key={item.id}
            sx={{
              mb: 1,
              bgcolor: item.completed ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
              borderRadius: 1,
            }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={item.completed}
                tabIndex={-1}
                disableRipple
                sx={{
                  color: '#4caf50',
                  '&.Mui-checked': {
                    color: '#4caf50',
                  },
                }}
              />
            </ListItemIcon>
            <ListItemText 
              primary={item.title}
              sx={{
                textDecoration: item.completed ? 'line-through' : 'none',
                color: item.completed ? 'text.secondary' : 'text.primary',
              }}
            />
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  );
};

export default RoadMap; 
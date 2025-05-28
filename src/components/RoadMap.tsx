import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Checkbox, Collapse, LinearProgress, Button, ButtonGroup, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';

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
    color: '#2ecc71',
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
    color: '#3498db',
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
    color: '#9b59b6',
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
    color: '#e74c3c',
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
    color: '#f1c40f',
    tasks: [
      { id: 1, title: 'Маркетинговая воронка RACE', completed: false },
      { id: 2, title: 'Consumer Journey Map', completed: false },
      { id: 3, title: 'Новые воронки на основе CJM', completed: false },
    ]
  },
  {
    id: 6,
    date: '31 МАЯ',
    title: 'Аналитика и экономическая модель',
    color: '#1abc9c',
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
    color: '#d35400',
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
    color: '#27ae60',
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
    color: '#2980b9',
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
    color: '#8e44ad',
    tasks: [
      { id: 1, title: 'Финальная работа', completed: false },
    ]
  }
];

type FilterType = 'all' | 'completed' | 'inProgress' | 'notStarted';

interface EditingTask {
  moduleId: number;
  taskId: number;
  value: string;
}

const RoadMap: React.FC = () => {
  const [openModules, setOpenModules] = useState<number[]>([]);
  const [modules, setModules] = useState(homeworkModules);
  const [editingTask, setEditingTask] = useState<EditingTask | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [username, setUsername] = useState<string>('');
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedUsername = localStorage.getItem('roadmap-username');
    if (savedUsername) {
      setUsername(savedUsername);
      const savedModules = localStorage.getItem(`roadmap-data-${savedUsername}`);
      if (savedModules) {
        setModules(JSON.parse(savedModules));
      }
    } else {
      setIsUserDialogOpen(true);
    }
  }, []);

  // Save data to localStorage whenever modules change
  useEffect(() => {
    if (username) {
      localStorage.setItem(`roadmap-data-${username}`, JSON.stringify(modules));
    }
  }, [modules, username]);

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      localStorage.setItem('roadmap-username', username);
      setIsUserDialogOpen(false);
    }
  };

  const handleShareClick = () => {
    const url = window.location.href;
    const message = `Привет! Я выполнил ${Math.round((completedTasks / totalTasks) * 100)}% заданий по курсу "Системный лидген". Создай свою дорожную карту: ${url}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Дорожная карта заданий',
        text: message,
        url: url
      });
    } else {
      navigator.clipboard.writeText(message);
      alert('Ссылка для шаринга скопирована в буфер обмена!');
    }
  };

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

  const getModuleStatus = (module: HomeworkModule) => {
    const completedTasks = module.tasks.filter(t => t.completed).length;
    if (completedTasks === 0) return 'notStarted';
    if (completedTasks === module.tasks.length) return 'completed';
    return 'inProgress';
  };

  const filteredModules = modules.filter(module => {
    if (filter === 'all') return true;
    return getModuleStatus(module) === filter;
  });

  const totalTasks = modules.reduce((acc, module) => acc + module.tasks.length, 0);
  const completedTasks = modules.reduce((acc, module) => 
    acc + module.tasks.filter(task => task.completed).length, 0);

  const progress = (completedTasks / totalTasks) * 100;

  const handleEditStart = (moduleId: number, taskId: number, currentTitle: string) => {
    setEditingTask({ moduleId, taskId, value: currentTitle });
  };

  const handleEditCancel = () => {
    setEditingTask(null);
  };

  const handleEditSave = () => {
    if (!editingTask) return;

    setModules(prevModules => 
      prevModules.map(module => 
        module.id === editingTask.moduleId
          ? {
              ...module,
              tasks: module.tasks.map(task =>
                task.id === editingTask.taskId
                  ? { ...task, title: editingTask.value }
                  : task
              )
            }
          : module
      )
    );
    setEditingTask(null);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingTask) return;
    setEditingTask({ ...editingTask, value: event.target.value });
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h1" sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem' },
          fontWeight: 'bold',
          color: '#2c3e50'
        }}>
          Домашние задания
          {username && (
            <Typography 
              component="span" 
              sx={{ 
                fontSize: { xs: '1rem', sm: '1.2rem' }, 
                color: 'text.secondary',
                ml: 2
              }}
            >
              ({username})
            </Typography>
          )}
        </Typography>
        <IconButton
          onClick={handleShareClick}
          sx={{
            color: '#2c3e50',
            '&:hover': { transform: 'scale(1.1)' },
            transition: 'transform 0.2s ease'
          }}
        >
          <ShareIcon />
        </IconButton>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup 
          variant="contained" 
          size="small"
          orientation="vertical"
          sx={{ 
            display: { xs: 'flex', sm: 'inline-flex' },
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' },
            '& .MuiButton-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }
          }}
        >
          <Button 
            onClick={() => setFilter('completed')}
            sx={{ 
              bgcolor: filter === 'completed' ? '#2ecc71' : '#95a5a6',
              '&:hover': { bgcolor: filter === 'completed' ? '#27ae60' : '#7f8c8d' }
            }}
          >
            Выполненные
          </Button>
          <Button 
            onClick={() => setFilter('inProgress')}
            sx={{ 
              bgcolor: filter === 'inProgress' ? '#f1c40f' : '#95a5a6',
              '&:hover': { bgcolor: filter === 'inProgress' ? '#f39c12' : '#7f8c8d' }
            }}
          >
            В процессе
          </Button>
          <Button 
            onClick={() => setFilter('notStarted')}
            sx={{ 
              bgcolor: filter === 'notStarted' ? '#e74c3c' : '#95a5a6',
              '&:hover': { bgcolor: filter === 'notStarted' ? '#c0392b' : '#7f8c8d' }
            }}
          >
            Не начато
          </Button>
          <Button 
            onClick={() => setFilter('all')}
            sx={{ 
              bgcolor: filter === 'all' ? '#3498db' : '#95a5a6',
              '&:hover': { bgcolor: filter === 'all' ? '#2980b9' : '#7f8c8d' }
            }}
          >
            Все
          </Button>
        </ButtonGroup>
      </Box>

      <Box sx={{ mb: 4, px: { xs: 0, sm: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Прогресс выполнения
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{
            height: { xs: 8, sm: 10 },
            borderRadius: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#2c3e50',
              borderRadius: 5,
            }
          }}
        />
      </Box>

      <List sx={{ 
        width: '100%', 
        bgcolor: 'background.paper',
        '& .MuiListItem-root': {
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          py: { xs: 2, sm: 1 }
        },
        '& .MuiListItemText-root': {
          mt: { xs: 1, sm: 0 }
        }
      }}>
        {filteredModules.map((module) => {
          const moduleProgress = module.tasks.filter(t => t.completed).length / module.tasks.length * 100;
          
          return (
          <Paper 
            key={module.id}
            elevation={0}
            sx={{ 
              mb: 2,
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: '15px',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }
            }}
          >
            <ListItem 
              button 
              onClick={() => handleModuleClick(module.id)}
              sx={{
                bgcolor: module.color,
                color: 'white',
                position: 'relative',
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
                position: 'relative',
                flexDirection: { xs: 'column', sm: 'row' },
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                <Box sx={{
                  width: { xs: '40px', sm: '30px' },
                  height: { xs: '40px', sm: '30px' },
                  borderRadius: '50%',
                  bgcolor: 'white',
                  color: module.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: { xs: 0, sm: 2 },
                  mb: { xs: 1, sm: 0 },
                  fontWeight: 'bold',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}>
                  {module.id}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <ListItemText 
                    primary={module.title}
                    secondary={
                      <Box>
                        <Typography component="span" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {module.date}
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={moduleProgress}
                          sx={{
                            mt: 1,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: 'white',
                              borderRadius: 2,
                            }
                          }}
                        />
                      </Box>
                    }
                    primaryTypographyProps={{
                      sx: { 
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        textAlign: { xs: 'center', sm: 'left' },
                        mb: 0.5
                      }
                    }}
                  />
                </Box>
                <Box sx={{ 
                  position: { xs: 'static', sm: 'absolute' },
                  right: { sm: 16 },
                  mt: { xs: 1, sm: 0 },
                  opacity: 0.8,
                  transition: 'opacity 0.2s ease',
                  '&:hover': {
                    opacity: 1
                  }
                }}>
                  {openModules.includes(module.id) ? <ExpandLess /> : <ExpandMore />}
                </Box>
              </Box>
            </ListItem>
            <Collapse in={openModules.includes(module.id)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {module.tasks.map((task) => (
                  <ListItem 
                    key={task.id}
                    sx={{
                      pl: { xs: 2, sm: 4 },
                      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                      '&:last-child': {
                        borderBottom: 'none'
                      },
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)'
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
                          },
                          transition: 'transform 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }}
                      />
                    </ListItemIcon>
                    {editingTask?.moduleId === module.id && editingTask?.taskId === task.id ? (
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        flex: 1,
                        gap: 1
                      }}>
                        <TextField
                          fullWidth
                          size="small"
                          value={editingTask.value}
                          onChange={handleEditChange}
                          autoFocus
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: module.color,
                              },
                              '&:hover fieldset': {
                                borderColor: module.color,
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: module.color,
                              },
                            },
                          }}
                        />
                        <IconButton 
                          size="small" 
                          onClick={handleEditSave}
                          sx={{ 
                            color: module.color,
                            '&:hover': { transform: 'scale(1.1)' }
                          }}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={handleEditCancel}
                          sx={{ 
                            color: '#95a5a6',
                            '&:hover': { transform: 'scale(1.1)' }
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <>
                        <ListItemText 
                          primary={task.title}
                          sx={{
                            '& .MuiTypography-root': {
                              textDecoration: task.completed ? 'line-through' : 'none',
                              color: task.completed ? 'text.secondary' : 'text.primary',
                              fontSize: { xs: '0.9rem', sm: '1rem' },
                              transition: 'color 0.2s ease, text-decoration 0.2s ease'
                            }
                          }}
                        />
                        <IconButton 
                          size="small"
                          onClick={() => handleEditStart(module.id, task.id, task.title)}
                          sx={{ 
                            color: '#95a5a6',
                            opacity: 0.5,
                            '&:hover': { 
                              opacity: 1,
                              transform: 'scale(1.1)'
                            },
                            transition: 'opacity 0.2s ease, transform 0.2s ease'
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </>
                    )}
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Paper>
        )})}
      </List>

      <Dialog open={isUserDialogOpen} onClose={() => {}}>
        <DialogTitle>Введите ваше имя</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Имя"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleUsernameSubmit();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleUsernameSubmit}
            disabled={!username.trim()}
            sx={{ 
              bgcolor: '#2c3e50',
              color: 'white',
              '&:hover': { bgcolor: '#34495e' }
            }}
          >
            Начать
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoadMap; 
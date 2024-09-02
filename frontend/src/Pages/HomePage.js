import React from 'react';
import { Box, Typography, Avatar, IconButton, Grid, Card, CardContent, CardActions, Button, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';

function KanbanBoard() {
    const user = {
        name: "John Doe",
        avatarUrl: "https://via.placeholder.com/150",
        projects: [
            { id: 1, name: "Project 1", icon: <WorkIcon /> },
            { id: 2, name: "Project 2", icon: <BrushIcon /> },
            { id: 3, name: "Project 3", icon: <CodeIcon /> },
        ]
    };

    return (
        <Box sx={{ p: 4, bgcolor: '#f0f2f5', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Avatar src={user.avatarUrl} alt={user.name} sx={{ width: 64, height: 64, mr: 2 }} />
                        <Box>
                            <Typography variant="h4">Welcome back,</Typography>
                            <Typography variant="h4" color="primary">{user.name}</Typography>
                        </Box>
                    </Box>
                    <IconButton color="primary" aria-label="edit profile">
                        <EditIcon />
                    </IconButton>
                </Box>
            </Paper>

            <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
                <Box display="flex" alignItems="center" sx={{ bgcolor: 'white', p: 1, borderRadius: 2 }}>
                    <SearchIcon color="action" sx={{ mr: 1 }} />
                    <Typography variant="body1" color="textSecondary">Search projects...</Typography>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {user.projects.map((project) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3 }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    {project.icon}
                                    <Typography variant="h6" sx={{ ml: 1 }}>{project.name}</Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary">
                                    This is a short description of the project.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">Open</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: 3,
                        border: '2px dashed #90caf9'
                    }}>
                        <IconButton color="primary" aria-label="add new project" sx={{ flexDirection: 'column' }}>
                            <AddIcon sx={{ fontSize: 50 }} />
                            <Typography variant="body1">New Project</Typography>
                        </IconButton>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default KanbanBoard;

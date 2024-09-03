// src/components/NewProjectModal.js

import React, {useState} from 'react';
import {Modal, Box, Typography, TextField, Button, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import {useAuth} from "../../Providers/AuthProvider";

const NewProjectModal = ({open, onClose, onProjectAdded}) => {
    const {token} = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        axios.post("http://localhost:8080/api/projects", {
            name: name,
            description: description,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(resp => {
                onProjectAdded({
                    name: resp.data.name,
                    description: resp.data.description,
                });
            })
            .catch(err => {
                console.log(err)
            })
        setName('');
        setDescription('');
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="new-project-modal"
            aria-describedby="modal-for-creating-new-project"
        >
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    mx: 'auto',
                    mt: '10%',
                    borderRadius: 2,
                    boxShadow: 24,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="h2">
                        Create New Project
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <TextField
                    fullWidth
                    label="Project Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{mb: 2}}
                />
                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{mb: 2}}
                />
                <Box display="flex" justifyContent="flex-end">
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Create
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default NewProjectModal;

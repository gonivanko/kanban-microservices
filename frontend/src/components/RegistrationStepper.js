import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import {Alert, Input, InputAdornment, Snackbar, TextField} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";

export default function RegistrationStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };


    const handleNext = () => {
        const validationErrors = validateStep(activeStep);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleFinished = () => {
        handleNext();
        axios.post('http://localhost:8081/register', {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        }).catch((error) => {
            setError(error.response.data.description);
        })
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateStep = (step) => {
        const newErrors = {};
        switch (step) {
            case 0:
                if (!formData.username) {
                    newErrors.username = 'Username is required';
                }
                break;
            case 1:
                if (!formData.email) {
                    newErrors.email = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    newErrors.email = 'Email is invalid';
                }
                break;
            case 2:
                if (!formData.password) {
                    newErrors.password = 'Password is required';
                }
                if (formData.password !== formData.confirmPassword) {
                    newErrors.confirmPassword = 'Passwords do not match';
                }
                break;
            default:
                break;
        }
        return newErrors;
    };

    const isStepperFinished = () => {
        return activeStep === steps.length;
    }

    const steps = [
        {
            title: 'Enter your username',
            formElement: (
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                    placeholder='Enter your username'
                    sx={{ width: '100%' }}
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                />
            ),
        },
        {
            title: 'Enter your email',
            formElement: (
                <Input
                    id="input-with-icon-adornment"
                    placeholder="Enter your email"
                    startAdornment={
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    }
                    sx={{ width: '100%' }}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
            ),
        },
        {
            title: 'Enter your password',
            formElement: (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <TextField
                        type="password"
                        sx={{ mb: 2 }}
                        placeholder="Enter your password"
                        variant="outlined"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        type="password"
                        placeholder="Confirm your password"
                        variant="outlined"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                </Box>
            ),
        },
    ];

    return (
        <>
            {isStepperFinished() ?
                (<Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <h1>Thank you for registration! Confirm your email to continue.</h1>
                    <h1>You will be redirected to login page in 5 seconds...</h1>
                </Box>) :
                <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ mb: 2.5 }}>
                            <h1>{steps[activeStep].title}</h1>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            {steps[activeStep].formElement}
                        </Box>
                    </Box>
                </Box>
            }
            <Box sx={{ mt: 10 }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((element, index) => {
                        const stepProps = {};

                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }

                        return (
                            <Step key={element.title} {...stepProps}>
                                <StepLabel>{element.title}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you`re finished
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {activeStep === steps.length - 1 ?
                                <Button onClick={handleFinished}>Finish</Button> :
                                <Button onClick={handleNext}>Next</Button>
                            }
                        </Box>
                    </React.Fragment>
                )}
                <Snackbar
                    open={error !== ''}
                    autoHideDuration={6000}
                    onClose={() => setError('')}
                >
                    <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}

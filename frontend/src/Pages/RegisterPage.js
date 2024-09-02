import {Box} from "@mui/material";
import RegistrationStepper from "../components/RegistrationStepper";

export default function RegisterPage() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
        }}>
            <RegistrationStepper />
        </Box>
    )
}
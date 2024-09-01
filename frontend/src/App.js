import './App.css';
import {Box} from "@mui/material";
import RegistrationStepper from "./components/RegistrationStepper";

function App() {
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
    );
}

export default App;

import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button } from '@mui/material';

export default function Programar() {
    const [idPersonal, setIdPersonal] = useState('');
    const [idServicio, setIdServicio] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [fecha, setFecha] = useState('');
    const [errorFecha, setErrorFecha] = useState('');
    const [errorHora, setErrorHora] = useState('');



    const handleClickProgramarCita = (e) => {
        e.preventDefault();
        // Validar que los campos requeridos no estén vacíos
        if (!idPersonal || !idServicio || !horaInicio || !horaFin || !fecha) {
            console.error('Todos los campos son obligatorios');
            return;
        }
        // Validar fecha
        if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            setErrorFecha('Ingrese una fecha válida en el formato YYYY-MM-DD');
            return;
        } else {
            setErrorFecha('');
        }

        // Validar horas
        if (!horaInicio || !horaFin || !/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(horaInicio) || !/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(horaFin)) {
            setErrorHora('Ingrese una hora válida en el formato HH:mm:ss');
            return;
        } else {
            setErrorHora('');
        }

        // Si pasa las validaciones, enviar la solicitud al backend
        const cita = { idPersonal, idServicio, horaInicio, horaFin, fecha, estado: true };
        console.log(cita);

        fetch("http://localhost:8080/api/citas/programar", {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(cita)
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error al programar cita');
            }
            console.log("Cita programada");
        }).catch((error) => {
            console.error("Error al programar cita - Error:", error);
        });
    };



    return (
        <Container style={{ padding: '100px' }}>
            <Box style={{ boxShadow: '10px 15px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                {/* Campos para crear franja */}
                <h2>Programar Cita</h2>
                <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField
                        id="idPersonal"
                        label="Id del Personal"
                        variant="outlined"
                        fullWidth
                        value={idPersonal}
                        onChange={(e) => setIdPersonal(e.target.value)}
                    />
                    <TextField
                        id="idServicio"
                        label="Id del Servicio"
                        variant="outlined"
                        fullWidth
                        value={idServicio}
                        onChange={(e) => setIdServicio(e.target.value)}
                    />
                    <TextField
                        id="horaInicio"
                        label="Hora de Inicio"
                        variant="outlined"
                        fullWidth
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                        error={!!errorHora}
                        helperText={errorHora}
                    />
                    <TextField
                        id="horaFin"
                        label="Hora de Fin"
                        variant="outlined"
                        fullWidth
                        value={horaFin}
                        onChange={(e) => setHoraFin(e.target.value)}
                        error={!!errorHora}
                        helperText={errorHora}
                    />
                    <TextField
                        id="fechaLaborable"
                        label="Fecha"
                        variant="outlined"
                        fullWidth
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        error={!!errorFecha}
                        helperText={errorFecha}
                    />
                    <Button variant="contained" color="secondary" onClick={handleClickProgramarCita}>
                        Programar Cita
                    </Button>
                </form>
            </Box>
        </Container>
    );
}




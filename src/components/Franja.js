import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button } from '@mui/material';

export default function Franja() {
    const [fechaLaborable, setFechaLaborable] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [errorFecha, setErrorFecha] = useState('');
    const [errorHora, setErrorHora] = useState('');



    const handleClickCrearFranja = (e) => {
        e.preventDefault();
        // Validar fecha
        if (!fechaLaborable || !/^\d{4}-\d{2}-\d{2}$/.test(fechaLaborable)) {
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
        const franja = { fechaLaborable, horaInicio, horaFin };
        console.log(franja);
        fetch("http://localhost:8080/api/franja-de-trabajo?", {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(franja)
        }).then(() => {
            console.log("Nueva Franja agregada");
        });
    };



    return (
        <Container style={{ padding: '100px' }}>
            <Box style={{ boxShadow: '10px 15px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                {/* Campos para crear franja */}
                <h2>Crear Franja</h2>
                <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField
                        id="fechaLaborable"
                        label="Fecha Laborable"
                        variant="outlined"
                        fullWidth
                        value={fechaLaborable}
                        onChange={(e) => setFechaLaborable(e.target.value)}
                        error={!!errorFecha}
                        helperText={errorFecha}
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
                    <Button variant="contained" color="secondary" onClick={handleClickCrearFranja}>
                        Crear
                    </Button>
                </form>
            </Box>
        </Container>
    );
}






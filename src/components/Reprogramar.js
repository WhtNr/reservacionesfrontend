import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button } from '@mui/material';

export default function Reprogramar() {
    const [idCita, setIdCita] = useState('');
    const [nuevaFecha, setNuevaFecha] = useState('');
    const [nuevaHoraInicio, setNuevaHoraInicio] = useState('');
    const [nuevaHoraFin, setNuevaHoraFin] = useState('');
    const [errorFecha, setErrorFecha] = useState('');
    const [errorHora, setErrorHora] = useState('');
    const [confirmacion, setConfirmacion] = useState('');
    const [error, setError] = useState('');


    const handleClickReprogramarCita = (e) => {
        e.preventDefault();

        // Validar que idCita esté presente y sea un número válido
        if (!idCita || isNaN(idCita)) {
            console.error('Id de cita inválido');
            return;
        }

        // Validar fecha
        if (!nuevaFecha || !/^\d{4}-\d{2}-\d{2}$/.test(nuevaFecha)) {
            setErrorFecha('Ingrese una fecha válida en el formato YYYY-MM-DD');
            return;
        } else {
            setErrorFecha('');
        }

        // Validar horas
        if (!nuevaHoraInicio || !nuevaHoraFin || !/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(nuevaHoraInicio) || !/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(nuevaHoraFin)) {
            setErrorHora('Ingrese una hora válida en el formato HH:mm:ss');
            return;
        } else {
            setErrorHora('');
        }

        const nuevaCita = { nuevaFecha, nuevaHoraInicio, nuevaHoraFin };
        console.log(nuevaCita);

        fetch(`http://localhost:8080/api/citas/reprogramar/${idCita}`, {
            method: "PUT",
            body: JSON.stringify(nuevaCita)
        })
            .then((response) => {
                if (response.ok) {
                    setConfirmacion('¡Cita Reprogramada con éxito!');
                    setError('');
                } else {
                    setConfirmacion('');
                    setError('Hubo un problema al reprogramar la cita. Inténtalo de nuevo.');
                }
            }).catch(error => {
            console.error('Error al enviar la solicitud:', error);
            setConfirmacion('');
            setError('Hubo un problema al reprogramar la cita. Inténtalo de nuevo.');
        });
    };




    return (
        <Container style={{ padding: '100px' }}>
            <Box style={{ boxShadow: '10px 15px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                {/* Campos para crear franja */}
                <h2>Reprogramar Cita</h2>
                <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <TextField
                            id="idCitaReprogramar"
                            label="ID de la Cita a Reprogramar"
                            variant="outlined"
                            fullWidth
                            value={idCita}
                            onChange={(e) => setIdCita(e.target.value)}
                        />
                    <TextField
                        id="nuevaFecha"
                        label="Nueva Fecha"
                        variant="outlined"
                        fullWidth
                        value={nuevaFecha}
                        onChange={(e) => setNuevaFecha(e.target.value)}
                        error={!!errorFecha}
                        helperText={errorFecha}
                    />
                    <TextField
                        id="nuevaHoraInicio"
                        label="Hora de Inicio"
                        variant="outlined"
                        fullWidth
                        value={nuevaHoraInicio}
                        onChange={(e) => setNuevaHoraInicio(e.target.value)}
                        error={!!errorHora}
                        helperText={errorHora}
                    />
                    <TextField
                        id="nuevaHoraFin"
                        label="Hora de Fin"
                        variant="outlined"
                        fullWidth
                        value={nuevaHoraFin}
                        onChange={(e) => setNuevaHoraFin(e.target.value)}
                        error={!!errorHora}
                        helperText={errorHora}
                    />
                        <Button variant="contained" color="secondary" onClick={handleClickReprogramarCita}>
                            Reprogramar Cita
                        </Button>
                    </form>
                {/* Mensajes de confirmación y error */}
                {confirmacion && <p style={{ color: 'green' }}>{confirmacion}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Box>
        </Container>
    );
}
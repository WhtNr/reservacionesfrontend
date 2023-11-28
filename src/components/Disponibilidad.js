import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button } from '@mui/material';

export default function Disponibilidad() {
    const [fechaConsulta, setFechaConsulta] = useState('');
    const [horaDeseada, setHoraDeseada] = useState('');
    const [errorFecha, setErrorFecha] = useState('');
    const [errorHora, setErrorHora] = useState('');
    const [confirmacion, setConfirmacion] = useState('');
    const [error, setError] = useState('');
    const [franjasDisponibles, setFranjasDisponibles] = useState([]);

    const handleClickVerificarDisponibilidad = (e) => {
        e.preventDefault();

        // Validar fecha
        if (!fechaConsulta || !/^\d{4}-\d{2}-\d{2}$/.test(fechaConsulta)) {
            setErrorFecha('Ingrese una fecha válida en el formato YYYY-MM-DD');
            return;
        } else {
            setErrorFecha('');
        }

        // Validar horas
        if (!horaDeseada || !/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(horaDeseada)) {
            setErrorHora('Ingrese una hora válida en el formato HH:mm:ss');
            return;
        } else {
            setErrorHora('');
        }

        const disponibilidad = { fecha: fechaConsulta, horaDeseada };
        console.log(disponibilidad);

        fetch('http://localhost:8080/api/franja-de-trabajo/disponibilidad?fecha=${fechaConsulta}&horaDeseada=${horaDeseada}')
    .then((response) => {
            if (!response.ok) {
                throw new Error('Error al verificar disponibilidad');
            }
            return response.json();
        })
            .then((data) => {
                console.log("Disponibilidad:", data);
                setConfirmacion('¡Disponibilidad verificada con éxito!');
                setError('');
                setFranjasDisponibles(data);
            })
            .catch((error) => {
                console.error("Error al verificar disponibilidad:", error);
                setConfirmacion('');
                setError('Hubo un problema al verificar la disponibilidad. Inténtalo de nuevo.');
                setFranjasDisponibles([]);
            });
    };




    return (
        <Container style={{ padding: '100px' }}>
            <Box style={{ boxShadow: '10px 15px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                {/* Campos para verificar disponibilidad */}
                <h2>Verificar Disponibilidad</h2>
                <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField
                        id="fechaConsulta"
                        label="Fecha de Consulta"
                        variant="outlined"
                        fullWidth
                        value={fechaConsulta}
                        onChange={(e) => setFechaConsulta(e.target.value)}
                        error={!!errorFecha}
                        helperText={errorFecha}
                    />
                    <TextField
                        id="horaDeseada"
                        label="Hora Deseada"
                        variant="outlined"
                        fullWidth
                        value={horaDeseada}
                        onChange={(e) => setHoraDeseada(e.target.value)}
                        error={!!errorHora}
                        helperText={errorHora}
                    />
                    <Button variant="contained" color="secondary" onClick={handleClickVerificarDisponibilidad}>
                        Verificar Disponibilidad
                    </Button>
                </form>
                {/* Mensajes de confirmación, error y franjas disponibles */}
                {confirmacion && <p style={{ color: 'green' }}>{confirmacion}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Mostrar las franjas disponibles */}
                {franjasDisponibles.length > 0 && (
                    <div>
                        <h3>Franjas Disponibles:</h3>
                        <ul>
                            {franjasDisponibles.map((franja, index) => (
                                <li key={index}>{`${franja.fecha} de ${franja.horaInicio} a ${franja.horaFin}`}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Box>
        </Container>
    );
}
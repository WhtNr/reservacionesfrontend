import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button } from '@mui/material';

export default function Cancelar() {
    const [idCita, setIdCita] = useState('');
    const [confirmacion, setConfirmacion] = useState('');
    const [error, setError] = useState('');


    const handleClickCancelarCita = (e) => {
        e.preventDefault();

        // Validar que idCita esté presente y sea un número válido
        if (!idCita || isNaN(idCita)) {
            console.error('Id de cita inválido');
            return;
        }

        fetch(`http://localhost:8080/api/citas/cancelar/${idCita}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.ok) {
                    setConfirmacion('¡Cita Eliminada con éxito!');
                    setError('');
                } else {
                    setConfirmacion('');
                    setError('Hubo un problema al eliminar la cita. Inténtalo de nuevo.');
                }
            }).catch(error => {
            console.error('Error al enviar la solicitud:', error);
            setConfirmacion('');
            setError('Hubo un problema al eliminar la cita. Inténtalo de nuevo.');
        });
    };



    return (
        <Container style={{ padding: '100px' }}>
            <Box style={{ boxShadow: '10px 15px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                {/* Campos para crear franja */}
                <h2>Cancelar Cita</h2>
                <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField
                        id="idCita"
                        label="ID de la Cita a Cancelar"
                        variant="outlined"
                        fullWidth
                        value={idCita}
                        onChange={(e) => setIdCita(e.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={handleClickCancelarCita}>
                        Cancelar Cita
                    </Button>
                </form>
                {/* Mensajes de confirmación y error */}
                {confirmacion && <p style={{ color: 'green' }}>{confirmacion}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Box>
        </Container>
    );
}
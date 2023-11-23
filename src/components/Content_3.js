import * as React from 'react';
import { useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container,Button } from '@mui/material';



export default function Content() {

    const[idPersonal,setidPersonal]=useState('')
    const[idServicio,setidServicio]=useState('')
    const[horaInicio,sethoraInicio]=useState('')
    const[horaFin,sethoraFin]=useState('')
    const[fecha,setfecha]=useState('')
    const[estado,setestado]=useState('')


    const handleClick=(e)=>{
        e.preventDefault()
        const franja={idPersonal,idServicio,horaInicio,horaFin,fecha,estado}
        console.log(franja)
        fetch("http://localhost:8080/api/citas/programar",{
            method:"POST",
            body:JSON.stringify(franja)

        }).then(()=>{
            console.log("New Franja added")
        })
    }

    return (
        <Container>
                <h1 style={{color:"blue"}}>Programar</h1>

                <form
                    noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                               value={idPersonal}
                               onChange={(e)=>setidPersonal(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                               value={idServicio}
                               onChange={(e)=>setidServicio(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                               value={horaInicio}
                               onChange={(e)=>sethoraInicio(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                               value={horaFin}
                               onChange={(e)=>sethoraFin(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                               value={fecha}
                               onChange={(e)=>setfecha(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                               value={estado}
                               onChange={(e)=>setestado(e.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </form>
        </Container>
    );
}





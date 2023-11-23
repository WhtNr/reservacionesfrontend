import * as React from 'react';
import { useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container,Button } from '@mui/material';



export default function Content() {

    const[fechaLaborable,setfechaLaborable]=useState('')
    const[horaInicio,sethoraInicio]=useState('')
    const[horaFin,sethoraFin]=useState('')


    const handleClick=(e)=>{
        e.preventDefault()
        const franja={fechaLaborable,horaInicio,horaFin}
        console.log(franja)
        fetch("http://localhost:8080/api/franja-de-trabajo?",{
            method:"POST",
            body:JSON.stringify(franja)

        }).then(()=>{
            console.log("New Franja added")
        })
    }

    return (
        <Container>
                <h1 style={{color:"blue"}}>Franja</h1>

                <form
                    noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                               value={fechaLaborable}
                               onChange={(e)=>setfechaLaborable(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                               value={horaInicio}
                               onChange={(e)=>sethoraInicio(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                               value={horaFin}
                               onChange={(e)=>sethoraFin(e.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </form>
        </Container>
    );
}





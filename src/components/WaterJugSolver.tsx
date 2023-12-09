import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { InputState, Step } from '../types';

const WaterJugSolver: React.FC = () => {
    const [inputs, setInputs] = useState<InputState>({ x: '', y: '', z: '' });
    const [steps, setSteps] = useState<Step[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    x: parseInt(inputs.x),
                    y: parseInt(inputs.y),
                    z: parseInt(inputs.z),
                }),
            });
            const data = await response.json();
            console.log(data, 'data')
            setSteps(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <TextField label="X (Jug 1 Capacity)" name="x" value={inputs.x} onChange={handleInputChange} margin="normal" fullWidth />
                <TextField label="Y (Jug 2 Capacity)" name="y" value={inputs.y} onChange={handleInputChange} margin="normal" fullWidth />
                <TextField label="Z (Target Volume)" name="z" value={inputs.z} onChange={handleInputChange} margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">Calculate</Button>
            </form>
            {steps.length > 0 && (
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {steps.map((step, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {step.description}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}

export default WaterJugSolver;

import React from 'react';
import * as Styled from './PatientCard.styled';

const PatientCard = (
    {room, pressureUpper, pressureLow, heartRate, bodyTemperature, saturation, status}
) => {

    const color = (status === "NORMAL")
        ? '#1E90FF' : (status === "MEDIUM")
        ? '#FF8C00' : (status === "HARD")
        ? '#FF0000' : '#8B0000'


    return (
        <Styled.PatientCard style = {{borderColor: color}}>
            <div>Patient room: {room}</div>
            <div>Blood pressure upper: {pressureUpper}</div>
            <div>Blood pressure low: {pressureLow}</div>
            <div>Heart rate: {heartRate}</div>
            <div>Body temperature: {bodyTemperature}</div>
            <div>Saturation: {saturation}</div>
        </Styled.PatientCard>
    );
};

export default PatientCard;
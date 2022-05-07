import React, {useEffect, useState} from 'react';
import * as Styled from './PatientCards.styled';
import PatientCard from "./PatientCard/PatientCard";
import { Stomp } from  '@stomp/stompjs';

const PatientCards = () => {
    const [patients, setPatients] = useState([
        {
            room: 1,
            pressureUpper : 120,
            pressureLow : 80,
            heartRate : 55,
            bodyTemperature : 37.3,
            saturation : 99,
            status : "Normal"
        },
        {
            room: 2,
            pressureUpper : 120,
            pressureLow : 80,
            heartRate : 55,
            bodyTemperature : 37.3,
            saturation : 99,
            status : "Medium"
        },
        {
            room: 3,
            pressureUpper : 120,
            pressureLow : 80,
            heartRate : 55,
            bodyTemperature : 37.3,
            saturation : 99,
            status : "Hard"
        },
        {
            room: 4,
            pressureUpper : 120,
            pressureLow : 80,
            heartRate : 55,
            bodyTemperature : 37.3,
            saturation : 99,
            status : "Critical"
        }
    ]);

    useEffect(() => {
        connect();
    }, []);

    let stompClient = null;

    const connect = () => {
        stompClient = Stomp.client('ws://localhost:10005/medSystem');
        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/healthData', function (message) {
                console.log(message);
                onMessageReceived(JSON.parse(message.body));
            });
        });
    }

    const onMessageReceived = (msg) => {
        setPatients((prev) => {
            const foundEl = prev.find((el) => el.room === msg?.room)
            if (foundEl) {
                foundEl.room = msg?.room;
                foundEl.pressureUpper = msg?.pressureUpper;
                foundEl.pressureLow = msg?.pressureLow;
                foundEl.heartRate = msg?.heartRate;
                foundEl.bodyTemperature = msg?.bodyTemperature;
                foundEl.saturation = msg?.saturation;
                foundEl.status = msg?.status;
            } else {
                prev.push(msg);
            }

            return [...prev];
        })
    }

    return (
        <Styled.CardWrapper>
            {patients.map(value => {
                return (<PatientCard
                    key={value.room}
                    room={value.room}
                    pressureUpper={value.pressureUpper}
                    pressureLow={value.pressureLow}
                    heartRate={value.heartRate}
                    bodyTemperature={value.bodyTemperature}
                    saturation={value.saturation}
                    status={value.status}
                    />);
            })}
        </Styled.CardWrapper>
    );
};

export default PatientCards;
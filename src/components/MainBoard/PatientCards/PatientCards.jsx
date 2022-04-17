import React, {useEffect, useState} from 'react';
import * as Styled from './PatientCards.styled';
import PatientCard from "./PatientCard/PatientCard";


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

    // const runKafka = async () => {
    //     const kafka = new Kafka({
    //         clientId: 'my-app',
    //         brokers: ['localhost:9092'],
    //     })
    //
    //     const consumer = kafka.consumer({ groupId: 'test-group' })
    //
    //     await consumer.connect()
    //     await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    //
    //     await consumer.run({
    //         eachMessage: async ({ topic, partition, message }) => {
    //             setPatients((prev) => {
    //                 const foundEl = prev.find((el) => el.room === message?.room)
    //                 const patientData = message.value;
    //                 console.log(patientData);
    //                 console.log(message);
    //                 if (foundEl) {
    //                     foundEl.pressureUpper = patientData?.pressureUpper;
    //                     foundEl.pressureLow = patientData?.pressureLow;
    //                     foundEl.heartRate = patientData?.heartRate;
    //                     foundEl.bodyTemperature = patientData?.bodyTemperature;
    //                     foundEl.saturation = patientData?.saturation;
    //                     foundEl.status = patientData?.status;
    //                 } else {
    //                     prev.push(patientData);
    //                 }
    //
    //                 return [...prev];
    //             })
    //         },
    //     })
    // }

    // useEffect(() => {
    //     runKafka().catch(console.log);
    // }, []);

    return (
        <Styled.CardWrapper>
            {patients.map(value => {
                return (<PatientCard {...value}/>);
            })}
        </Styled.CardWrapper>
    );
};

export default PatientCards;
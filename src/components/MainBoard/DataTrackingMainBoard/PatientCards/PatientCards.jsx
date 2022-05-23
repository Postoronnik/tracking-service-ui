import React, { useEffect, useState } from 'react';
import * as Styled from './PatientCards.styled';
import PatientCard from './PatientCard/PatientCard';
import { Stomp } from '@stomp/stompjs';

const PatientCards = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    connect();
  }, []);

  let stompClient = null;

  const connect = () => {
    stompClient = Stomp.client('ws://localhost:10004/medSystem');
    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/healthData', function (message) {
        onMessageReceived(JSON.parse(message.body));
      });
    });
  };

  const onMessageReceived = (msg) => {
    setPatients((prev) => {
      const foundEl = prev.find((el) => el.deviceId === msg?.deviceId);
      if (foundEl) {
        if (isPatientDisconnected(msg)) {
          prev = prev.filter((value) => {
            if (!(value.deviceId === foundEl.deviceId)) {
              return value;
            }
          });
        } else {
          foundEl.deviceId = msg?.deviceId;
          foundEl.healthParameters.bloodPressureUpper =
            msg?.healthParameters.bloodPressureUpper;
          foundEl.healthParameters.bloodPressureLow =
            msg?.healthParameters.bloodPressureLow;
          foundEl.healthParameters.heartRate = msg?.healthParameters.heartRate;
          foundEl.healthParameters.bodyTemperature =
            msg?.healthParameters.bodyTemperature;
          foundEl.healthParameters.saturation =
            msg?.healthParameters.saturation;
          foundEl.status = msg?.status;
        }
      } else {
        prev.push(msg);
      }
      return [...prev];
    });
  };

  const isPatientDisconnected = (data) => {
    return (
      data.healthParameters.bloodPressureUpper === 0 &&
      data.healthParameters.bloodPressureLow === 0 &&
      data.healthParameters.heartRate === 0 &&
      data.healthParameters.bodyTemperature === 0 &&
      data.healthParameters.saturation === 0 &&
      data.status === 'NORMAL'
    );
  };

  return (
    <Styled.CardWrapper>
      {patients.map((value) => {
        return (
          <PatientCard
            key={value?.deviceId}
            room={value?.deviceId}
            pressureUpper={value?.healthParameters.bloodPressureUpper}
            pressureLow={value?.healthParameters.bloodPressureLow}
            heartRate={value?.healthParameters.heartRate}
            bodyTemperature={value?.healthParameters.bodyTemperature}
            saturation={value?.healthParameters.saturation}
            status={value?.status}
          />
        );
      })}
    </Styled.CardWrapper>
  );
};

export default PatientCards;

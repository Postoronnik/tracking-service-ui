import React from 'react';
import * as Styled from '../../Styles/InfoBoard.styled';
import { Collections, HealthParameters } from './DiseaseInfo.styled';

const DiseaseInfo = ({ name, description, healthParameter }) => {
  return (
    <Styled.Board>
      <Styled.BoardData>
        <div>Disease name: {name}</div>
        <div>Description: {description},</div>
        <Collections>
          <div>Health parameters</div>
          <HealthParameters>
            <div>
              Blood pressure: {healthParameter.bloodPressureUpper}:
              {healthParameter.bloodPressureLow}
            </div>
            <div>Heart rate: {healthParameter.heartRate}</div>
            <div>Body temperature: {healthParameter.bodyTemperature}</div>
            <div>Saturation: {healthParameter.saturation}</div>
          </HealthParameters>
        </Collections>
      </Styled.BoardData>
    </Styled.Board>
  );
};

export default DiseaseInfo;

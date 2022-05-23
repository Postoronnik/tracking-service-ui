import React from 'react';
import * as Styled from '../../Styles/InfoBoard.styled';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { Collections, HealthParameters } from './PatientInfo.styled';

const PatientInfo = ({
  firstName,
  secondName,
  age,
  gender,
  inpatientTherapyPeriod,
  normalHealthParameters,
  registrationDate,
  therapyStartDate,
  diseases,
}) => {
  return (
    <Styled.Board>
      <Styled.BoardData>
        <div>First name: {firstName}</div>
        <div>Second name: {secondName},</div>
        <div>Age: {age}</div>
        <div>
          Gender:
          {gender === 'MALE' ? (
            <ManOutlined style={{ fontSize: '27px', color: 'blue' }} />
          ) : (
            <WomanOutlined style={{ fontSize: '27px', color: 'pink' }} />
          )}
        </div>
        <div>
          Registration date: {registrationDate[0]}:{registrationDate[1]}:
          {registrationDate[2]}{' '}
        </div>
        <div>
          {' '}
          Therapy start date: &nbsp;
          {therapyStartDate ? (
            <div>
              On impatient therapy from: {therapyStartDate[0]}:
              {therapyStartDate[1]}:{therapyStartDate[2]}
            </div>
          ) : (
            <span>Patient haven`t started inpatient therapy</span>
          )}
        </div>
        <Collections>
          Inpatient therapy period: &nbsp;{' '}
          {inpatientTherapyPeriod.map((period) => {
            return (
              <div>
                [{period.startOfInpatientTherapy[0]}:
                {period.startOfInpatientTherapy[1]}:
                {period.startOfInpatientTherapy[2]} -{' '}
                {period.endOfInpatientTherapy[0]}:
                {period.endOfInpatientTherapy[1]}:
                {period.endOfInpatientTherapy[2]}]&nbsp;
              </div>
            );
          })}
        </Collections>
        <Collections>
          <div>Health parameters</div>
          <HealthParameters>
            <div>
              Blood pressure: {normalHealthParameters.bloodPressureUpper}:
              {normalHealthParameters.bloodPressureLow}
            </div>
            <div>Heart rate: {normalHealthParameters.heartRate}</div>
            <div>
              Body temperature: {normalHealthParameters.bodyTemperature}
            </div>
            <div>Saturation: {normalHealthParameters.saturation}</div>
          </HealthParameters>
        </Collections>
        <Collections>
          Diseases: &nbsp;{' '}
          {diseases.length !== 0 ? (
            diseases.map((disease) => {
              return <div>{disease.name}</div>;
            })
          ) : (
            <div>Patient do not have diseases</div>
          )}
        </Collections>
      </Styled.BoardData>
    </Styled.Board>
  );
};

export default PatientInfo;

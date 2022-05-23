import React from 'react';
import * as Styled from '../../Styles/DataBar.styled';
import {
  InfoCircleOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { Button, Radio } from 'antd';

const PatientBar = ({
  patientId,
  firstName,
  secondName,
  age,
  gender,
  therapyStartDate,
  openInfoWindow,
  showCheckBox,
  showRadio,
  selectPatientForDelete,
}) => {
  const handleInfoButton = () => {
    openInfoWindow(patientId);
  };

  const handleCheckboxClick = () => {
    selectPatientForDelete(patientId);
  };

  return (
    <Styled.Bar>
      <Styled.ShortData>
        <div>{firstName}</div>
        <div>{secondName},</div>
        <div>{age}</div>
        <div>
          {gender === 'MALE' ? (
            <ManOutlined style={{ fontSize: '27px', color: 'blue' }} />
          ) : (
            <WomanOutlined style={{ fontSize: '27px', color: 'pink' }} />
          )}
        </div>
        <div>
          {therapyStartDate ? (
            <div>
              On impatient therapy: {therapyStartDate[0]}:{therapyStartDate[1]}:
              {therapyStartDate[2]}
            </div>
          ) : (
            <div />
          )}
        </div>
      </Styled.ShortData>

      <Styled.BarMenu>
        <Button
          type="text"
          size="large"
          onClick={handleInfoButton}
          icon={
            <InfoCircleOutlined
              style={{
                fontSize: '28px',
                marginRight: '10px',
              }}
            />
          }
        />
        {showCheckBox ? (
          <input
            type="checkbox"
            value={patientId}
            onClick={handleCheckboxClick}
          />
        ) : null}
        {showRadio ? <Radio value={patientId} /> : <div />}
      </Styled.BarMenu>
    </Styled.Bar>
  );
};

export default PatientBar;

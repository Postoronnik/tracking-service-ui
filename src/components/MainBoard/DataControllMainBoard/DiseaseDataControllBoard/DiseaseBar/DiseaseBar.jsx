import React from 'react';
import * as Styled from '../../Styles/DataBar.styled';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';

const DiseaseBar = ({
  diseaseId,
  name,
  openInfoWindow,
  showCheckBox,
  showRadio,
  selectDiseaseForDelete,
}) => {
  const handleInfoButton = () => {
    openInfoWindow(diseaseId);
  };

  const handleCheckboxClick = () => {
    selectDiseaseForDelete(diseaseId);
  };

  return (
    <Styled.Bar>
      <Styled.ShortData>
        <div>{name}</div>
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
            value={diseaseId}
            onClick={handleCheckboxClick}
          />
        ) : null}
        {showRadio ? <Radio value={diseaseId} /> : <div />}
      </Styled.BarMenu>
    </Styled.Bar>
  );
};

export default DiseaseBar;

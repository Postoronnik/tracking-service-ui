import React, {useState} from 'react';
import * as Styled from "./DataControlMainBoard.styled";
import PatientDataControlBoard from "./PatientDataControllBoard/PatientDataControlBoard";
import DiseaseDataControlBoard from "./DiseaseDataControllBoard/DiseaseDataControlBoard";

const DataControlMainBoard = () => {
    return (
        <Styled.DataControlBoard>
            <PatientDataControlBoard/>
            <DiseaseDataControlBoard/>
        </Styled.DataControlBoard>
    )};

export default DataControlMainBoard;
import React, { useEffect, useState } from 'react';
import * as Styled from './DiseaseDataControlBoard.styled';
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import { Button, Pagination } from 'antd';
import DiseaseBar from './DiseaseBar/DiseaseBar';
import Modal from 'antd/es/modal/Modal';
import DiseaseInfo from './DiseaseInfo/DiseaseInfo';
import UpdateDiseaseWindow from './UpdateDiseaseWindow/UpdateDiseaseWindow';
import NewDiseasePopupWindow from './NewDiseaseWindow/NewDiseaseWindow';

const { confirm, info } = Modal;

const maxBarsNum = 18;

const retrieveAllDiseases = async (setDiseases) => {
  console.log('Retrieve all diseases');
  const res = await fetch('http://localhost:10002/disease');
  const result = await res.json();
  setDiseases(result);
  return result;
};

const sleep = (ms) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

const DiseaseDataControlBoard = () => {
  const [diseases, setDiseases] = useState([]);
  const [paginationDiseases, setPaginationDiseases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDiseasesToDelete, setSelectedDiseasesToDelete] = useState([]);
  const [selectedDiseaseToUpdate, setSelectedDiseaseToUpdate] = useState(null);
  const [showDeleteCheckbox, setShowDeleteCheckbox] = useState(false);
  const [showUpdateRadio, setShowUpdateRadio] = useState(false);

  const handlePagination = (diseases, page) => {
    setCurrentPage(page);
    let i = 0;
    const maxDiseaseNumberForPage = page * maxBarsNum;
    const paginatedDiseases = diseases.filter(() => {
      i++;
      return i > (page - 1) * maxBarsNum && i <= maxDiseaseNumberForPage;
    });
    setPaginationDiseases(paginatedDiseases);
  };

  const handlePageChange = (page) => {
    handlePagination(diseases, page);
  };

  useEffect(() => {
    retrieveAllDiseases(setDiseases).then((patients) =>
      handlePagination(patients, 1),
    );
    setInterval(() => {
      retrieveAllDiseases(setDiseases).then((patients) =>
        handlePagination(patients, currentPage),
      );
    }, 60000);
  }, []);

  const addPatientForRemove = (patientId) => {
    setSelectedDiseasesToDelete((prev) => {
      const foundEl = prev.find((el) => el === patientId);
      if (foundEl) {
        return prev.filter((value) => {
          return value !== patientId;
        });
      } else {
        return [...prev, patientId];
      }
    });
  };

  const handleDeleteButtonClick = () => {
    setShowUpdateRadio(false);
    if (!showDeleteCheckbox) {
      setSelectedDiseasesToDelete([]);
    }
    setShowDeleteCheckbox(!showDeleteCheckbox);
  };

  const handleUpdateButtonClick = () => {
    setShowDeleteCheckbox(false);
    setSelectedDiseasesToDelete([]);
    setShowUpdateRadio(!showUpdateRadio);
  };

  const handleUpdatePatient = (e) => {
    setSelectedDiseaseToUpdate(e.target.value);
  };

  const handleConfirmToUpdate = () => {
    confirmUpdateDisease();
  };

  const handleConfirmToDelete = () => {
    confirmDeleteDiseases();
  };

  const infoDisease = (disease) => {
    info({
      title: 'Patient info',
      icon: <ExclamationCircleOutlined />,
      content: (
        <DiseaseInfo
          key={disease.diseaseId}
          diseaseId={disease.diseaseId}
          name={disease.name}
          description={disease.description}
          healthParameter={disease.healthParameter}
        />
      ),
      width: 650,
      onOk() {
        console.log('OK');
      },
    });
  };

  const confirmUpdateDisease = () => {
    const updateDisease = paginationDiseases.filter((disease) => {
      return disease.diseaseId === selectedDiseaseToUpdate;
    });
    console.log('Found disease', updateDisease);
    info({
      title: 'Disease update',
      icon: <ExclamationCircleOutlined />,
      content: (
        <UpdateDiseaseWindow
          handleRetrieve={handleRetrieve}
          disease={updateDisease[0]}
        />
      ),
      width: 900,
      async onOk() {
        console.log('OK');
        setShowUpdateRadio(false);
        handleRetrieve();
      },
    });
  };

  const handleRetrieve = () => {
    retrieveAllDiseases(setDiseases).then((patients) =>
      handlePagination(patients, currentPage),
    );
  };

  const addNewDiseaseConfirmWindow = () => {
    setShowDeleteCheckbox(false);
    setShowUpdateRadio(false);
    setSelectedDiseasesToDelete([]);
    info({
      title: 'Add new disease',
      width: 850,
      icon: <ExclamationCircleOutlined />,
      content: <NewDiseasePopupWindow />,
      async onOk() {
        console.log('OK');
        handleRetrieve();
      },
    });
  };

  const confirmDeleteDiseases = () => {
    confirm({
      title: 'Are you sure to remove diseases?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        console.log('OK');
        await deleteDiseases();
        handleRetrieve();
        await sleep(1000);
      },
      onCancel() {
        console.log('Cancel');
        setSelectedDiseasesToDelete([]);
        setShowDeleteCheckbox(false);
      },
    });
  };

  const deleteDiseases = async () => {
    const request = selectedDiseasesToDelete.map((patientId) => {
      return fetch('http://localhost:10002/patient/' + patientId, {
        method: 'DELETE',
      });
    });

    await Promise.all(request);

    console.log('Delete successful');
    setSelectedDiseasesToDelete([]);
    setShowDeleteCheckbox(false);
  };

  const openInfoWindow = (diseaseId) => {
    const disease = diseases.find((disease) => {
      if (disease.diseaseId === diseaseId) {
        return disease;
      }
    });
    infoDisease(disease);
  };

  return (
    <Styled.DiseaseBoardLayer>
      <Styled.MenuLayer>
        <Button
          type="text"
          size="large"
          onClick={handleUpdateButtonClick}
          icon={
            <EditOutlined
              style={{
                fontSize: '28px',
                marginRight: '10px',
              }}
            />
          }
        />
        <Button
          type="text"
          size="large"
          onClick={addNewDiseaseConfirmWindow}
          icon={
            <FileAddOutlined
              style={{
                fontSize: '28px',
                marginRight: '10px',
              }}
            />
          }
        />
        <Button
          type="text"
          size="large"
          onClick={handleDeleteButtonClick}
          icon={
            <DeleteOutlined
              style={{
                fontSize: '28px',
                marginRight: '10px',
              }}
            />
          }
        />
        {showDeleteCheckbox ? (
          <Button
            type="text"
            size="large"
            onClick={handleConfirmToDelete}
            icon={
              <CheckOutlined
                style={{
                  fontSize: '28px',
                  marginRight: '10px',
                }}
              />
            }
          />
        ) : (
          <div />
        )}
        {showUpdateRadio ? (
          <Button
            type="text"
            size="large"
            onClick={handleConfirmToUpdate}
            icon={
              <CheckOutlined
                style={{
                  fontSize: '28px',
                  marginRight: '10px',
                }}
              />
            }
          />
        ) : (
          <div />
        )}
      </Styled.MenuLayer>
      <Styled.ComponentsLayer
        name="updateGroup"
        onChange={handleUpdatePatient}
        defaultValue=""
      >
        {diseases.map((patient) => {
          return (
            <DiseaseBar
              key={patient.diseaseId}
              diseaseId={patient.diseaseId}
              name={patient.name}
              description={patient.description}
              healthParameter={patient.healthParameter}
              openInfoWindow={openInfoWindow}
              showCheckBox={showDeleteCheckbox}
              showRadio={showUpdateRadio}
              selectDiseaseForDelete={addPatientForRemove}
            />
          );
        })}
      </Styled.ComponentsLayer>
      <Styled.PaginationLayer>
        <Pagination
          current={currentPage}
          total={diseases.length}
          pageSize={18}
          onChange={handlePageChange}
        />
      </Styled.PaginationLayer>
    </Styled.DiseaseBoardLayer>
  );
};

export default DiseaseDataControlBoard;

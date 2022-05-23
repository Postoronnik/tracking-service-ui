import React, { useEffect, useState } from 'react';
import * as Styled from './PatientDataControlBoard.styled';
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import { Button, Pagination, Popover } from 'antd';
import PatientBar from './PatientBar/PatientBar';
import PatientInfo from './PatientInfo/PatientInfo';
import Modal from 'antd/es/modal/Modal';
import NewPatientWindow from './NewPatientPopupWindow/NewPatientWindow';
import UpdatePatientWindow from './UpdatePatientWindow/UpdatePatientWindow';

const { confirm, info } = Modal;

const maxBarsNum = 18;

const retrieveAllPatients = async (setPatients) => {
  console.log('Retrieve all patients');
  const res = await fetch('http://localhost:10002/patient');
  const result = await res.json();
  setPatients(result);
  return result;
};

const sleep = (ms) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

const PatientDataControlBoard = () => {
  const [patients, setPatients] = useState([]);
  const [paginationPatients, setPaginationPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatientsToDelete, setSelectedPatientsToDelete] = useState([]);
  const [selectedPatientToUpdate, setSelectedPatientToUpdate] = useState(null);
  const [showDeleteCheckbox, setShowDeleteCheckbox] = useState(false);
  const [showUpdateRadio, setShowUpdateRadio] = useState(false);

  const handlePagination = (patients, page) => {
    setCurrentPage(page);
    let i = 0;
    const maxPatientNumberForPage = page * maxBarsNum;
    const paginatedPatients = patients.filter(() => {
      i++;
      return i > (page - 1) * maxBarsNum && i <= maxPatientNumberForPage;
    });
    setPaginationPatients(paginatedPatients);
  };

  const handlePageChange = (page) => {
    handlePagination(patients, page);
  };

  useEffect(() => {
    retrieveAllPatients(setPatients).then((patients) =>
      handlePagination(patients, 1),
    );
    setInterval(() => {
      retrieveAllPatients(setPatients).then((patients) =>
        handlePagination(patients, currentPage),
      );
    }, 60000);
  }, []);

  const addPatientForRemove = (patientId) => {
    setSelectedPatientsToDelete((prev) => {
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
      setSelectedPatientsToDelete([]);
    }
    setShowDeleteCheckbox(!showDeleteCheckbox);
  };

  const handleUpdateButtonClick = () => {
    setShowDeleteCheckbox(false);
    setSelectedPatientsToDelete([]);
    setShowUpdateRadio(!showUpdateRadio);
  };

  const handleUpdatePatient = (e) => {
    setSelectedPatientToUpdate(e.target.value);
  };

  const handleConfirmToUpdate = () => {
    confirmUpdatePatient();
  };

  const handleConfirmToDelete = () => {
    confirmDeletePatients();
  };

  const infoPatient = (patient) => {
    info({
      title: 'Patient info',
      icon: <ExclamationCircleOutlined />,
      content: (
        <PatientInfo
          key={patient.patientId}
          patientId={patient.patientId}
          firstName={patient.firstName}
          secondName={patient.secondName}
          age={patient.age}
          gender={patient.gender}
          inpatientTherapyPeriod={patient.inpatientTherapyPeriod}
          normalHealthParameters={patient.normalHealthParameters}
          registrationDate={patient.registrationDate}
          therapyStartDate={patient.therapyStartDate}
          diseases={patient.diseases}
        />
      ),
      width: 650,
      onOk() {
        console.log('OK');
      },
    });
  };

  const confirmUpdatePatient = () => {
    const updatePatient = paginationPatients.filter((patient) => {
      return patient.patientId === selectedPatientToUpdate;
    });
    info({
      title: 'Patient update',
      icon: <ExclamationCircleOutlined />,
      content: (
        <UpdatePatientWindow
          handleRetrieve={handleRetrieve}
          patient={updatePatient[0]}
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
    retrieveAllPatients(setPatients).then((patients) =>
      handlePagination(patients, currentPage),
    );
  };

  const addNewPatientConfirmWindow = () => {
    setShowDeleteCheckbox(false);
    setShowUpdateRadio(false);
    setSelectedPatientsToDelete([]);
    info({
      title: 'Add new patient',
      width: 850,
      icon: <ExclamationCircleOutlined />,
      content: <NewPatientWindow />,
      async onOk() {
        console.log('OK');
        handleRetrieve();
      },
    });
  };

  const confirmDeletePatients = () => {
    confirm({
      title: 'Are you sure to remove patients?',
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        console.log('OK');
        await deletePatients();
        handleRetrieve();
        await sleep(1000);
      },
      onCancel() {
        console.log('Cancel');
        setSelectedPatientsToDelete([]);
        setShowDeleteCheckbox(false);
      },
    });
  };

  const deletePatients = async () => {
    const request = selectedPatientsToDelete.map((patientId) => {
      return fetch('http://localhost:10002/patient/' + patientId, {
        method: 'DELETE',
      });
    });

    await Promise.all(request);

    console.log('Delete successful');
    setSelectedPatientsToDelete([]);
    setShowDeleteCheckbox(false);
  };

  const openInfoWindow = (patientId) => {
    const patient = patients.find((patient) => {
      if (patient.patientId === patientId) {
        return patient;
      }
    });
    infoPatient(patient);
  };

  return (
    <Styled.PatientBoardLayer>
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
          onClick={addNewPatientConfirmWindow}
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
        {paginationPatients.map((patient) => {
          return (
            <PatientBar
              key={patient.patientId}
              patientId={patient.patientId}
              firstName={patient.firstName}
              secondName={patient.secondName}
              age={patient.age}
              gender={patient.gender}
              therapyStartDate={patient.therapyStartDate}
              openInfoWindow={openInfoWindow}
              showCheckBox={showDeleteCheckbox}
              showRadio={showUpdateRadio}
              selectPatientForDelete={addPatientForRemove}
            />
          );
        })}
      </Styled.ComponentsLayer>
      <Styled.PaginationLayer>
        <Pagination
          current={currentPage}
          total={patients.length}
          pageSize={18}
          onChange={handlePageChange}
        />
      </Styled.PaginationLayer>
    </Styled.PatientBoardLayer>
  );
};

export default PatientDataControlBoard;

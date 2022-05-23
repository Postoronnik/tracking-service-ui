import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button,
  Radio,
  InputNumber,
  Alert,
  Select,
  Space,
  Spin,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';

const sleep = (ms) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

const UpdatePatientWindow = ({ handleRetrieve, patient }) => {
  const [form] = Form.useForm();

  const [gender, setGender] = useState('MALE');
  const [patientId, setPatientId] = useState();
  const [diseasesAll, setDiseasesAll] = useState([]);
  const [isPatientUpdated, setIsPatientUpdated] = useState({
    isRequestSent: false,
    responseStatus: null,
  });
  const [isRequestRunning, setIsRequestRunning] = useState(false);

  const genders = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
  ];

  const diseaseIdArray = diseasesAll.map((disease) => {
    return disease.diseaseId;
  });

  useEffect(() => {
    setPatientId(patient.patientId);
    fetchDiseases();
  }, []);

  const onGenderSelect = (e) => {
    setGender(e.target.value);
  };

  const handleOnSubmit = (values) => {
    console.log('Success:', values);
    updatePatient({
      firstName: values.firstName,
      secondName: values.secondName,
      age: values.age,
      gender: values.gender,
      normalHealthParameters: {
        bloodPressureUpper: values.bloodPressureUpper,
        bloodPressureLow: values.bloodPressureLow,
        heartRate: values.heartRate,
        bodyTemperature: values.bodyTemperature,
        saturation: values.saturation,
      },
      diseases: values.diseases.map((val) => {
        return { diseaseId: val };
      }),
    });
  };

  const fetchDiseases = async () => {
    const response = await fetch('http://localhost:10002/disease', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    setDiseasesAll(result);
  };

  const updatePatient = async (updatedPatientData) => {
    const patientMain = {
      firstName: updatedPatientData.firstName,
      secondName: updatedPatientData.secondName,
      age: updatedPatientData.age,
      gender: updatedPatientData.gender,
    };

    const patientHealthParameters = {
      bloodPressureUpper:
        updatedPatientData.normalHealthParameters.bloodPressureUpper,
      bloodPressureLow:
        updatedPatientData.normalHealthParameters.bloodPressureLow,
      heartRate: updatedPatientData.normalHealthParameters.heartRate,
      bodyTemperature:
        updatedPatientData.normalHealthParameters.bodyTemperature,
      saturation: updatedPatientData.normalHealthParameters.saturation,
    };

    setIsRequestRunning(true);
    //Update patient
    await fetch(
      'http://localhost:10002/patient/' + patientId + '/update_patient',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientMain),
      },
    );

    //Update patient health parameters
    await fetch(
      'http://localhost:10002/patient/' +
        patientId +
        '/update_normal_health_parameters',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientHealthParameters),
      },
    );

    //Update patient diseases
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    const uniqueDiseases = updatedPatientData.diseases.filter(unique);

    fetch('http://localhost:10002/patient/' + patientId + '/update_disease', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uniqueDiseases),
    })
      .then(() => {
        setIsPatientUpdated({
          isRequestSent: true,
          responseStatus: null,
        });
      })
      .catch((error) => {
        setIsPatientUpdated({
          isRequestSent: true,
          responseStatus: error,
        });
      });

    if (
      patient.diseases.length === 0 &&
      updatedPatientData.diseases.length > 0
    ) {
      await fetch(
        'http://localhost:10002/patient/' + patientId + '/start_therapy',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } else {
      if (
        patient.diseases.length > 0 &&
        updatedPatientData.diseases.length === 0
      ) {
        await fetch(
          'http://localhost:10002/patient/' + patientId + '/end_therapy',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }
    }

    await sleep(2 * 1000);

    setIsRequestRunning(false);
  };

  if (patient.diseases.length !== 0 && diseaseIdArray.length === 0) {
    return <div />;
  }

  return (
    <Form
      form={form}
      onFinish={handleOnSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      initialValues={{
        firstName: patient.firstName,
        secondName: patient.secondName,
        age: patient.age,
        gender: patient.gender,
        bloodPressureUpper: patient.normalHealthParameters.bloodPressureUpper,
        bloodPressureLow: patient.normalHealthParameters.bloodPressureLow,
        heartRate: patient.normalHealthParameters.heartRate,
        bodyTemperature: patient.normalHealthParameters.bodyTemperature,
        saturation: patient.normalHealthParameters.saturation,
        diseases: diseaseIdArray,
      }}
    >
      <Form.Item
        label="Name"
        name="firstName"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Surname"
        name="secondName"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter surname!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Age"
        name="age"
        rules={[
          {
            type: 'number',
            required: true,
            message: 'Please enter age!',
          },
        ]}
      >
        <InputNumber min={0} max={105} />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please select gender!',
          },
        ]}
      >
        <Radio.Group
          options={genders}
          onChange={onGenderSelect}
          value={gender}
          optionType="button"
          buttonStyle="solid"
        />
      </Form.Item>
      <Form.Item label="Health parameters" />
      <Form.Item
        label="Pressure upper"
        name="bloodPressureUpper"
        rules={[
          {
            type: 'number',
            required: true,
            message: 'Please enter blood pressure upper value!',
          },
        ]}
      >
        <InputNumber min={0} max={300} />
      </Form.Item>
      <Form.Item
        label="Pressure low"
        name="bloodPressureLow"
        rules={[
          {
            type: 'number',
            required: true,
            message: 'Please enter blood pressure low value!',
          },
        ]}
      >
        <InputNumber min={0} max={300} />
      </Form.Item>
      <Form.Item
        label="Heart rate"
        name="heartRate"
        rules={[
          {
            type: 'number',
            required: true,
            message: 'Please enter heart rate value!',
          },
        ]}
      >
        <InputNumber min={0} max={300} />
      </Form.Item>
      <Form.Item
        label="Body temperature"
        name="bodyTemperature"
        rules={[
          {
            type: 'number',
            required: true,
            message: 'Please enter body temperature value!',
          },
        ]}
      >
        <InputNumber min={32.0} max={42.0} step="0.1" />
      </Form.Item>
      <Form.Item
        label="Saturation"
        name="saturation"
        rules={[
          {
            type: 'number',
            required: true,
            message: 'Please enter saturation value!',
          },
        ]}
      >
        <InputNumber min={0} max={100} value={99} />
      </Form.Item>
      <Form.List name="diseases">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.area !== curValues.area ||
                      prevValues.diseases !== curValues.diseases
                    }
                  >
                    {() => {
                      return (
                        <Form.Item
                          {...field}
                          label="Disease"
                          rules={[
                            { required: true, message: 'Missing disease' },
                          ]}
                        >
                          <Select style={{ width: 350 }}>
                            {diseasesAll.map((item) => {
                              return (
                                <Select.Option
                                  key={item.diseaseId}
                                  value={item.diseaseId}
                                >
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      );
                    }}
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add sights
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
      {!isPatientUpdated.isRequestSent ? (
        <div />
      ) : isRequestRunning ? (
        <Spin />
      ) : isPatientUpdated.responseStatus ? (
        <Alert
          message="Patient wasn't updated!"
          description={'Creation error ' + isPatientUpdated.responseStatus}
          type="error"
          showIcon
        />
      ) : (
        <Alert message="Patient updated!" type="success" showIcon />
      )}
    </Form>
  );
};

export default UpdatePatientWindow;

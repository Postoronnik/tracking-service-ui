import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Radio, InputNumber, Alert } from 'antd';

const sleep = (ms) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

const NewPatientWindow = () => {
  const [gender, setGender] = useState('MALE');
  const [isPatientCreated, setIsPatientCreated] = useState({
    isRequestSent: false,
    responseStatus: null,
  });

  const genders = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
  ];

  const onGenderSelect = (e) => {
    setGender(e.target.value);
  };

  const handleOnSubmit = (values) => {
    console.log('Success:', values);
    addNewPatient({
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
    });
  };

  const addNewPatient = async (patient) => {
    await fetch('http://localhost:10002/patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    })
      .then(() => {
        setIsPatientCreated({
          isRequestSent: true,
          responseStatus: null,
        });
      })
      .catch((error) => {
        setIsPatientCreated({
          isRequestSent: true,
          responseStatus: error,
        });
      });

    await sleep(2 * 1000);
  };

  return (
    <Form
      onFinish={handleOnSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      initialValues={{
        bloodPressureUpper: 120,
        bloodPressureLow: 80,
        heartRate: 80,
        bodyTemperature: 36.6,
        saturation: 99,
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
        <InputNumber min={0} max={300} defaultValue={120} />
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
        <InputNumber min={0} max={300} defaultValue={80} />
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
        <InputNumber min={0} max={300} defaultValue={80} />
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
        <InputNumber min={32.0} max={42.0} defaultValue={36.6} step="0.1" />
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
        <InputNumber min={0} max={100} defaultValue={99} value={99} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
      {!isPatientCreated.isRequestSent ? (
        <div></div>
      ) : isPatientCreated.responseStatus ? (
        <Alert
          message="Patient wasn't created!"
          description={'Creation error ' + isPatientCreated.responseStatus}
          type="error"
          showIcon
        />
      ) : (
        <Alert message="Patient created!" type="success" showIcon />
      )}
    </Form>
  );
};

export default NewPatientWindow;

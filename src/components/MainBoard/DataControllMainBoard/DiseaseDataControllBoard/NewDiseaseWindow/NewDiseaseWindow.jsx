import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, InputNumber, Alert } from 'antd';

const sleep = (ms) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

const NewDiseaseWindow = () => {
  const [isDiseaseCreated, setIsDiseaseCreated] = useState({
    isRequestSent: false,
    responseStatus: null,
  });

  const handleOnSubmit = (values) => {
    console.log('Success:', values);
    addNewDisease({
      name: values.name,
      description: values.description,
      healthParameter: {
        bloodPressureUpper: values.bloodPressureUpper,
        bloodPressureLow: values.bloodPressureLow,
        heartRate: values.heartRate,
        bodyTemperature: values.bodyTemperature,
        saturation: values.saturation,
      },
    });
  };

  const addNewDisease = async (disease) => {
    await fetch('http://localhost:10002/disease', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(disease),
    })
      .then(() => {
        setIsDiseaseCreated({
          isRequestSent: true,
          responseStatus: null,
        });
      })
      .catch((error) => {
        setIsDiseaseCreated({
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
        name="name"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter disease name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea showCount maxLength={200} style={{ height: 150 }} />
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
      {!isDiseaseCreated.isRequestSent ? (
        <div></div>
      ) : isDiseaseCreated.responseStatus ? (
        <Alert
          message="Disease wasn't created!"
          description={'Creation error ' + isDiseaseCreated.responseStatus}
          type="error"
          showIcon
        />
      ) : (
        <Alert message="Disease created!" type="success" showIcon />
      )}
    </Form>
  );
};

export default NewDiseaseWindow;

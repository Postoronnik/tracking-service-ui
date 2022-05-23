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

const UpdateDiseaseWindow = ({ disease }) => {
  const [form] = Form.useForm();

  const [diseaseId, setDiseaseId] = useState();
  const [isDiseaseUpdated, setIsDiseaseUpdated] = useState({
    isRequestSent: false,
    responseStatus: null,
  });
  const [isRequestRunning, setIsRequestRunning] = useState(false);

  useEffect(() => {
    setDiseaseId(disease.diseaseId);
  }, []);

  const handleOnSubmit = (values) => {
    console.log('Success:', values);
    updateDisease({
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

  const updateDisease = async (updatedDisease) => {
    setIsRequestRunning(true);
    console.log('Updated disease', updatedDisease);

    await fetch('http://localhost:10002/disease/' + diseaseId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDisease),
    })
      .then(() => {
        setIsDiseaseUpdated({
          isRequestSent: true,
          responseStatus: null,
        });
      })
      .catch((error) => {
        setIsDiseaseUpdated({
          isRequestSent: true,
          responseStatus: error,
        });
      });
    await sleep(2 * 1000);

    setIsRequestRunning(false);
  };

  return (
    <Form
      form={form}
      onFinish={handleOnSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      initialValues={{
        name: disease.name,
        description: disease.description,
        bloodPressureUpper: disease.healthParameter.bloodPressureUpper,
        bloodPressureLow: disease.healthParameter.bloodPressureLow,
        heartRate: disease.healthParameter.heartRate,
        bodyTemperature: disease.healthParameter.bodyTemperature,
        saturation: disease.healthParameter.saturation,
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
      {!isDiseaseUpdated.isRequestSent ? (
        <div />
      ) : isRequestRunning ? (
        <Spin />
      ) : isDiseaseUpdated.responseStatus ? (
        <Alert
          message="Disease wasn't updated!"
          description={'Creation error ' + isDiseaseUpdated.responseStatus}
          type="error"
          showIcon
        />
      ) : (
        <Alert message="Disease updated!" type="success" showIcon />
      )}
    </Form>
  );
};

export default UpdateDiseaseWindow;

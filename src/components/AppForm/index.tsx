import React, { useState } from 'react';
import { Form, Select, Tabs, Button, Space, message } from 'antd';
import { ProFormField } from '@ant-design/pro-form';
import KeyValueFormList from './KeyValueFormList';
import { deployApp, deleteApp } from '@/services';

const { TabPane } = Tabs;

const AppForm = ({ fullName = [], name = [], ...props }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <ProFormField
        label="name"
        name={[...name, 'name']}
        rules={[{ required: true, message: 'Please input your app name!' }]}
      />
      <ProFormField hidden name={[...name, 'id']} />
      <ProFormField label="title" name={[...name, 'title']} />
      <ProFormField
        label="description"
        name={[...name, 'desc']}
        valueType="textarea"
      />
      <ProFormField
        label="enable"
        name={[...name, 'enable']}
        valueType="checkbox"
        valueEnum={{
          true: {
            text: ' ',
          },
        }}
      />
      <Form.Item
        name={[...name, 'image']}
        label="Image"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select a docker image" allowClear>
          <Select.Option value="nginx:alpine">nginx:alpine</Select.Option>
          <Select.Option value="redis:alpine">redis:alpine</Select.Option>
          <Select.Option value="traefik">traefik</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
        <Tabs defaultActiveKey="environment" tabPosition="top">
          <TabPane tab="Environment" key="environment">
            <KeyValueFormList
              title="Environment"
              name={[...name, 'environment']}
              fields={[
                {
                  name: 'name',
                  label: 'Name',
                  placeholder: 'a name',
                  rules: [{ required: true, message: 'Please enter name' }],
                },
                {
                  name: 'value',
                  label: 'Value',
                  placeholder: 'a value',
                  rules: [{ required: true, message: 'Please enter value' }],
                },
              ]}
            />
          </TabPane>
          <TabPane tab="Volumes" key="volumes">
            <KeyValueFormList
              title="Volume"
              name={[...name, 'volumes']}
              fields={[
                {
                  name: 'host_path',
                  label: 'host_path',
                  placeholder: 'a host_path',
                  rules: [
                    { required: true, message: 'Please enter host_path' },
                  ],
                },
                {
                  name: 'mount_path',
                  label: 'mount_path',
                  placeholder: 'a mount_path',
                  rules: [
                    { required: true, message: 'Please enter mount_path' },
                  ],
                },
              ]}
            />
          </TabPane>
          <TabPane tab="Ports" key="ports">
            <KeyValueFormList
              title="Port"
              name={[...name, 'ports']}
              fields={[
                {
                  name: 'host_port',
                  label: 'host_port',
                  placeholder: 'a host_port',
                  rules: [
                    { required: true, message: 'Please enter host_port' },
                  ],
                },
                {
                  name: 'container_port',
                  label: 'container_port',
                  placeholder: 'a container_port',
                  rules: [
                    { required: true, message: 'Please enter container_port' },
                  ],
                },
              ]}
            />
          </TabPane>
          <TabPane tab="Ingress" key="ingress">
            <KeyValueFormList
              title="Ingress"
              name={[...name, 'ingress']}
              fields={[
                {
                  name: 'domain',
                  label: 'domain',
                  placeholder: 'a domain',
                  rules: [],
                },
                {
                  name: 'path',
                  label: 'path',
                  placeholder: 'a path',
                  rules: [{ required: true, message: 'Please enter path' }],
                },
                {
                  name: 'stripprefix',
                  label: 'stripprefix',
                  placeholder: 'a path',
                  rules: [{ message: 'Please enter path' }],
                },
                {
                  name: ['target', 'path'],
                  label: 'target path',
                  placeholder: 'a target path',
                  rules: [
                    { required: true, message: 'Please enter target path' },
                  ],
                },
                {
                  name: ['target', 'port'],
                  label: 'target port',
                  placeholder: 'a target port',
                  rules: [
                    { required: true, message: 'Please enter target port' },
                  ],
                },
              ]}
            />
          </TabPane>
          <TabPane tab="Command" key="command">
            <KeyValueFormList
              title="Command"
              name={[...name, 'command']}
              fields={[{ style: { width: 400 } }]}
            />
          </TabPane>
        </Tabs>
      </Form.Item>
      <Form.Item shouldUpdate wrapperCol={{ offset: 4, span: 20 }}>
        {(form) => {
          return (
            <Space direction="vertical" style={{ width: '100%' }}>
              {form.getFieldValue(['id']) && (
                <Button
                  type="primary"
                  ghost
                  block
                  loading={loading}
                  onClick={() => {
                    setLoading(true);
                    form
                      .validateFields()
                      .then(async (values) => {
                        const data = form.getFieldValue(fullName);
                        const result = await deployApp({
                          ...data,
                          parent: fullName.length > 0 ? values.id : undefined,
                        });
                        result.id
                          ? message.success('Update success')
                          : message.error('Update failed');
                      })
                      .catch(() => {
                        message.error('Update failed');
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                >
                  {form.getFieldValue([...fullName, 'id'])
                    ? 'Update'
                    : 'Create'}
                </Button>
              )}
              {name.length > 0 && (
                <Button
                  danger
                  block
                  onClick={async () => {
                    const dependId = form.getFieldValue([...fullName, 'id']);
                    if (!dependId) {
                      props.remove && props.remove(name);
                      return;
                    }
                    const { id } = await form.validateFields();
                    const result = await deleteApp({
                      parent: fullName.length > 0 ? id : undefined,
                      id: dependId,
                    });
                    if (result.id) {
                      props.remove && props.remove(name);
                      message.success('Delete success');
                    } else {
                      message.error('Delete failed');
                    }
                  }}
                >
                  {form.getFieldValue([...fullName, 'id'])
                    ? 'Delete'
                    : 'Cancel'}
                </Button>
              )}
            </Space>
          );
        }}
      </Form.Item>
    </>
  );
};

export default AppForm;

import React from 'react';
import { history, useModel } from 'umi';
import { Form, Divider, Button, Card, message } from 'antd';
import AppForm from '@/components/AppForm';
import AppDependsForm from '@/components/AppDependsForm';
import { deployApp, deleteApp } from '@/services';

const AppItem: React.FC<{}> = () => {
  const { app, setLayoutModel } = useModel('useLayoutModel', (model) => model);
  return (
    <Card style={{ padding: 48, maxWidth: 1140, margin: '0 auto 24px' }}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={app}
        onFinish={async (values) => {
          const result = await deployApp({ ...app, ...values });
          if (result.id) {
            message.success('Create success');
            setLayoutModel({ app: result, loading: false });
            history.push(`/apps/${result.id}`);
          }
        }}
      >
        <AppForm />
        <Divider>Depends</Divider>
        <AppDependsForm name={['depends']} />
        {app.id == undefined && (
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" size="large" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        )}
        {app.id && (
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button
              type="primary"
              size="large"
              block
              danger
              onClick={async () => {
                const result = await deleteApp({ id: app.id });
                if (result.id) {
                  history.push('/apps');
                } else {
                  message.error('Destroy failed');
                }
              }}
            >
              Destroy
            </Button>
          </Form.Item>
        )}
      </Form>
    </Card>
  );
};

export default AppItem;

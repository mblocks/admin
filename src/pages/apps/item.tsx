import { useState, useEffect } from 'react';
import { useParams } from 'umi';
import { Card, Button, Popconfirm, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormList,
  ProFormGroup,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { getAppOverview, updateApp, updateAppService } from '@/services/apps';

export default () => {
  const params = useParams();
  const { app_id } = params;
  const [app, setApp] = useState({ services: [] });
  const [form] = ProForm.useForm();
  const [serviceForm] = ProForm.useForm();
  const [serviceFormVisible, setServiceFormVisible] = useState(false);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
    },
    {
      title: 'Ip',
      dataIndex: 'ip',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Container',
      dataIndex: 'container_id',
    },
    {
      title: '',
      valueType: 'option',
      width: 100,
      render: (text, record) => [
        <Button
          key="update"
          size="small"
          onClick={() => {
            setServiceFormVisible(true);
            serviceForm.setFieldsValue(record);
          }}
        >
          update
        </Button>,
        <Popconfirm
          key="delete"
          title="Are you sure？"
          onConfirm={() => {
            setApp({
              ...app,
              services: [...app.services.filter((v) => v.id != record.id)],
            });
          }}
        >
          <Button key="delete" size="small" danger>
            delete
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    getAppOverview({ id: app_id }).then((res) => {
      setApp(res);
      form.setFieldsValue(res);
    });
  }, []);

  return (
    <>
      <Card bordered={false}>Overview</Card>
      <Card bordered={false} title="Role declare" style={{ marginTop: '24px' }}>
        Overview
      </Card>
      <Card title="basic" bordered={false} style={{ marginTop: '24px' }}>
        <ProForm
          form={form}
          submitter={{
            searchConfig: {
              submitText: 'Save',
            },
            render: (_, dom) => dom.pop(),
          }}
          onFinish={async (values) => {
            const res = await updateApp(values);
            if (res.response.status == 200) {
              message.success('success');
            }
          }}
        >
          <ProFormText
            width="xl"
            name="title"
            label="title"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormText
            width="xl"
            name="name"
            label="name"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormText name="id" hidden />
        </ProForm>
      </Card>
      <ProTable
        style={{ marginTop: '24px' }}
        columns={columns}
        rowKey="id"
        dataSource={app.services}
        pagination={false}
        search={false}
        dateFormatter="string"
        headerTitle="Services"
        toolBarRender={() => [
          <Button
            type="primary"
            key="create"
            icon={<PlusOutlined />}
            onClick={() => {
              serviceForm.resetFields();
              setServiceFormVisible(true);
            }}
          >
            Create
          </Button>,
        ]}
      />
      <ModalForm
        modalProps={{
          onCancel: () => setServiceFormVisible(false),
          okText: <>{serviceForm.getFieldValue('id') ? 'Save' : 'Create'}</>,
          cancelText: <>Cancel</>,
        }}
        form={serviceForm}
        visible={serviceFormVisible}
        onFinish={async (values) => {
          const res = await updateAppService({ app_id, ...values });
          if (res.response.status == 200) {
            if (values.id) {
              setApp({
                ...app,
                services: app.services.map((v) =>
                  v.id === res.data.id ? { ...v, ...res.data } : v,
                ),
              });
            } else {
              setApp({ ...app, services: [res.data, ...app.services] });
            }
          }
          setServiceFormVisible(false);
        }}
      >
        <ProFormText
          width="xl"
          name="name"
          label="name"
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText
          width="xl"
          name="image"
          label="image"
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormList
          name="environment"
          label="ENV"
          creatorButtonProps={{
            position: 'bottom',
          }}
        >
          <ProFormGroup>
            <ProFormText
              rules={[{ required: true }]}
              name="name"
              label="name"
            />
            <ProFormText
              rules={[{ required: true }]}
              name="value"
              label="value"
            />
          </ProFormGroup>
        </ProFormList>
        <ProFormText hidden name="id" />
      </ModalForm>
    </>
  );
};

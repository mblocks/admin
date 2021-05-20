import { useState } from 'react';
import { useParams } from 'umi';
import { Button, Badge, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { queryAppRoles, updateAppRole } from '@/services/apps';

export default () => {
  const { app_id } = useParams();
  const [formVisible, setFormVisible] = useState(false);
  const [form] = ProForm.useForm();
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: 620,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      hideInSearch: true,
      render: (_, item) => (
        <Badge
          color={item.enabled ? 'green' : 'red'}
          text={item.enabled ? 'enabled' : 'disabled'}
        />
      ),
    },
    {
      title: 'actions',
      valueType: 'option',
      width: 40,
      render: (text, record) => [
        <Button
          key="edit"
          size="small"
          onClick={() => {
            setFormVisible(true);
            form.setFieldsValue(record);
          }}
        >
          Edit
        </Button>,
        <Popconfirm
          key="delete"
          title="Are you sure？"
          onConfirm={() => {
            setData([...data.filter((v) => v.id != record.id)]);
          }}
        >
          <Button size="small" danger>
            Delete
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ModalForm
        modalProps={{
          onCancel: () => setFormVisible(false),
          okText: <>{form.getFieldValue('id') ? 'Save' : 'Create'}</>,
          cancelText: <>Cancel</>,
        }}
        form={form}
        visible={formVisible}
        onFinish={async (values) => {
          const res = await updateAppRole({
            ...values,
            app_id,
          });
          if (res.response.status == 200) {
            if (values.id) {
              setData(data.map((v) => (v.id === res.data.id ? res.data : v)));
            } else {
              setData([res.data, ...data]);
            }
            setFormVisible(false);
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
        <ProFormTextArea
          width="xl"
          name="auth"
          label="auth"
          style={{ width: '100%' }}
          fieldProps={{ rows: 6 }}
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormSwitch name="enabled" label="enabled" />
        <ProFormText hidden name="id" />
      </ModalForm>
      <ProTable
        columns={columns}
        request={async (params = {}, sort, filter) => {
          const res = await queryAppRoles({ app_id, params });
          setData(res.data);
          return res;
        }}
        dataSource={data}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="create"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              form.resetFields();
              setFormVisible(true);
            }}
          >
            Create
          </Button>,
        ]}
      />
    </>
  );
};

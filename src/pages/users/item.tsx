import {
  Form,
  Input,
  Button,
  Card,
  Radio,
  Col,
  Row,
  Divider,
  Space,
  Tag,
  message,
} from 'antd';
import { useModel, useParams, history } from 'umi';
import { EditableProTable } from '@ant-design/pro-table';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import {
  queryAppRoles,
  queryUserAuthorizedApps,
  updateUserAuthorizedApps,
  updateUser,
} from '@/services';

type AppItem = {
  id: number;
  name: string;
  title: string;
  roles: {
    title: string;
    id: number;
  }[];
};

const apps = [
  { name: 'App 1', title: 'App1' },
  { name: 'App 2', title: 'App2' },
  { name: 'App 3', title: 'App3' },
  { name: 'App 4', title: 'App4' },
  { name: 'App 5', title: 'App5' },
  { name: 'App 6', title: 'App6' },
  { name: 'App 7', title: 'App7' },
  { name: 'App 8', title: 'App8' },
];

const columns: ProColumns<AppItem>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    ellipsis: true,
    width: 100,
    editable: false,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    ellipsis: true,
    width: 200,
    editable: false,
  },
  {
    title: 'Roles',
    key: 'roles',
    dataIndex: 'roles-placeholder',
    valueType: 'select',
    render: (_, record) => {
      return record.roles.map((v) => <Tag key={v.id}>{v.title}</Tag>);
    },
    request: async (_, { record }) => {
      const res = await queryAppRoles({
        appId: record.id,
        params: { pageSize: 100 },
      });
      return res.data.map((v) => ({ label: v.title, value: v.id }));
    },
    params: (record) => ({ appId: record.id }),
    fieldProps: (_, { entity }) => {
      return {
        mode: 'multiple',
        labelInValue: true,
        defaultValue: entity.roles.map((v) => ({
          value: v.id,
          label: v.title,
        })),
      };
    },
  },
  {
    title: 'Actions',
    width: 110,
    valueType: 'option',
    render: (text, record, _, action) => (
      <Space>
        <Button
          size="small"
          icon={<EditOutlined />}
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          edit
        </Button>
      </Space>
    ),
  },
];

const UserItem = () => {
  const params = useParams();
  const userId = params.id;
  const { user } = useModel('useLayoutModel', (model) => model);

  return (
    <>
      <Card>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={user}
          autoComplete="off"
          onFinish={async (values) => {
            const result = await updateUser({
              userId: isNaN(userId) ? undefined : userId,
              ...values,
            });
            if (result.id) {
              message.success(`${isNaN(userId) ? 'Create' : 'Update'} success`);
              history.push(`/users/${result.id}`);
            }
          }}
        >
          <Form.Item
            label="User Name"
            name="user_name"
            rules={[{ required: true, message: 'Please input user name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item name="state" label="State">
            <Radio.Group>
              <Radio value="true">enabled</Radio>
              <Radio value="false">disabled</Radio>
              <Radio value="locked">locked</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirm_password"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    getFieldValue('password') &&
                    getFieldValue('password') != value
                  ) {
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" size="large" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {user.id && (
        <EditableProTable<AppItem>
          style={{ marginTop: 24 }}
          columns={columns}
          headerTitle="Apps"
          request={async (params) =>
            await queryUserAuthorizedApps(user.id, params)
          }
          rowKey="id"
          search={false}
          recordCreatorProps={false}
          pagination={false}
          dateFormatter="string"
          editable={{
            type: 'multiple',
            onSave: async (rowKey, record) => {
              await updateUserAuthorizedApps(
                user.id,
                record.id,
                record.roles.map((v) => v.id),
              );
            },
            actionRender: (
              row,
              { recordKey, form, onSave, cancelEditable },
            ) => [
              <Button
                key="save"
                size="small"
                onClick={() => {
                  const roles = form.getFieldValue([recordKey, 'roles']);
                  onSave(recordKey, {
                    ...row,
                    roles: roles
                      ? roles.map((v) => ({ id: v.value, title: v.label }))
                      : row.roles,
                  });
                }}
              >
                save
              </Button>,
              <Button
                key="cancel"
                size="small"
                onClick={() => {
                  cancelEditable(recordKey);
                }}
              >
                cancel
              </Button>,
            ],
          }}
        />
      )}
      <Divider>Apps</Divider>
      <Row gutter={[16, 16]}>
        {apps.map((v) => (
          <Col key={v.name} span={8}>
            <Card
              title={v.title}
              size="small"
              bordered={false}
              bodyStyle={{ minHeight: '100px' }}
              extra={
                <Space>
                  <Button size="small" type="primary" ghost>
                    Edit
                  </Button>
                  <Button size="small" danger>
                    Delete
                  </Button>
                </Space>
              }
            >
              {v.title}
            </Card>
          </Col>
        ))}
        <Col span={8}>
          <Card
            size="small"
            onClick={() => {
              console.log('add new app');
            }}
            hoverable
            bordered={false}
            bodyStyle={{
              textAlign: 'center',
              minHeight: 140,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button icon={<PlusOutlined />} size="large" block type="link" />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserItem;

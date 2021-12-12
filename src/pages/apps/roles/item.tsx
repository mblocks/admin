import { useModel, useParams, history } from 'umi';
import { Form, Input, Button, Card, message } from 'antd';
import { updateAppRole } from '@/services';

const AppRoleItem = () => {
  const params = useParams();
  const appId = params.id;
  const roleId = params.role_id;
  const { role, app, setLayoutModel } = useModel(
    'useLayoutModel',
    (model) => model,
  );
  const [form] = Form.useForm();
  role.auth = JSON.stringify(role.auth, null, 2);
  return (
    <Card style={{ padding: 48, maxWidth: 1140, margin: '0 auto 24px' }}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={role}
        onFinish={async (values) => {
          const result = await updateAppRole({
            ...values,
            auth: JSON.parse(values.auth),
            appId,
            id: isNaN(roleId) ? undefined : roleId,
          });
          if (result.id) {
            message.success(`${isNaN(roleId) ? 'Create' : 'Update'} success`);
            setLayoutModel({ app, role: result, loading: false });
            history.push(`/apps/${app.id}/roles/${result.id}`);
          }
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Auth" name="auth">
          <Input.TextArea rows={10} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" size="large" block htmlType="submit">
            {role.id ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AppRoleItem;

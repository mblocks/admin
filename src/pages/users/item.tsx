import { useState, useEffect } from 'react';
import { useParams, Link, history } from 'umi';
import { Card, message } from 'antd';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-form';
import { getUser, updateUser } from '@/services/users';
import { queryAppRoles } from '@/services/apps';

const itemRender = (route, _, routes) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  );
};

export default () => {
  const { user_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [form] = ProForm.useForm();
  useEffect(() => {
    !isNaN(user_id) &&
      getUser({ user_id }).then((res) => {
        setUser(res);
        res.roles = Object.assign(
          {},
          ...res.roles.map((item) => ({
            [item.name]: item.roles.map((vv) => ({
              value: vv.id,
              label: vv.title,
            })),
          })),
        );
        form.setFieldsValue(res);
      });
    queryAppRoles({}).then((res) => {
      setLoading(false);
      setRoles(res);
    });
  }, []);

  return (
    <PageContainer
      loading={loading}
      header={{
        title: isNaN(user_id) ? 'new user' : user.user_name,
        breadcrumb: {
          itemRender,
          routes: [
            {
              path: '/',
              breadcrumbName: 'admin',
            },
            {
              path: '/users',
              breadcrumbName: 'users',
            },
            {
              path: `/users/${user_id}`,
              breadcrumbName: isNaN(user_id) ? 'new user' : user.user_name,
            },
          ],
        },
      }}
      footer={[]}
    >
      <GridContent contentWidth="Fixed">
        <Card bordered={false} title="basic info">
          <ProForm
            form={form}
            submitter={{
              searchConfig: {
                submitText: 'Save',
              },
              render: (_, dom) => <div>{dom.pop()}</div>,
              submitButtonProps: {
                size: 'large',
                style: {},
              },
            }}
            onFinish={async (values) => {
              values.roles = Object.entries(values.roles).map(([k, v]) => ({
                [k]: v.map((vv) => ({ id: vv.value, title: vv.label })),
              }));
              const res = await updateUser(
                isNaN(user_id) ? values : { user_id, ...values },
              );
              if (res.response.status == 200) {
                message.success('success');
                setUser(res.data);
                if (isNaN(user_id)) {
                  history.push(`/users/${res.data.id}`);
                }
              }
            }}
          >
            <ProFormText
              width="md"
              name="user_name"
              label="user_name"
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <ProFormText
              width="md"
              name="email"
              label="email"
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <ProFormSwitch name="enabled" label="enabled" />
            {roles.map((item) => (
              <ProFormSelect
                key={item.name}
                mode="multiple"
                label={item.title}
                name={['roles', item.name]}
                fieldProps={{ labelInValue: true }}
                options={item.roles.map((v) => ({
                  label: v.title,
                  value: v.id,
                }))}
              />
            ))}
          </ProForm>
        </Card>
      </GridContent>
    </PageContainer>
  );
};

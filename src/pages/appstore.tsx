import { useState } from 'react';
import { Link, history } from 'umi';
import { List, Card, Button, Checkbox, Tabs } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormList,
} from '@ant-design/pro-form';
import { installApp } from '@/services/apps';
import { formatErrors } from '@/utils';

const itemRender = (route, _, routes) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  );
};

const data = [
  {
    name: 'photo',
    title: 'Photo',
    description: 'some words',
    services: [
      {
        name: 'main',
        image: 'main:latest',
        environment: [
          {
            name: 'DB_HOST',
            value: '127.0.0.1',
          },
        ],
      },
      {
        name: 'another',
        image: 'another:latest',
        environment: [],
      },
    ],
  },
  {
    name: 'album',
    title: 'Album',
    description: 'some words',
    services: [
      {
        name: 'main',
        image: 'main:latest',
        environment: [
          {
            name: 'DB_HOST',
            value: '127.0.0.1',
          },
        ],
      },
    ],
  },
  {
    name: 'title3',
    title: 'Title 3',
    description: 'some words',
    services: [
      {
        name: 'main',
        image: 'main:latest',
        environment: [
          {
            name: 'DB_HOST',
            value: '127.0.0.1',
          },
        ],
      },
    ],
  },
  {
    name: 'title4',
    title: 'Title 4',
    description: 'some words',
    services: [
      {
        name: 'main',
        image: 'main:latest',
        environment: [
          {
            name: 'DB_HOST',
            value: '127.0.0.1',
          },
        ],
      },
    ],
  },
  {
    name: 'title5',
    title: 'Title 5',
    description: 'some words',
    services: [
      {
        name: 'main',
        image: 'main:latest',
        environment: [
          {
            name: 'DB_HOST',
            value: '127.0.0.1',
          },
        ],
      },
    ],
  },
  {
    name: 'title6',
    title: 'Title 6',
    description: 'some words',
    services: [
      {
        name: 'main',
        image: 'main:latest',
        environment: [
          {
            name: 'DB_HOST',
            value: '127.0.0.1',
          },
        ],
      },
    ],
  },
];

export default () => {
  const [form] = ProForm.useForm();
  const [formVisible, setFormVisible] = useState(false);
  const [custom, setCustom] = useState(false);
  const [install, setInstall] = useState({ services: [] });
  return (
    <PageContainer
      header={{
        title: 'appstore',
        breadcrumb: {
          itemRender,
          routes: [
            {
              path: '/',
              breadcrumbName: 'admin',
            },
            {
              path: '/appstore',
              breadcrumbName: 'appstore',
            },
          ],
        },
      }}
      footer={[]}
    >
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 6,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              bordered={false}
              actions={[
                <Button
                  type="primary"
                  onClick={() => {
                    setFormVisible(true);
                    setInstall(item);
                    form.setFieldsValue({
                      ...item,
                      services: Object.assign(
                        {},
                        ...item.services.map((v) => ({ [v.name]: v })),
                      ),
                    });
                  }}
                >
                  Install
                </Button>,
              ]}
            >
              <Card.Meta
                title={item.title}
                description="This is the description"
              />
            </Card>
          </List.Item>
        )}
      />
      <ModalForm
        modalProps={{
          onCancel: () => setFormVisible(false),
          okText: 'Install',
          cancelText: <>Cancel</>,
        }}
        title={`Install ${install.title}`}
        form={form}
        visible={formVisible}
        onFinish={async (values) => {
          const res = await installApp({
            ...values,
            services: Object.entries(values.services).map(([k, v]) => ({
              ...v,
              name: k,
            })),
          });
          if (res.response.status == 200) {
            history.push(`/apps/${res.data.id}`);
          } else {
            setCustom(true);
            form.setFields?.(formatErrors(res.data));
          }
        }}
      >
        <ProFormText
          width="xl"
          name="title"
          label="title"
          rules={[{ required: true }]}
        />
        <ProForm.Item label="Custom">
          <Checkbox
            onChange={({ target }) => {
              setCustom(target.checked);
              if (!target.checked) {
                form.setFieldsValue({
                  ...install,
                  services: Object.assign(
                    {},
                    ...install.services.map((v) => ({ [v.name]: v })),
                  ),
                });
              }
            }}
          />
        </ProForm.Item>
        <ProFormText
          name="name"
          label="name"
          width="xl"
          rules={[{ required: true }]}
          hidden={!custom}
        />
        <Tabs defaultActiveKey="main" hidden={!custom}>
          {install.services.map((item) => (
            <Tabs.TabPane tab={item.name} key={item.name}>
              <ProFormText
                width="xl"
                name={['services', item.name, 'image']}
                label="image"
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <ProForm.Group style={{ minWidth: '400px' }}>
                <ProFormList
                  name={['services', item.name, 'environment']}
                  copyIconProps={false}
                  label="ENV"
                  creatorButtonProps={{
                    position: 'bottom',
                  }}
                >
                  <ProForm.Group>
                    <ProFormText
                      name="name"
                      label="name"
                      rules={[{ required: true }]}
                    />
                    <ProFormText
                      name="value"
                      label="value"
                      rules={[{ required: true }]}
                    />
                  </ProForm.Group>
                </ProFormList>
              </ProForm.Group>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </ModalForm>
    </PageContainer>
  );
};

import { useState } from 'react';
import { history } from 'umi';
import { Badge, Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import {
  PlusOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { queryUsers, deleteUser } from '@/services/users';

export default () => {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Username',
      dataIndex: 'user_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInSearch: true,
      width: 200,
      render: (_, item) => (
        <Badge
          color={item.enabled ? 'green' : 'red'}
          text={item.enabled ? 'enabled' : 'disabled'}
        />
      ),
    },
    {
      title: 'Actions',
      valueType: 'option',
      width: 160,
      render: (text, record) => [
        <Button
          key="settings"
          size="small"
          icon={<SettingOutlined />}
          onClick={() => history.push(`/users/${record.id}`)}
        >
          Setting
        </Button>,
        <Popconfirm
          key="delete"
          title="Are you sure？"
          onConfirm={async () => {
            const res = await deleteUser({ user_id: record.id });
            if (res.response.status == 200) {
              setData([...data.filter((v) => v.id != record.id)]);
            } else {
            }
          }}
        >
          <Button size="small" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <div>
      <ProTable
        columns={columns}
        dataSource={data}
        request={async (params = {}, sort, filter) => {
          const res = await queryUsers({ params });
          setData(res.data);
          return res;
        }}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push('/users/new')}
          >
            {' '}
            Create
          </Button>,
        ]}
      />
    </div>
  );
};

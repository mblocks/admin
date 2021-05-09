import { useState } from 'react';
import { Link, history } from 'umi';
import { Badge, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { queryUsers } from '@/services/users';

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
    render: (text, record) => [
      <Link key="settings" to="/users/1">
        Settings
      </Link>,
    ],
  },
];

export default () => {
  const [data, setData] = useState([]);

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

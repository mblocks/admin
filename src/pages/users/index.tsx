import React from 'react';
import { Link, history } from 'umi';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { queryUsers } from '@/services';

type UserItem = {
  id: number;
  user_name: string;
  display_name: string;
  email: string;
  state: string;
  created_at: string;
  updated_at: string;
};

const columns: ProColumns<UserItem>[] = [
  {
    title: 'User Name',
    dataIndex: 'user_name',
    ellipsis: true,
  },
  {
    title: 'Display Name',
    dataIndex: 'display_name',
    ellipsis: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    ellipsis: true,
  },
  {
    title: 'State',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },

  {
    title: 'created time',
    key: 'created_at',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: 'updated time',
    key: 'updated_at',
    dataIndex: 'updated_at',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    width: 110,
    render: (_, record) => (
      <Link to={`/users/${record.id}`}>
        <Button icon={<SettingOutlined />}>Setting</Button>
      </Link>
    ),
  },
];

const UsersIndex = () => {
  return (
    <ProTable<UserItem>
      columns={columns}
      request={async (params) => await queryUsers({ params })}
      rowKey="id"
      search={{ labelWidth: 'auto' }}
      dateFormatter="string"
      toolBarRender={() => [
        <Button
          key="create-new"
          onClick={() => history.push('/users/create')}
          icon={<PlusOutlined />}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  );
};
export default UsersIndex;

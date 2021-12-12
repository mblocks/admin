import React from 'react';
import { Link, history, useParams } from 'umi';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { queryAppRoles } from '@/services';

type AppRoleItem = {
  id: number;
  title: string;
  desc: string;
  state: string;
  created_at: string;
  updated_at: string;
};

const AppRoles: React.FC<{}> = () => {
  const params = useParams();
  const appId = params.id;

  const columns: ProColumns<AppRoleItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'desc',
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
      title: 'Created time',
      key: 'created_at',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: 'Updated time',
      key: 'updated_at',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      width: 110,
      render: (_, record) => (
        <Link to={`/apps/${appId}/roles/${record.id}`}>
          <Button icon={<SettingOutlined />}>Setting</Button>
        </Link>
      ),
    },
  ];
  return (
    <ProTable<AppRoleItem>
      columns={columns}
      request={async (params) => await queryAppRoles({ appId, params })}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      toolBarRender={() => [
        <Button
          key="create-new"
          onClick={() => history.push(`/apps/${appId}/roles/create`)}
          icon={<PlusOutlined />}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  );
};
export default AppRoles;

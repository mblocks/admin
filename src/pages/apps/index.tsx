import React from 'react';
import { Link, history } from 'umi';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { queryApps } from '@/services';

type AppItem = {
  id: number;
  name: string;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  created_at: string;
  updated_at: string;
};

const columns: ProColumns<AppItem>[] = [
  {
    title: 'name',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: 'title',
    dataIndex: 'title',
    ellipsis: true,
  },
  {
    title: 'Ingress',
    dataIndex: 'ingress',
    hideInSearch: true,
    render: (value) => {
      if (!value) {
        return '';
      }
      return (
        <Space direction="vertical">
          {value.map((item, index) => (
            <a key={`ingress-${index}`} href={item.path}>
              {item.path}
            </a>
          ))}
        </Space>
      );
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    render: (_, record) => {
      return (
        <Space>
          {record.container && record.container.status}
          {record.depends.length > 0 && <>depends:</>}
        </Space>
      );
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
    dataIndex: 'id',
    width: 110,
    render: (_, record) => (
      <Link to={`/apps/${record.id}`}>
        <Button icon={<SettingOutlined />}>Setting</Button>
      </Link>
    ),
  },
];

const AppsIndex = () => {
  return (
    <ProTable<AppItem>
      columns={columns}
      request={async (params) => await queryApps({ params })}
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
          onClick={() => history.push('/apps/create')}
          icon={<PlusOutlined />}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  );
};
export default AppsIndex;

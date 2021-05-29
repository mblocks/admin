import { Link, history } from 'umi';
import { Badge, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { queryApps } from '@/services/apps';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Status',
    dataIndex: 'services',
    hideInSearch: true,
    render: (services, record) => (
      <div>
        {services.map((item) => {
          return (
            <div key={item.id}>
              <Badge color="green" text={item.name} />
            </div>
          );
        })}
      </div>
    ),
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record) => [
      <Link key="settings" to="/apps/1">
        Settings
      </Link>,
    ],
  },
];

export default () => {
  return (
    <div>
      <ProTable
        columns={columns}
        data={[]}
        request={async (params = {}, sort, filter) => {
          return queryApps({ params });
        }}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="create"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => history.push('/appstore')}
          >
            Create
          </Button>,
        ]}
      />
    </div>
  );
};

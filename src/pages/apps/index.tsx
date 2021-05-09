import { Link } from 'umi';
import { Badge } from 'antd';
import ProTable from '@ant-design/pro-table';
import { queryApps } from '@/services/apps';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Path',
    dataIndex: 'path',
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
              <Badge color="green" text={item.title} />
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
      />
    </div>
  );
};
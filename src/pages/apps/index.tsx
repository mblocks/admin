import { history } from 'umi';
import { Badge, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
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
    title: 'Actions',
    valueType: 'option',
    width: 100,
    render: (text, record) => [
      <Button
        key="settings"
        size="small"
        icon={<SettingOutlined />}
        onClick={() => history.push(`/apps/${record.id}`)}
      >
        Setting
      </Button>,
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

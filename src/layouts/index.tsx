import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

export default ({ children, location }) => {
  return (
    <PageContainer
      title="Admin"
      tabList={[
        {
          tab: 'Apps',
          key: '/apps',
        },
        {
          tab: 'Users',
          key: '/users',
        },
      ]}
      tabActiveKey={location.pathname}
      onTabChange={(key) => history.push(key)}
      footer={[]}
    >
      {children}
    </PageContainer>
  );
};

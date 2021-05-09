import { useState, useEffect } from 'react';
import { useParams, history, Link } from 'umi';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import { getApp } from '@/services/apps';

const itemRender = (route, _, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  );
};

export default ({ children, location }) => {
  const params = useParams();
  const { app_id } = params;
  const [app, setApp] = useState({ title: '', name: '', app: '' });
  useEffect(() => {
    getApp({ id: app_id }).then((res) => setApp(res));
  }, []);

  return (
    <PageContainer
      tabActiveKey={location.pathname}
      tabList={[
        {
          tab: 'Overview',
          key: `/apps/${app_id}`,
        },
        {
          tab: 'Roles',
          key: `/apps/${app_id}/roles`,
        },
      ]}
      onTabChange={(key) => history.push(key)}
      header={{
        title: app.title,
        breadcrumb: {
          itemRender,
          routes: [
            {
              path: '/',
              breadcrumbName: 'admin',
            },
            {
              path: '/apps',
              breadcrumbName: 'apps',
            },
            {
              path: '',
              breadcrumbName: app.title,
            },
          ],
        },
      }}
      footer={[]}
    >
      <GridContent contentWidth="Fixed">{children}</GridContent>
    </PageContainer>
  );
};

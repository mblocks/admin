import React from 'react';
import { Link, history, useLocation } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

const tabList = {
  '/apps': { title: 'Apps', path: '/apps', breadcrumbName: 'Apps' },
  '/users': { title: 'Users', path: '/users', breadcrumbName: 'Users' },
  '/templates': {
    title: 'Templates',
    path: '/templates',
    breadcrumbName: 'Templates',
  },
};
const itemRender = (route, _, routes) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  );
};

const layoutsIndex: React.FC<{}> = ({ children }) => {
  const location = useLocation();
  const routes = [{ path: '/', breadcrumbName: 'Admin' }];
  if (tabList[location.pathname]) {
    routes.push(tabList[location.pathname]);
  }
  return (
    <PageContainer
      fixedHeader
      header={{
        title: 'Admin',
        breadcrumb: {
          itemRender,
          routes,
        },
      }}
      tabList={Object.values(tabList).map((v) => ({
        tab: v.title,
        key: v.path,
      }))}
      tabActiveKey={location.pathname}
      onTabChange={(key) => {
        history.push(key);
      }}
    >
      {children}
    </PageContainer>
  );
};
export default layoutsIndex;
export { itemRender };

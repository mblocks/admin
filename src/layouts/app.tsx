import React, { useEffect } from 'react';
import { history, useParams, useLocation, useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getApp, getAppRole, getTemplate } from '@/services';
import { itemRender } from './index';

const LayoutApp: React.FC<{}> = ({ children }) => {
  const params = useParams();
  const location = useLocation();
  const appId = params.id;
  const roleId = params.role_id;
  const { template } = location.query;
  const { app, role, loading, setLayoutModel } = useModel(
    'useLayoutModel',
    (model) => model,
  );
  const routes = [
    {
      path: '/',
      breadcrumbName: 'Admin',
    },
    {
      path: '/apps',
      breadcrumbName: 'Apps',
    },
  ];
  routes.push({
    path: `/apps/${appId}`,
    breadcrumbName: isNaN(appId) ? 'Create' : app.title || app.name,
  });
  if (roleId) {
    routes.push({
      path: `/apps/${appId}/roles`,
      breadcrumbName: 'Roles',
    });
    routes.push({
      path: `/apps/${appId}/roles/${roleId}`,
      breadcrumbName: isNaN(roleId) ? 'Create' : role.title,
    });
  }

  useEffect(() => {
    setLayoutModel({ loading: true });
    if (isNaN(appId)) {
      if (template) {
        getTemplate(template).then((fetchTemplate) => {
          setLayoutModel({ app: fetchTemplate, role: {}, loading: false });
        });
        return;
      }
      //fix from exist app click url to create new app,but app value is exist app value
      new Promise(() => {
        setTimeout(() => {
          setLayoutModel({ loading: false });
        }, 200);
      });
      return;
    }
    getApp({ id: appId }).then((fetchApp) => {
      if (!isNaN(roleId)) {
        getAppRole({ appId, id: roleId }).then((fetchRole) => {
          setLayoutModel({ app: fetchApp, role: fetchRole, loading: false });
        });
      } else {
        setLayoutModel({ app: fetchApp, role: {}, loading: false });
      }
    });
  }, []);

  return (
    <PageContainer
      loading={loading}
      fixedHeader
      header={{
        title: roleId
          ? role.id
            ? role.title
            : 'Create a role'
          : app.id
          ? app.title || app.name
          : 'Create a app',
        breadcrumb: { itemRender, routes },
      }}
      tabList={
        !app.id || roleId
          ? []
          : [
              { tab: 'Setting', key: `/apps/${appId}` },
              { tab: 'Roles', key: `/apps/${appId}/roles` },
            ]
      }
      tabActiveKey={location.pathname}
      onTabChange={(key) => history.push(key)}
    >
      <div style={{ marginBottom: 24 }}>{children}</div>
    </PageContainer>
  );
};
export default LayoutApp;

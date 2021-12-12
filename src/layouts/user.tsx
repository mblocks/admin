import React, { useEffect } from 'react';
import { useParams, useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getUser } from '@/services';
import { itemRender } from './index';

const LayoutUser: React.FC<{}> = ({ children }) => {
  const params = useParams();
  const userId = params.id;
  const { user, loading, setLayoutModel } = useModel(
    'useLayoutModel',
    (model) => model,
  );
  const routes = [
    {
      path: '/',
      breadcrumbName: 'Admin',
    },
    {
      path: '/users',
      breadcrumbName: 'Users',
    },
    {
      path: `/users/${userId}`,
      breadcrumbName: isNaN(userId) ? 'Create' : user.user_name,
    },
  ];
  useEffect(() => {
    setLayoutModel({ loading: true });
    if (isNaN(userId)) {
      //fix from exist user click url to create new user,but user value is exist user value
      new Promise(() => {
        setTimeout(() => {
          setLayoutModel({ loading: false });
        }, 200);
      });
      return;
    }
    getUser({ userId }).then((res) =>
      setLayoutModel({ user: res, loading: false }),
    );
  }, []);
  return (
    <PageContainer
      fixedHeader
      loading={loading}
      header={{
        title: isNaN(userId) ? 'Create a user' : user.user_name,
        breadcrumb: { itemRender, routes },
      }}
    >
      <div style={{ marginBottom: 24, maxWidth: 1140, margin: '24px auto' }}>
        {children}
      </div>
    </PageContainer>
  );
};
export default LayoutUser;

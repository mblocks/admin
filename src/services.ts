import { request } from 'umi';

export async function queryApps({ params }): Promise<any> {
  const { pageSize, ...rest } = params;
  return request('/api/admin/apps', {
    params: { ...rest, page_size: pageSize },
  });
}

export async function getApp({ id }): Promise<any> {
  const result = await request('/api/admin/apps', {
    params: { id },
  });
  return result.data.pop();
}

export async function deployApp(data): Promise<any> {
  const result = await request(
    '/api/admin/apps' +
      (data.parent ? `/${data.parent}/depends` : '') +
      (data.id ? '/' + data.id : ''),
    {
      method: 'POST',
      data,
    },
  );
  return result;
}

export async function deleteApp(data): Promise<any> {
  const result = await request(
    '/api/admin/apps/' +
      (data.parent ? `${data.parent}/depends/${data.id}` : data.id) +
      '/delete',
    {
      method: 'POST',
      data,
    },
  );
  return result;
}

export async function queryAppRoles({ appId, params }): Promise<any> {
  const { pageSize, ...rest } = params;
  return request(`/api/admin/apps/${appId}/roles`, {
    params: { ...rest, page_size: pageSize },
  });
}

export async function getAppRole({ appId, id }): Promise<any> {
  const result = await request(`/api/admin/apps/${appId}/roles`, {
    params: { id },
  });
  return result.data.pop();
}

export async function updateAppRole({ appId, ...data }): Promise<any> {
  const result = await request(
    `/api/admin/apps/${appId}/roles${data.id ? '/' + data.id : ''}`,
    {
      method: 'POST',
      data,
    },
  );
  return result;
}

export async function queryUsers({ params }): Promise<any> {
  const { pageSize, ...rest } = params;
  return request('/api/admin/users', {
    params: { ...rest, page_size: pageSize },
  });
}

export async function getUser({ userId }): Promise<any> {
  return await request(`/api/admin/users/${userId}`);
}

export async function updateUser({ userId, ...data }): Promise<any> {
  const result = await request(
    `/api/admin/users${userId ? '/' + userId : ''}`,
    {
      method: 'POST',
      data,
    },
  );
  return result;
}

export async function queryUserAuthorizedApps(
  userId: string,
  params,
): Promise<any> {
  const res = await request(`/api/admin/users/${userId}/authorized/apps`, {
    params: { ...params, ignore: true },
  });
  return { data: res, total: res.length };
}

export async function updateUserAuthorizedApps(
  userId: string,
  appId: string,
  roles: string[],
): Promise<any> {
  const res = await request(
    `/api/admin/users/${userId}/authorized/apps/${appId}`,
    { method: 'POST', data: roles },
  );
  return res;
}

import { request } from 'umi';

export async function queryApps({ params }): Promise<any> {
  return request('/api/admin/apps', { params });
}

export async function getApp({ id }): Promise<any> {
  return request(`/api/admin/apps/${id}`);
}

export async function updateApp({ id, ...data }): Promise<any> {
  return request(`/api/admin/apps/${id}`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function queryRoles({ app_id, params }): Promise<any> {
  return request(
    app_id ? `/api/admin/apps/${app_id}/roles` : `/api/admin/apps/roles`,
    { params },
  );
}

export async function setRole({ app_id, id, ...data }): Promise<any> {
  return request(`/api/admin/apps/${app_id}/roles${id ? '/' + id : ''}`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function setService({ app_id, id, ...data }): Promise<any> {
  return request(`/api/admin/apps/${app_id}/services${id ? '/' + id : ''}`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function installApp(data): Promise<any> {
  return request(`/api/admin/apps/`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

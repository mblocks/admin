import { request } from 'umi';

export async function queryApps({ params }): Promise<any> {
  return request('/api/admin/apps', { params });
}

export async function getApp({ id }): Promise<any> {
  return request(`/api/admin/apps/${id}`);
}

export async function getAppOverview({ id }): Promise<any> {
  return request(`/api/admin/apps/${id}/overview`);
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

export async function queryAppRoles({ app_id, params }): Promise<any> {
  return request(
    app_id ? `/api/admin/apps/${app_id}/roles` : `/api/admin/apps/roles`,
    { params },
  );
}

export async function updateAppRole({ app_id, id, ...data }): Promise<any> {
  return request(`/api/admin/apps/${app_id}/roles${id ? '/' + id : ''}`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function deleteAppRole({ app_id, id, ...data }): Promise<any> {
  return request(`/api/admin/apps/${app_id}/roles/${id}/delete`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function updateAppService({ app_id, id, ...data }): Promise<any> {
  return request(`/api/admin/apps/${app_id}/services${id ? '/' + id : ''}`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function deleteAppservice({ app_id, id, ...data }): Promise<any> {
  return request(`/api/admin/apps/${app_id}/services/${id}/delete`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function installApp(data): Promise<any> {
  return request(`/api/admin/apps`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

import { request } from 'umi';

export async function queryUsers({ params }): Promise<any> {
  return request('/api/admin/users', { params });
}

export async function getUser({ user_id }): Promise<any> {
  return request(`/api/admin/users/${user_id}`);
}

export async function updateUser({ user_id, ...data }): Promise<any> {
  return request(`/api/admin/users${isNaN(user_id) ? '' : '/' + user_id}`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function deleteUser({ user_id }): Promise<any> {
  return request(`/api/admin/users/${user_id}/delete`, {
    method: 'post',
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

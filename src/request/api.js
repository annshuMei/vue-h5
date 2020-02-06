/**
 *
 * api接口管理
 */
import { get, post } from './http';

export const apiAddress = (params) =>
  post('api/v1/users/my_address/address_edit_before', params); // 示例接口

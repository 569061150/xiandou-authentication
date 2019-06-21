import axios from '@/config/ajax'
import envConfig from '@/config/env';


//console.log('请求的接口为:' + baseUrl);

/**
 * @description 发送请求获取接口数据
 */

export const getInfo = () => axios.get(baseUrl + 'info/html'); //获取订单信息
export const updateInfo = data => axios.post(baseUrl + 'info/html', data); //更新订单信息
export const updateState = data => axios.post(baseUrl + 'state/html', data); //更新订单状态


export const login = (data) => axios.post('http://v.juhe.cn/certificates/typeList.php', data); //更新订单状态
export const getEquipmentDate = (data) => axios.post('/', data); //更新订单状态

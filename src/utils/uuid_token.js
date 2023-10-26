import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    // 先从本地存储获取uuid(看是否已经存在)
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 如果没有则生成
    if (!uuid_token) {
        uuid_token = uuidv4();
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return uuid_token;
}
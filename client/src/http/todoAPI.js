import { $authHost } from "./index";

export const getAll = async () => {
    const { data } = await $authHost.get('/api/todo/all');
    return data;
};

export const createTodo = async (title) => {
    const {data} = await $authHost.post('api/todo/create', {title});
    return data;
}

export const delTodo = async (id) => {
    const { data } = await $authHost.delete(`/api/todo/${id}`);
    return data;
};
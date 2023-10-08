import { axiosApi } from '../api/axiosApi';

const getBlogsWithAxios = await axiosApi.get('/blogs');


export default getBlogsWithAxios;
import * as axios from 'axios';

const axiosInstance = axios.create()

export const repoAPI = {
    getRepositoriesAPI(request, currentPage=1){
        return axiosInstance.get(`https://api.github.com/search/repositories?q=${request}&sort=stars&page=${currentPage}`)
            .then(response => response.data);
    },
    getLanguagesAndContributors(request){
        return axiosInstance.get(`${request}`)
    }
}

import { repoAPI } from "../API/API"
const SET_REPO = 'SET_REPO';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_SELECTED_REPOSITORY = 'SET_SELECTED_REPOSITORY';
const SET_CONTRIBUTORS = 'SET_CONTRIBUTORS';
const SET_LANGUAGES = 'SET_LANGUAGES';
const SET_FETTCHING = 'SET_FETTCHING';

let initialState = {
    repositoriesList: [],
    totalItemsCount: 0,
    currentPage: 1,
    searchInput: '',
    selectedRepository: null,
    isLoading: false
}

let repositoriesReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_REPO:
            return{
                ...state,
                repositoriesList: action.repo
            }
        case SET_TOTAL_COUNT:
            return{
                ...state,
                totalItemsCount: action.totalCount
            }
        case UPDATE_INPUT_VALUE:
            return{
                ...state,
                searchInput: action.value
            }
        case SET_CURRENT_PAGE:
            return{
                ...state,
                currentPage: action.page
            }
        case SET_SELECTED_REPOSITORY:
            let repositoriesList = [...state.repositoriesList];
            for(var i = 0; i < repositoriesList.length; i++){
                if(action.id == repositoriesList[i].id){
                    return{
                        ...state,
                        selectedRepository: {...repositoriesList[i]}
                    } 
                } else if(!action.id){
                    return{
                        ...state,
                        selectedRepository: null
                    } 
                }
            }
        case SET_CONTRIBUTORS:
            return{
                ...state,
                selectedRepository: {...state.selectedRepository, contributors: action.contributors}
            }
        case SET_LANGUAGES:
            return{
                ...state,
                selectedRepository: {...state.selectedRepository, languages: action.languages}
            }
        case SET_FETTCHING:
            return{
                ...state,
                isLoading: action.loading
            }
            
        default: 
            return state
    }
}
export const setRepo = (repo) =>{
    return{
        type: SET_REPO,
        repo
    }
}
export const setTotalCount = (totalCount) =>{
    return{
        type: SET_TOTAL_COUNT,
        totalCount
    }
}
export const updateInputValue = (value) => {
    return{
        type: UPDATE_INPUT_VALUE,
        value
    }
}
export const setCurrentPage = (page) => {
    return{
        type: SET_CURRENT_PAGE,
        page
    }
}
export const setSelectedRepository = (id) => {
    return{
        type: SET_SELECTED_REPOSITORY,
        id
    }
}
export const setContributors = (contributors) => {
    return{
        type: SET_CONTRIBUTORS,
        contributors
    }
}
export const setLanguages = (languages) => {
    return{
        type: SET_LANGUAGES,
        languages
    }
}
export const setLoading = (loading) =>{
    return{
        type: SET_FETTCHING,
        loading
    }
}




export const getRepositories = (request, page) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let data = await repoAPI.getRepositoriesAPI(request, page);
        dispatch(setRepo(data.items));
        dispatch(setTotalCount(data.total_count));
        dispatch(setCurrentPage(page))
        dispatch(setSelectedRepository(null))
        dispatch(setLoading(false));
    }      
} 
export const getContributors = (contributors) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let data = await repoAPI.getLanguagesAndContributors(contributors);
        dispatch(setContributors(data.data.slice(0, 10)));
        dispatch(setLoading(false));
    }      
} 
export const getLanguages = (languages) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let data = await repoAPI.getLanguagesAndContributors(languages);
        dispatch(setLanguages(Object.keys(data.data)));
        dispatch(setLoading(false));
    }      
} 




export default repositoriesReducer;
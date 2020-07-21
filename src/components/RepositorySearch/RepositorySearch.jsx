import React from 'react';
import { connect } from 'react-redux';
import { getRepositories, updateInputValue } from '../../redux/repositories-reducer';
import { NavLink } from 'react-router-dom';
import style from './RepositorySearch.module.css'

class RepositorySearch extends React.Component{
    constructor(props){
        super(props);
        this.searchRef = React.createRef()
    }

    onSearchInputChange = () =>{
        let text = this.searchRef.current.value;
        this.props.updateInputValue(text);
    }

    searchRepositories = () => {
        this.props.getRepositories(this.props.searchInput, this.props.currentPage);
    }

    render(){
        return (
            <div className={style.search} style={{textAlign: 'center'}}>
                    <input className={style.searchInput} type="text" ref={this.searchRef} value={this.props.searchInput} 
                        onChange={this.onSearchInputChange}
                        placeholder='Enter keywords'/>
                        
                    <NavLink to='/repository-list'><button className={style.searchButton} onClick={this.searchRepositories}>Search</button></NavLink> 
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        searchInput:  state.repositoriesPage.searchInput,
        currentPage:  state.repositoriesPage.currentPage,
    }
}

const RepositorySearchContainer = connect(mapStateToProps,{
    getRepositories,updateInputValue
})(RepositorySearch);

export default RepositorySearchContainer;
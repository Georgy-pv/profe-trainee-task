import React from 'react';
import { connect } from 'react-redux';
import { getRepositories, setSelectedRepository } from '../../redux/repositories-reducer';
import Repository from './Repository';
import Paginator from '../common/Paginator/Paginator';
import Preloader from '../common/Preloader/Preloader';

class MainPage extends React.Component{
    constructor(props){
        super(props);
    }

    onPageChanged = (pageNumber) => {
        this.props.getRepositories(this.props.searchInput, pageNumber);
    }

    render(){
        if (this.props.isLoading) {
            return <Preloader />
        }
        return (
            <div className="repositories" style={{textAlign: 'center'}}>
                    <Paginator totalItemsCount={this.props.totalItemsCount} 
                        currentPage={this.props.currentPage} 
                        searchInput={this.props.searchInput}
                        onPageChanged={this.onPageChanged} 
                        portionSize = {10}/>
                    {this.props.repositoriesList.map(rep => <Repository setSelectedRepository={this.props.setSelectedRepository} key={rep.id} repo={rep} />)}
                   
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        repositoriesList: state.repositoriesPage.repositoriesList,
        searchInput:  state.repositoriesPage.searchInput,
        totalItemsCount:  state.repositoriesPage.totalItemsCount,
        currentPage:  state.repositoriesPage.currentPage,
        isLoading:  state.repositoriesPage.isLoading,
    }
}

const MainPageContainer = connect(mapStateToProps,{
    getRepositories, setSelectedRepository
})(MainPage);

export default MainPageContainer;
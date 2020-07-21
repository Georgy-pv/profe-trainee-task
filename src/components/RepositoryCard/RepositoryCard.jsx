import React from 'react';

import { connect } from 'react-redux';
import { getContributors, getLanguages } from '../../redux/repositories-reducer';
import Preloader from '../common/Preloader/Preloader';
import { Redirect } from 'react-router-dom';
import style from './RepositoryCard.module.css'

const Contributors = ({contributor}) => {
    return (
        <div className={style.contributorItem}>
            <img className={style.contributorAvatar} src={contributor.avatar_url} alt=""/>
            <div>
                <div className={style.contributorLogin}>Login: {contributor.login}</div>
                <div className={style.contributorCount}>Contributions:{contributor.contributions}</div>
            </div>
        </div>
    );
}

class RepositoryCard extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    componentDidMount() {
        this.props.getLanguages(this.props.selectedRepository.languages_url);
        this.props.getContributors(this.props.selectedRepository.contributors_url);

    }
    render() {
        if (this.props.selectedRepository === null) {
            return <Redirect to={"/repository-list"} />
        }
        while (!this.props.selectedRepository.languages || !this.props.selectedRepository.contributors) {
            return <Preloader />
        }
        return (
            <div className={style.card}>
                <div className={style.gitInfo}>
                    <div className={style.avatar}>
                        <img src={this.props.selectedRepository.owner.avatar_url} alt="" />
                    </div>
                    <div className={style.infoInner}>
                        <div className={style.information}><span>Login:</span> <a href={this.props.selectedRepository.owner.html_url}>{this.props.selectedRepository.owner.login}</a></div>
                        <div className={style.information}><span>Repository name:</span> {this.props.selectedRepository.name}</div>
                        <div className={style.information}><span>Stars:</span> {this.props.selectedRepository.stargazers_count}</div>
                        <div className={style.information}><span>Last commit:</span> {this.props.selectedRepository.pushed_at.replace('T', ' ').replace('Z', '')}</div>
                        <div className={style.information}><span>Description:</span> {this.props.selectedRepository.description}</div>
                        <div className={style.information}><span>Languages:</span> {this.props.selectedRepository.languages.map(l => <div key={l.id}>{l} </div>)}</div>
                        
                    </div>
                    <div className={style.contributorsList}>TOP 10 contributors: {this.props.selectedRepository.contributors.map(c => <Contributors key={c.id} contributor={c} />)}</div>
                </div>

                
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        selectedRepository: state.repositoriesPage.selectedRepository,
        isLoading: state.repositoriesPage.isLoading,
    }
}

let RepositoryCardContainer = connect(mapStateToProps, { getContributors, getLanguages })(RepositoryCard)


export default RepositoryCardContainer;
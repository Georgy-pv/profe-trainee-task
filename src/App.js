import React from 'react';
import './App.css';
import { compose } from 'redux';
import { withRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header/Header';
import store from './redux/store';
import MainPageContainer from './components/MainPage/MainPageContainer';
import RepositoryCard from './components/RepositoryCard/RepositoryCard';
import RepositorySearchContainer from './components/RepositorySearch/RepositorySearch';

class App extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                <Header />
                <RepositorySearchContainer/>
                
                <Switch>
                    
                    <Route path="/repository-card/:repoId?" render={() => <RepositoryCard />} />
                    <Route path="/repository-list" render={() => <MainPageContainer />} />
                    
                </Switch>
            </div>
        );
    }
}

let AppContainer = compose(
    withRouter
)(App);

const MainApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>

                <AppContainer />

            </Provider>
        </BrowserRouter>
    );
}

export default MainApp;



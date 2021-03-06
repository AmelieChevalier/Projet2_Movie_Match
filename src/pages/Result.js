import React from 'react';
import MovieLists from '../components/MovieLists';
import HeaderSmall from '../components/HeaderSmall';
import '../styles/Result.css';
import Drawer from '../components/Drawer';
import { Link } from 'react-router-dom';
import defaultImage from '../images/grey-logo.png';
import ResultHistory from '../components/ResultHistory';
import SideBarInfoDesktop from '../components/SidebarInfoDesktop';
import Button from '../components/Button.js';
import TrendList from '../components/TrendList';

class Result extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      getInfo: false,
      matchList: this.props.matchList,
      filmId: null,
      renderedDrawer: false,
      previousFilmId: null
    };
  }

  closeDrawer = () => {
    this.setState({ getInfo: false });
    document.getElementById('drawer-movie-all-info-container').scrollTo(0, 0);
    document.body.classList.remove('js-no-scroll');
  };

  handleGetDrawer = (e) => {
    this.setState({ filmId: e.target.id, getInfo: true, renderedDrawer: true });
    document.body.classList.add('js-no-scroll');
  };

  render () {
    const item = this.props.currentList;
    return (
      <div className='result'>
        {this.state.matchList.length === 0 ? (
          <>
            <ResultHistory
              apiList={this.props.apiList}
              user1List={this.props.user1List}
              user2List={this.props.user2List}
              matchList={this.state.matchList}
            />
            <div className='centered'>
              <HeaderSmall resetAppState={this.props.resetAppState} />
              <h2 className='subtitle'>Oh non, vous n’avez aucun match !</h2>
              {
                Object.keys(this.props.currentList).length !== 0 ? (
                  <>
                    <p>Continuez d'explorer la liste : {item.caption}</p>
                    <Link to={item.link}>
                      <Button
                        className='button continue-list'
                        content='Go !'
                      />
                    </Link>
                  </>
                ) : (
                  <p>Choisissez une nouvelle liste</p>
                )
              }
            </div>
            <TrendList />
            <MovieLists type='genres' getCurrentList={this.props.getCurrentList} />
            <MovieLists type='people' getCurrentList={this.props.getCurrentList} />
            <MovieLists type='decades' getCurrentList={this.props.getCurrentList} />
          </>
        ) : (
          <>
            <ResultHistory
              apiList={this.props.apiList}
              user1List={this.props.user1List}
              user2List={this.props.user2List}
              matchList={this.state.matchList}
              user1={this.props.user1}
              user2={this.props.user2}
            />
            <div className='centered'>
              <HeaderSmall resetAppState={this.props.resetAppState} />
              <h2 className='title'>
                <span className='result-match-stars' />
                {this.state.matchList.length === 1
                  ? 'Vous avez 1 match !'
                  : `Vous avez ${this.state.matchList.length} matchs !`}
                <span className='result-match-stars' />
              </h2>
              <div className='matched-movie-container'>
                {this.state.matchList.map((film) => {
                  return (
                    <div className='matched-movie' style={film.poster_path ? { backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(http://image.tmdb.org/t/p/w342/${film.poster_path})` } : { backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(${defaultImage})` }} key={film.id} id={film.id} onClick={this.handleGetDrawer} />
                  );
                })}
              </div>
              <div className='button-back-home-container'>
                <Link to='/'><Button className='button back-home' content="Retour à la page d'accueil" onClick={() => this.props.resetAppState()} /></Link>
              </div>
              {this.state.renderedDrawer && <Drawer matchList={this.state.matchList} getInfo={this.state.getInfo} handleCloseDrawer={this.closeDrawer} filmId={this.state.filmId} />}
            </div>
            {this.state.filmId === null ? (<div className='empty-sidebar-info-desktop'><h3>Cliquez sur un film pour obtenir davantage d'informations</h3></div>) : <SideBarInfoDesktop matchList={this.state.matchList} getInfo={this.state.getInfo} filmId={this.state.filmId} />}
          </>
        )}
      </div>
    );
  }
}

export default Result;

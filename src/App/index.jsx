import { useReducer, useCallback, useEffect } from 'react';
import { fetchData } from '@utils/api';
import { MENS } from '@constants/sports';
import { ACTIONS } from './actions';
import { rankingsReducer } from './reducers';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import MatchModal from './components/MatchModal';
import './App.css';
import Stack from '@mui/material/Stack';

const initialState = {
  initialRankings: null,
  rankings: null,
  matches: null,
  initialMatches: null,
  isError: null,
  isLoading: true,
  selectedMatch: null,
  sport: MENS,
};

// function cacheReducer(state, { type, payload }) {
//   switch (type) {
//     case 'ADD_SPORT_DATA': {
//       return { ...state, [payload.sport]: payload.data };
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${type}`)
//     }
//   }
// }

export default function App() {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { rankings, matches, selectedMatch, isLoading, isError, sport } = state;
  const teams = rankings?.entries?.map(entry => entry.team);

  const openModal = match => dispatch({ type: ACTIONS.OPEN_MODAL, payload: { match } });
  const closeModal = () => dispatch({ type: ACTIONS.CLOSE_MODAL });
  const removeMatch = matchId => dispatch({ type: ACTIONS.REMOVE_MATCH, payload: { matchId } });
  const clearMatches = () => dispatch({ type: ACTIONS.CLEAR_MATCHES });
  const resetMatches = () => dispatch({ type: ACTIONS.RESET_MATCHES });
  const addMatch = match => dispatch({ type: ACTIONS.ADD_MATCH, payload: { match } });
  const updateMatch = match => dispatch({ type: ACTIONS.UPDATE_MATCH, payload: { match } });
  const changeSport = (e, sport) => dispatch({ type: ACTIONS.CHANGE_SPORT, payload: { sport }});

  const useUpdateRankings = useCallback(() => {
    if (matches) {
      dispatch({ type: ACTIONS.UPDATE_RANKINGS, payload: { matches } })
    }
  }, [matches]);

  useEffect(useUpdateRankings, [useUpdateRankings]);

  useEffect(() => {
    const promise = fetchData(sport);

    dispatch({ type: ACTIONS.FETCH_START });

    promise.then(
      data => dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data }),
      error => dispatch({ type: ACTIONS.FETCH_ERROR, error }),
    );

  }, [sport]);

  return (
    <Stack sx={{ minHeight: '100vh' }} justifyContent="space-between">
      <header>
        <Header
          sport={sport}
          effective={rankings?.effective}
          disabled={isLoading || isError}
          changeSport={changeSport}
          resetMatches={resetMatches}
          clearMatches={clearMatches}
          openModal={openModal}
        />
      </header>
      <main>
        <Main
          rankings={rankings}
          matches={matches}
          teams={teams}
          sport={sport}
          isError={isError}
          isLoading={isLoading}
          openModal={openModal}
          removeMatch={removeMatch}
        />
      </main>
      <footer>
        <Footer />
      </footer>
      <MatchModal
        match={selectedMatch}
        teams={teams}
        onClose={closeModal}
        onCreate={addMatch}
        onUpdate={updateMatch}
      />
    </Stack>

  );
}


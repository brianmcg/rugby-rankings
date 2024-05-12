import { fetchData } from '@utils/api';
import { MENS } from '@constants/sports';
import { ACTIONS } from './actions';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import MatchModal from './components/MatchModal';
import './App.css';
import Stack from '@mui/material/Stack';
import { useAsync, useUpdateCache } from './hooks';

const cache = new Map();

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

export default function App() {
  const [state, dispatch] = useAsync(fetchData, initialState, cache);

  const { rankings, matches, selectedMatch, isLoading, isError, sport } = state;
  const teams = rankings?.entries?.map(entry => entry.team);

  const selectMatch = match => dispatch({
    type: ACTIONS.SELECT_MATCH, payload: { match },
  });

  const addMatch = match => dispatch({
    type: ACTIONS.ADD_MATCH, payload: { match },
  });

  const updateMatch = match => dispatch({
    type: ACTIONS.UPDATE_MATCH, payload: { match },
  });

  const removeMatch = matchId => dispatch({
    type: ACTIONS.REMOVE_MATCH, payload: { matchId },
  });

  const clearMatches = () => dispatch({ type: ACTIONS.CLEAR_MATCHES });

  const resetMatches = () => dispatch({ type: ACTIONS.RESET_MATCHES });

  const changeSport = (e, sport) => dispatch({
    type: ACTIONS.CHANGE_SPORT, payload: { sport },
  });

  useUpdateCache(cache, sport, { rankings, matches });

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
          selectMatch={selectMatch}
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
          selectMatch={selectMatch}
          removeMatch={removeMatch}
        />
      </main>
      <footer>
        <Footer />
      </footer>
      <MatchModal
        match={selectedMatch}
        teams={teams}
        selectMatch={selectMatch}
        onCreate={addMatch}
        onUpdate={updateMatch}
      />
    </Stack>
  );
}

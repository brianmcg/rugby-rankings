import { fetchData } from '@utils/api';
import { KEY, VALUES } from '@constants/sports';
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
  data: null,
  initialData: null,
  isError: null,
  isLoading: true,
  selectedMatch: null,
  sport: VALUES.MENS,
};

export default function App() {
  const [state, dispatch] = useAsync(fetchData, initialState, { cache, key: KEY });
  const { data, initialData, selectedMatch, sport, isLoading, isError } = state;
  const { label, effective, teams, rankings, matches } = data ?? {};

  const changeSport = sport => dispatch({
    type: ACTIONS.CHANGE_SPORT, payload: { sport },
  });

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

  const updateMatches = matches => dispatch({
    type: ACTIONS.UPDATE_MATCHES, payload: { matches },
  });

  useUpdateCache(cache, data?.id, data);

  return (
    <Stack sx={{ minHeight: '100vh' }} justifyContent="space-between">
      <header>
        <Header
          sport={sport}
          effective={effective}
          disabled={isLoading || isError}
          changeSport={changeSport}
          resetMatches={() => updateMatches(initialData[sport]?.matches)}
          clearMatches={() => updateMatches([])}
          selectMatch={selectMatch}
        />
      </header>
      <main>
        <Main
          rankings={rankings}
          label={label}
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

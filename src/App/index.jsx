import Stack from '@mui/material/Stack';
import { fetchData } from '@utils/api';
import { KEY, VALUES } from '@constants/sports';
import { ACTIONS } from './actions';
import { useAsync, useUpdateCache } from './hooks';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import MatchModal from './components/MatchModal';
import Cache from './Cache';

const cache = new Cache({ dataKey: KEY });

const initialState = {
  data: null,
  initialData: null,
  isError: null,
  isLoading: true,
  selectedMatch: null,
  sport: VALUES.MENS,
};

export default function App() {
  const [state, dispatch] = useAsync(fetchData, initialState, cache);
  const { data, initialData, selectedMatch, sport, isLoading, isError } = state;
  const { label, startDate, endDate, teams, rankings, matches } = data ?? {};

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

  useUpdateCache(cache, data);

  return (
    <Stack sx={{ minHeight: '100vh' }} justifyContent="space-between">
      <header>
        <Header
          sport={sport}
          startDate={startDate}
          disabled={isLoading || isError}
          onChangeSport={changeSport}
          onResetMatches={() => updateMatches(initialData[sport]?.matches)}
          onClearMatches={() => updateMatches([])}
          onSelectMatch={selectMatch}
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
          onSelectMatch={selectMatch}
          onRemoveMatch={removeMatch}
        />
      </main>
      <footer>
        <Footer />
      </footer>
      <MatchModal
        match={selectedMatch}
        teams={teams}
        endDate={endDate}
        onSelectMatch={selectMatch}
        onCreate={addMatch}
        onUpdate={updateMatch}
      />
    </Stack>
  );
}

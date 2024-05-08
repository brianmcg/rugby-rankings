import { useEffect, useReducer, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ErrorMessage from '@components/ErrorMessage';
import Loading from '@components/Loading';
import { fetchRankings, fetchMatches } from '@utils/api';
import Rankings from './components/Rankings';
import Matches from './components/Matches';
import { ACTIONS } from './actions';
import { rankingsReducer } from './reducers';
import MatchModal from './components/MatchModal';

const initialState = {
  initialRankings: {},
  rankings: {},
  matches: [],
  initialMatches: [],
  isError: null,
  isLoading: true,
  selectedMatch: null,
};

export default function Main() {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { rankings, matches, selectedMatch, isLoading, isError } = state;
  const { entries, effective, label } = rankings;
  const teams = rankings?.entries?.map(entry => entry.team);

  const openModal = match => dispatch({ type: ACTIONS.OPEN_MODAL, payload: { match } });
  const closeModal = () => dispatch({ type: ACTIONS.CLOSE_MODAL });
  const removeMatch = matchId => dispatch({ type: ACTIONS.REMOVE_MATCH, payload: { matchId } });
  const clearMatches = () => dispatch({ type: ACTIONS.CLEAR_MATCHES });
  const resetMatches = () => dispatch({ type: ACTIONS.RESET_MATCHES });
  const addMatch = match => dispatch({ type: ACTIONS.ADD_MATCH, payload: { match } });
  const updateMatch = match => dispatch({ type: ACTIONS.UPDATE_MATCH, payload: { match } });

  const updateRankings = useCallback(() => dispatch(
    { type: ACTIONS.UPDATE_RANKINGS, payload: { matches } }),
    [matches],
  );
  
  useEffect(() => updateRankings(matches), [matches, updateRankings]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRankings = await fetchRankings();
        const fetchedMatches = await fetchMatches(fetchedRankings);

        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { rankings: fetchedRankings, matches: fetchedMatches } });
      } catch (isError) {
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: isError });
      }
    }

    fetchData();
  }, []);

  if (isError) return <ErrorMessage message="app.errors.fetch" />
  if (isLoading) return <Loading />

  return (
    <main>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2} direction="row-reverse">
          <Grid item xs={12} md={6}>
            <Matches
              matches={matches}
              teams={teams}
              openModal={openModal}
              clear={clearMatches}
              remove={removeMatch}
              reset={resetMatches}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Rankings label={label} entries={entries} effective={effective} />
          </Grid>
        </Grid>
      </Container>
      <MatchModal
        match={selectedMatch}
        teams={teams}
        onClose={closeModal}
        onCreate={addMatch}
        onUpdate={updateMatch}
      />
    </main>
  );
}

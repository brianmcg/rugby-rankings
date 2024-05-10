import { useReducer, useCallback, useEffect } from 'react';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Container from '@mui/material/Container';
import ErrorMessage from '@components/ErrorMessage';
import Loading from '@components/Loading';
import { fetchRankings, fetchMatches } from '@utils/api';
import Rankings from './components/Rankings';
import Matches from './components/Matches';
import { ACTIONS } from './actions';
import { rankingsReducer } from './reducers';
import MatchModal from './components/MatchModal';
// import { useOnMountUnsafe } from './hooks';
// import { colors } from '@constants/colors';
import ControlBar from './components/ControlBar';

const initialState = {
  initialRankings: {},
  rankings: {},
  matches: [],
  initialMatches: [],
  isError: null,
  isLoading: true,
  selectedMatch: null,
  sport: 'mru',
};

export default function Main() {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { rankings, matches, selectedMatch, isLoading, isError, sport } = state;
  const { entries, effective, label } = rankings;
  const teams = rankings?.entries?.map(entry => entry.team);

  const openModal = match => dispatch({ type: ACTIONS.OPEN_MODAL, payload: { match } });
  const closeModal = () => dispatch({ type: ACTIONS.CLOSE_MODAL });
  const removeMatch = matchId => dispatch({ type: ACTIONS.REMOVE_MATCH, payload: { matchId } });
  const clearMatches = () => dispatch({ type: ACTIONS.CLEAR_MATCHES });
  const resetMatches = () => dispatch({ type: ACTIONS.RESET_MATCHES });
  const addMatch = match => dispatch({ type: ACTIONS.ADD_MATCH, payload: { match } });
  const updateMatch = match => dispatch({ type: ACTIONS.UPDATE_MATCH, payload: { match } });
  const changeSport = (e, sport) => dispatch({ type: ACTIONS.CHANGE_SPORT, payload: { sport }});

  const updateRankings = useCallback(() => dispatch(
    { type: ACTIONS.UPDATE_RANKINGS, payload: { matches } }),
    [matches],
  );
  
  useEffect(() => updateRankings(matches), [matches, updateRankings]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRankings = await fetchRankings(sport);
        const fetchedMatches = await fetchMatches(sport, fetchedRankings);

        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { rankings: fetchedRankings, matches: fetchedMatches } });
      } catch (isError) {
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: isError });
      }
    }

    fetchData();
  }, [sport]);

  if (isError) return <ErrorMessage message="app.errors.fetch" />
  if (isLoading) return <Loading />

  return (
    <>
      <ControlBar />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Container>
            <Tabs
              variant="fullWidth"
              value={sport}
              onChange={changeSport}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab sx={{}} label="mru" value="mru" />
              <Tab sx={{}} label="wru" value="wru" />
            </Tabs>
          </Container>
        </Box>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4} direction="row-reverse">
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
    </>
  );
}

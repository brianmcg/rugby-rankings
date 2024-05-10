import { useReducer, useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorMessage from '@components/ErrorMessage';
import Loading from '@components/Loading';
import Translate from '@components/Translate';
import { fetchRankings, fetchMatches } from '@utils/api';
import { formatDay } from '@utils/date';
import { ACTIONS } from './actions';
import { rankingsReducer } from './reducers';
import Rankings from './components/Rankings';
import Matches from './components/Matches';
import MatchModal from './components/MatchModal';

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
    <main>
      <Box sx={{ width: '100%', backgroundColor: 'white' }}>
        <Container>
          <Tabs
            variant="fullWidth"
            value={sport}
            onChange={changeSport}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              value="mru"
              label={
                <Typography color="inherit" variant="h6" align="center">
                  <Translate text="app.main.tabs.mru" />
                </Typography>
              }
            />
            <Tab
              value="wru"
              label={
                <Typography color="inherit" variant="h6" align="center">
                  <Translate text="app.main.tabs.wru" />
                </Typography>
              }
            />
          </Tabs>
        </Container>
      </Box>

      <Box sx={{ width: '100%', p: 3, bgcolor: 'secondary.main', color: 'common.white'}}>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>
                <Translate text="app.main.updated" />
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                {formatDay(effective.millis)}
              </Typography>
            </Stack>

            <Button
              sx={{ opacity: 0.6, '&:hover': { opacity: 1 } }}
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={resetMatches}
            >
              <Translate text="app.main.reset" />
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4} direction="row-reverse">
          <Grid item xs={12} md={6}>
            <Matches
              matches={matches}
              teams={teams}
              openModal={openModal}
              clear={clearMatches}
              remove={removeMatch}
              sport={sport}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Rankings
              label={label}
              entries={entries}
              sport={sport}
            />
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

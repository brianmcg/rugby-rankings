import { useEffect, useReducer } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ErrorMessage from '@components/ErrorMessage';
import Loading from '@components/Loading';
import { fetchRankings, fetchMatches } from '@utils/api';
import Rankings from './components/Rankings';
import Matches from './components/Matches';
import FixtureModal from './components/FixtureModal';
import ControlBar from './components/ControlBar';
import rankingsReducer, { initialState, ACTIONS } from './reducer';

export default function Main() {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { rankings, isLoading, fetchError, isModalOpen, matches } = state;
  const { entries, effective, label } = rankings;
  const teams = rankings.entries.map(({ team }) => ({ id: team.id, label: team.name }));

  const fetchData = async () => {
    try {
      const rankings = await fetchRankings();
      const matches = await fetchMatches(rankings.effective.millis);
      
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { rankings, matches } });
    } catch (fetchError) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: fetchError });
    }
  }

  const resetData = () => dispatch({ type: ACTIONS.RESET_DATA });
  const openModal = () => dispatch({ type: ACTIONS.OPEN_MODAL });
  const closeModal = amount => dispatch({ type: ACTIONS.CLOSE_MODAL, payload: amount });

  useEffect(() => {
    fetchData();
  }, []);

  if (fetchError) return <ErrorMessage message="app.errors.fetch" />
  if (isLoading) return <Loading />

  return (
    <main>
      <ControlBar handleClickInfo={openModal} handleClickReset={resetData} />
      <Container sx={{ mt: '32px' }}>
        <Grid container spacing={2} direction="row-reverse">
          <Grid item xs={12} md={7}>
            <Matches matches={matches} teams={teams} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Rankings label={label} entries={entries} effective={effective} />
          </Grid>
        </Grid>
      </Container>
      <FixtureModal open={isModalOpen} handleClose={closeModal} />
    </main>
  );
}

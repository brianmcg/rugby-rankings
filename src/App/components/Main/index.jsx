import { useEffect, useReducer } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ErrorMessage from '@components/ErrorMessage';
import Loading from '@components/Loading';
import { fetchRankings } from '@utils/api';
import Rankings from './components/Rankings';
import Matches from './components/Matches';
import FixtureModal from './components/FixtureModal';
import ControlBar from './components/ControlBar';
import rankingsReducer, { initialState, ACTIONS } from './reducer';

export default function Main() {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { data, isLoading, fetchError, isModalOpen } = state;

  const fetchData = async () => {
    try {
      const data = await fetchRankings();
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
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
      <Container style={{ marginTop: 32 }}>
        <Grid container spacing={2} direction="row-reverse">
          <Grid item xs={12} md={7}>
            <Matches />
          </Grid>
          <Grid item xs={12} md={5}>
            <Rankings {...data} />
          </Grid>
        </Grid>
      </Container>
      <FixtureModal open={isModalOpen} handleClose={closeModal} />
    </main>
  );
}

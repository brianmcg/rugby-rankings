import { useEffect, useReducer } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ErrorMessage from '@components/ErrorMessage';
import Loading from '@components/Loading';
import { fetchRankings, fetchMatches } from '@utils/api';
import Rankings from './components/Rankings';
import Matches from './components/Matches';
// import MatchModal from './components/MatchModal';
// import ControlBar from './components/ControlBar';
import rankingsReducer, { initialState, ACTIONS } from './reducer';

export default function Main() {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { rankings, isLoading, fetchError, matches } = state;
  const { entries, effective, label } = rankings;
  const teams = rankings.entries.map(entry => entry.team);

  const resetData = () => dispatch({ type: ACTIONS.RESET_DATA });
  
  const updateRankings = match => dispatch({ type: ACTIONS.UPDATE_RANKINGS, payload: match });

  // const closeModal = amount => dispatch({ type: ACTIONS.CLOSE_MODAL, payload: amount });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRankings = await fetchRankings();
        const fetchedMatches = await fetchMatches(fetchedRankings);
        
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { rankings: fetchedRankings, matches: fetchedMatches } });
      } catch (fetchError) {
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: fetchError });
      }
    }

    fetchData();
  }, []);

  if (fetchError) return <ErrorMessage message="app.errors.fetch" />
  if (isLoading) return <Loading />

  return (
    <main>
      {/*<ControlBar handleClickReset={resetData} handleClickInfo={openModal} />*/}
      <Container sx={{ mt: 8 }} fluid maxWidth="xl">
        <Grid container spacing={2} direction="row-reverse">
          <Grid item xs={12} md={8}>
            <Matches
              matches={matches}
              teams={teams}
              updateRankings={updateRankings}
              resetData={resetData}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Rankings label={label} entries={entries} effective={effective} />
          </Grid>
        </Grid>
      </Container>
{/*      <MatchModal
        open={isModalOpen}
        handleClose={closeModal}
        teams={teams}
      />*/}
    </main>
  );
}

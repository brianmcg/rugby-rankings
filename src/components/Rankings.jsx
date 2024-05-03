import { useEffect, useReducer } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Translate from '@components/Translate';
import ErrorMessage from '@components/ErrorMessage';
import Loading from '@components/Loading';
import FixtureModal from '@components/FixtureModal';
import RankingsTable from '@components/RankingsTable';
import { fetchRankings } from '@utils/client';

import { rankingsReducer } from '@utils/reducers';

const initialState = {
  initialData: {},
  data: {},
  isLoading: true,
  error: null,
  reset: false,
  modalOpen: false,
};

function Rankings() {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);

  const { data, isLoading, error, modalOpen } = state;

  const { label, entries } = data;

  const fetchData = async () => {
    try {
      const data = await fetchRankings();
      dispatch({ type: 'success', payload: data });
    } catch (error) {
      dispatch({ type: 'error', payload: error });
    }
  }

  const handleClickReset = () => dispatch({ type: 'reset' });

  const handleClickPredict = () => dispatch({ type: 'open' });

  const handleModalClose = amount => dispatch({ type: 'close', payload: amount });

  useEffect(() => {
    fetchData();
  }, []);


  if (error) {
    return <ErrorMessage message="app.errors.fetch" />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {label}
            </Typography>
            <Button
              color="inherit"
              onClick={handleClickPredict}
            >
              <Translate text="app.rankings.predict" />
            </Button>
            <Button
              color="inherit"
              onClick={handleClickReset}
            >
              <Translate text="app.rankings.reset" />
            </Button>
            <FixtureModal open={modalOpen} handleClose={handleModalClose} />
          </Toolbar>
        </AppBar>
      </Box>

      {<RankingsTable entries={entries} />}
    </>
  );
}


export default Rankings;

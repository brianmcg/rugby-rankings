import { useEffect, useState, useReducer } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Translate from '@components/Translate';
import FixtureModal from '@components/FixtureModal';
import RankingsTable from '@components/RankingsTable';
import { fetchRankings } from '@utils/client';

function Rankings() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reset, setReset] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { label, entries } = data;

  const fetchData = async () => {
    setLoading(true);

    try {
      const data = await fetchRankings();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error)
    }
  }


  const handleClickReset = () => setReset(!reset);

  const handleClickPredict = () => setModalOpen(true);

  const handleModalClose = () => {
    console.log(entries);
    setModalOpen(false);
  }

  useEffect(() => {
    fetchData();
  }, [reset]);


  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {isLoading ? null : label}
            </Typography>
            <Button
              color="inherit"
              disabled={isLoading}
              onClick={handleClickPredict}
            >
              <Translate text="app.rankings.predict" />
            </Button>
            <Button
              color="inherit"
              disabled={isLoading}
              onClick={handleClickReset}
            >
              <Translate text="app.rankings.reset" />
            </Button>
            <FixtureModal open={modalOpen} handleClose={handleModalClose} />
          </Toolbar>
        </AppBar>
      </Box>

      {isLoading ? null : <RankingsTable entries={entries} />}
    </>
  );
}


export default Rankings;

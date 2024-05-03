import { useEffect, useReducer } from 'react';

import ErrorMessage from '@components/ErrorMessage';
import Loading from '@components/Loading';
import FixtureModal from '@components/FixtureModal';
import RankingsTable from '@components/RankingsTable';
import ControlBar from '@components/ControlBar';
import { fetchRankings } from '@utils/client';

import { rankingsReducer } from '@utils/reducers';

const initialState = {
  initialData: {},
  data: {},
  isLoading: true,
  fetchError: null,
  reset: false,
  isModalOpen: false,
};

export default function Rankings() {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { data, isLoading, error, isModalOpen } = state;
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

  if (error) return <ErrorMessage message="app.errors.fetch" />
  if (isLoading) return <Loading />

  return (
    <>
      <ControlBar label={label} handleClickPredict={handleClickPredict} handleClickReset={handleClickReset} />
      <RankingsTable entries={entries} />
      <FixtureModal open={isModalOpen} handleClose={handleModalClose} />
    </>
  );
}

import { useEffect, useReducer } from 'react';
import ErrorMessage from '@components/ErrorMessage';
import Loading from '@components/Loading';
import { fetchRankings } from '@utils/api';
import FixtureModal from './components/FixtureModal';
import RankingsTable from './components/RankingsTable';
import ControlBar from './components/ControlBar';
import rankingsReducer, { initialState, ACTIONS } from './reducer';

export default function Rankings() {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { data, isLoading, fetchError, isModalOpen } = state;
  const { label, entries } = data;

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
    <>
      <ControlBar label={label} handleClickPredict={openModal} handleClickReset={resetData} />
      <RankingsTable entries={entries} />
      <FixtureModal open={isModalOpen} handleClose={closeModal} />
    </>
  );
}

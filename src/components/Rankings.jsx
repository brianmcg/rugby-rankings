import Loading from '@components/Loading';
import ErrorMessage from '@components/ErrorMessage';
import RankingsTable from '@components/RankingsTable';

import { useAsync } from '@utils/hooks';
import { fetchRankings } from '@utils/client';

function Rankings(props) {
    const state = useAsync(
    () => {
      return fetchRankings();
    },
    { status: 'pending' },
    [],
  );

  const { data, status, error } = state;

  switch (status) {
    case 'pending':
      return <Loading />
    case 'rejected':
      return <Error />
    case 'resolved':
      return <RankingsTable {...data} />
    default:
      throw new Error('This should be impossible')
  }

}

export default Rankings;

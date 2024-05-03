import RankingsTable from '@components/RankingsTable';
import { fetchRankings } from '@utils/client';

const resource = fetchRankings();

function Rankings() {
  const data = resource.read();
  
  return <RankingsTable {...data} />
}


export default Rankings;

import { format } from '@utils/date';

function RankingsTable({ label, entries, effective }) {
  const date = format(effective.millis);

  console.log(entries);

  return (
    <div>
      <h2>{label}</h2>
      
      <span>{date}</span>
    </div>
  );
}

export default RankingsTable;

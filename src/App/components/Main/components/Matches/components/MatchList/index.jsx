import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MatchListItem from './components/MatchListItem';

const renderListItems = (matches, teams) => {
  return matches.map(match => 
    <ListItem key={match.matchId} alignItems="flex-start">
      <MatchListItem match={match} teams={teams} />
    </ListItem>
  )
};

export default function MatchList({ matches, teams }) {
  return (
    <List>{renderListItems(matches, teams)}</List>
  );
}

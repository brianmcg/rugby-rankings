import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Translate from '@components/Translate';
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

export default function Matches({ matches, teams }) {
	return (
		<Card>
      <CardHeader
        title={<Translate text={"app.main.matches.title"} />}
      />
      <CardContent>
        <List>{renderListItems(matches, teams)}</List>
      </CardContent>
    </Card>
	);
}

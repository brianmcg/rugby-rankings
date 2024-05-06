import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Translate from '@components/Translate';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MatchListItem from './components/MatchListItem';

const renderListItems = (matches, handleUpdateMatch) => {
  return matches.map(match => 
    <ListItem key={match.matchId} alignItems="flex-start">
      <MatchListItem match={match} handleUpdateMatch={handleUpdateMatch} />
    </ListItem>
  )
};

export default function Matches({ matches, handleUpdateMatch }) {
	return (
		<Card>
      <CardHeader
        title={<Translate text={"app.main.matches.title"} />}
      />
      <CardContent>
        <List>{renderListItems(matches, handleUpdateMatch)}</List>
      </CardContent>
    </Card>
	);
}

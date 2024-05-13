import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Translate from '@components/Translate';
import MatchListItem from './components/MatchListItem';

export default function Matches({ matches, teams, label, sport, onSelectMatch, onRemoveMatch }) {
	return (
		<Card>
      <CardMedia image={`/src/assets/images/${sport}/fixtures.png`} sx={{ height: 100, color: 'white' }}>
        <Stack sx={{ height: '100%' }} direction="row" alignItems="flex-end" justifyContent="space-between">
          <CardHeader title={<Translate text="app.main.matches.title" options={{ label }}/>} />
        </Stack>
      </CardMedia>  
      <CardContent>
        <List sx={{ p: 0, maxHeight: '100%', overflow: 'auto' }}> {
          matches.map(match => 
            (
              <ListItem key={match.matchId}>
                <MatchListItem
                  match={match}
                  teams={teams}
                  onRemoveMatch={onRemoveMatch}
                  onSelectMatch={onSelectMatch}
                />
              </ListItem>
            )
          )
        }
        </List>
      </CardContent>
    </Card>
	);
}

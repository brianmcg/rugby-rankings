import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Translate from '@components/Translate';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MatchListItem from './components/MatchListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Matches({ matches = [], teams = [], label, sport, openModal, remove }) {
	return (
		<Card>
      <CardMedia image={`/src/assets/images/${sport}/fixtures.png`} sx={{ height: 100, color: 'white' }}>
        <Stack sx={{ height: '100%' }} direction="row" alignItems="flex-end" justifyContent="space-between">
          {/*<CardHeader title={<Translate text={"app.main.matches.title"} />} />*/}
          <CardHeader title={<Translate text="app.main.matches.title" options={{ label }}/>} />
        </Stack>
      </CardMedia>  
      <CardContent>
        <Box p={2}>

          <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: 14, fontWeight: 300 }}>
            {'Add fixtures from the menu'}
          </Typography>
        </Box>
        <List sx={{ p: 0, maxHeight: '100%', overflow: 'auto' }}> {
          matches.map(match => 
            (
              <ListItem key={match.matchId}>
                <MatchListItem
                  match={match}
                  teams={teams}
                  onClickRemove={remove}
                  onClickEdit={openModal}
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

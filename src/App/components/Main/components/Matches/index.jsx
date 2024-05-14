import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Translate from '@components/Translate';
import Match from './components/Match';

const imageSrc = sport => `/src/assets/images/${sport}/matches.png`;

export default function Matches({ matches, teams, label, sport, onSelectMatch, onRemoveMatch }) {
	return (
		<Card>
      <CardMedia image={imageSrc(sport)} sx={{ height: 100, color: 'white' }}>
        <Stack sx={{ height: '100%' }} direction="row" alignItems="flex-end" justifyContent="space-between">
          <CardHeader title={<Translate text="app.main.matches.title" options={{ label }}/>} />
        </Stack>
      </CardMedia>
      <CardContent>
      {
        matches.length ? (
          <Box>
            <List sx={{ p: 0 }}> {
              matches.map(match =>
                (
                  <ListItem key={match.matchId}>
                    <Match
                      match={match}
                      teams={teams}
                      onRemoveMatch={onRemoveMatch}
                      onSelectMatch={onSelectMatch}
                    />
                  </ListItem>
                ),
              )
            }
            </List>
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: 'secondary.main' }}>
            <Translate text="app.main.matches.empty" />
          </Typography>
        )
      }
      </CardContent>
    </Card>
	);
}

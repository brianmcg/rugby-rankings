import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Translate from '@components/Translate';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MatchListItem from './components/MatchListItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { createMatch } from './helpers';

export default function Matches({ matches = [], teams = [], sport, openModal, clear, remove }) {
	return (
		<Card>
      <CardMedia image={`/src/assets/images/${sport}/fixtures.png`} sx={{ height: 100, color: 'white' }}>
        <Stack sx={{ height: '100%' }} direction="row" alignItems="flex-end" justifyContent="space-between">
          <CardHeader title={<Translate text={"app.main.matches.title"} />} />
        </Stack>
      </CardMedia>  
        <Stack
          sx={{ p: 2, pb: 0, pr: 4 }}
          spacing={1}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            variant="contained"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => clear()}
          >
            <Translate text="app.main.matches.clear" />
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => openModal(createMatch())}
          >
            <Translate text="app.main.matches.add" />
          </Button>
        </Stack>
      <CardContent>
        <List sx={{ p: 0, maxHeight: '100%', overflow: 'auto' }}> {
          matches.map(match => 
            (
              <ListItem alignItems="flex-start" key={match.matchId}>
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

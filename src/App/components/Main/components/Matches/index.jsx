import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Translate from '@components/Translate';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MatchListItem from './components/MatchListItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { createMatch } from './helpers';

export default function Matches({ matches = [], teams = [], openModal, clear, remove, reset }) {
	return (
		<Card>
        <Stack direction="row" justifyContent="space-between">
          <CardHeader
            title={<Translate text={"app.main.matches.title"} />}
          />
          <div style={{ margin: 16 }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={() => reset()}
            >
              <Translate text="app.main.matches.reset" />
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => clear()}
            >
              <Translate text="app.main.matches.clear" />
            </Button>
          </div>
        </Stack>
      <CardContent>
        <List> {
          matches.map(match => 
            (
              <ListItem alignItems="flex-start" key={`${match.matchId}-${match.updated}`}>
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
        <Stack direction="row" justifyContent="right">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openModal(createMatch())}
          >
          <Translate text="app.main.matches.add" />
          </Button>
        </Stack>
      </CardContent>
    </Card>
	);
}

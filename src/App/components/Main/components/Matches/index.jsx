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
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { createMatch } from './helpers';

export default function Matches({ matches = [], teams = [], openModal, clear, remove, reset }) {
	return (
		<Card>
      <CardMedia image="/src/assets/images/mru-fixtures.png" sx={{ height: 140, color: 'white' }}>
        <Stack sx={{ height: '100%' }} direction="row" alignItems="flex-end" justifyContent="space-between">
          <CardHeader title={<Translate text={"app.main.matches.title"} />} />
          
        </Stack>
      </CardMedia>

{/*       sx={{
            p: 2,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            }
          }}*/}
          
        <Box
          display="flex"
          justifyContent="flex-end"
          gap={2}
          sx={{ p: 2 }}
        >
            {/*<Stack direction="row" justifyContent="center" spacing={1}>*/}
              <Button
                // sx={{ opacity: 0.75, '&:hover': { opacity: 1 } }}
                // color="inherit"
                variant="contained"
                size="small"
                startIcon={<RefreshIcon />}
                onClick={() => reset()}
              >
                <Translate text="app.main.matches.reset" />
              </Button>
              <Button
                // sx={{ opacity: 0.75, '&:hover': { opacity: 1 } }}
                // color="inherit"
                variant="contained"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => clear()}
              >
                <Translate text="app.main.matches.clear" />
              </Button>
              <Button
                // sx={{ opacity: 0.75, '&:hover': { opacity: 1 } }}
                // color="inherit"
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => openModal(createMatch())}
              >
                <Translate text="app.main.matches.add" />
              </Button>
            {/*</Stack>*/}
        
          </Box>
      <CardContent>
        <List> {
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

import { useState } from 'react';
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

export default function Matches(props) {
  const [matches, setMatches] = useState(props.matches);

  // console.log('render:matches', matches);

  const handleClickAdd = () => {
    const match = {
      time: Date.now(),
      matchId: `${Date.now().toString(36)}${Math.random()}`,
    };

    setMatches([ ...matches, match ])
  };

  const handleClickDelete = matchId => {
    const updatedMatches = matches.filter(match => match.matchId !== matchId);
    setMatches(updatedMatches);
  };

  const handleClickReset = () => {
    // props.resetData();
    console.log('handleClickReset');
    // setMatches([...props.matches]);
  };

	return (
		<Card>
        <Stack direction="row" justifyContent="space-between">
          <CardHeader
            title={<Translate text={"app.main.matches.title"} />}
          />
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => handleClickReset()}
          >
          <Translate text="app.main.matches.reset" />
          </Button>
        </Stack>
      <CardContent>
        <List> {
          matches.map(match => 
            
            <MatchListItem
              match={match}
              teams={props.teams}
              handleClickDelete={handleClickDelete}
              updateRankings={props.updateRankings}
            />
     
          )
        }
        </List>
        <Stack direction="row" justifyContent="right">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleClickAdd()}
          >
          <Translate text="app.main.matches.add" />
          </Button>
        </Stack>
      </CardContent>
    </Card>
	);
}

import { useState, useEffect, useCallback } from 'react';
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

const generateMatchId = () => `${Date.now().toString(36)}${Math.random()}`;

export default function Matches({ matches: initialMatches = [], teams = [], updateRankings }) {
  const [matches, setMatches] = useState(initialMatches);

  const onMatchAdded = () => {
    const match = { time: Date.now() };
    setMatches([ ...matches, match ]);
  };

  const onMatchChanged = match => {
    const updatedMatches = matches.map(m => (m.matchId === match.matchId) ? match : m);
    setMatches(updatedMatches);
  }

  const onMatchRemoved = matchId => {
    const updatedMatches = matches.filter(match => match.matchId !== matchId);
    setMatches(updatedMatches);
  };

  const onReset = () => {
    const updatedMatches = initialMatches.map(match => ({ ...match, matchId: generateMatchId() }));
    setMatches(updatedMatches);
  };

  const safeCallback = useCallback(updateRankings, [updateRankings]);

  useEffect(() => safeCallback(matches), [matches, safeCallback]);

	return (
		<Card>
        <Stack direction="row" justifyContent="space-between">
          <CardHeader
            title={<Translate text={"app.main.matches.title"} />}
          />
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => onReset()}
          >
          <Translate text="app.main.matches.reset" />
          </Button>
        </Stack>
      <CardContent>
        <List> {
          matches.map(match => 
            (
              <ListItem alignItems="flex-start" key={match.matchId}>
                <MatchListItem
                  match={match}
                  teams={teams}
                  onRemove={onMatchRemoved}
                  onChange={onMatchChanged}
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
            onClick={() => onMatchAdded()}
          >
          <Translate text="app.main.matches.add" />
          </Button>
        </Stack>
      </CardContent>
    </Card>
	);
}

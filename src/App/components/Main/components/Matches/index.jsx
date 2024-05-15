import { useState, useRef, useLayoutEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { formatRange } from '@utils/date';
import Translate from '@components/Translate';
import { VALUES } from '@constants/sports';
import Match from './components/Match';

import mruImageSrc from '@assets/images/mru/matches.png';
import wruImageSrc from '@assets/images/wru/matches.png';

const IMAGES = {
  [VALUES.MENS]: mruImageSrc,
  [VALUES.WOMENS]: wruImageSrc,
};

const DISPLAY_ITEMS = 4;

export default function Matches({
  matches,
  teams,
  sport,
  startDate,
  endDate,
  onSelectMatch,
  onRemoveMatch,
}) {
  const listRef = useRef();
  const [listContainerHeight, setListContainerHeight] = useState(0);

  useLayoutEffect(() => {
    if (listRef.current) {
      const { offsetHeight: listItemHeight } = listRef.current.children[0];
      const displayHeight = DISPLAY_ITEMS * listItemHeight;

      setListContainerHeight(displayHeight);
    }
  }, []);

	return (
		<Card>
      <CardMedia image={IMAGES[sport]} sx={{ height: 100, color: 'common.white' }}>
        <Stack
          sx={{ height: '100%', p: 2 }}
          spacing={2}
          direction="row"
          alignItems="flex-end"
          justifyContent="flex-start"
        >
          <Typography variant="h5">
            <Translate
              text="app.main.matches.title"
              options={{ range: formatRange(startDate, endDate) }}
            />
          </Typography>
        </Stack>
      </CardMedia>
      <CardContent>
      {
        matches.length ? (
          <Box sx={{ maxHeight: listContainerHeight, overflow: 'auto' }}>
            <List ref={listRef} sx={{ p: 0 }}> {
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
          <Typography color="secondary.main" variant="body2">
            <Translate text="app.main.matches.empty" />
          </Typography>
        )
      }
      </CardContent>
    </Card>
	);
}

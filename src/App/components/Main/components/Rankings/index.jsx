import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Translate from '@components/Translate';
import { format } from '@utils/date';
import RankingsTable from './components/RankingsTable';

export default function Rankings({ entries, label, effective }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Card>
      <CardHeader
        title={<Translate text="app.main.rankings.title" options={ { label }}/>}
        subheader={format(effective.millis)}
      />
      <CardContent>
        <RankingsTable entries={entries} expanded={expanded} />
      </CardContent>
      <CardActions disableSpacing>
        <Button
          style={{ width: '100%' }}
          size="large"
          color="secondary"
          variant="outlined"
          startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={handleExpandClick}
        >
          <Translate text={expanded ? 'app.main.rankings.collapse' : 'app.main.rankings.expand'} />
        </Button>
      </CardActions>
    </Card>
  );
}

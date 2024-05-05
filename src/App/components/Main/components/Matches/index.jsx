import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Translate from '@components/Translate';
import MatchList from './components/MatchList';

export default function Matches({ matches, teams }) {

	return (
		<Card>
      <CardHeader
        title={<Translate text={"app.main.matches.title"} />}
      />
      <CardContent>
        <MatchList matches={matches} teams={teams} />
      </CardContent>

    </Card>
	);
}

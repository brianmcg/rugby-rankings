import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Translate from '@components/Translate';

export default function Matches() {
	return (
		<Card>
      <CardHeader
        title={<Translate text={"app.main.matches.title"} />}
      />
      <CardContent>
        <div>matches</div>
      </CardContent>

    </Card>
	);
}


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import MatchForm from './components/MatchForm';
import Translate from '@components/Translate';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 4,
};

export default function TransitionsModal({ match, teams, onClose, onCreate, onUpdate }) {
  const isOpen = !!match;

  return (
    <Modal
      open={isOpen}
      onClose={() => onClose(10)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ mb: 4}}>
            <Translate text={"app.main.modal.title"} />
          </Typography>
          <MatchForm
            match={match}
            teams={teams}
            onCreate={onCreate}
            onUpdate={onUpdate}
          />
        </Box>
      </Fade>
    </Modal>
  );
}

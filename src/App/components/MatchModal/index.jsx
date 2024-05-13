import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Translate from '@components/Translate';
import MatchForm from './components/MatchForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 4,
};

export default function TransitionsModal({ match, teams, onSelectMatch, onCreate, onUpdate }) {
  const isOpen = !!match;
  const onClose = () => onSelectMatch(null);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Typography color="primary" variant="h6" mb={4}>
            <Translate text="app.main.modal.title" />
          </Typography>
          <MatchForm
            match={match}
            teams={teams}
            onCreate={onCreate}
            onUpdate={onUpdate}
            onClose={onClose}
          />
        </Box>
      </Fade>
    </Modal>
  );
}

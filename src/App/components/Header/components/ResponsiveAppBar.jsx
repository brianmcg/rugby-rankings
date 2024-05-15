import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Translate from '@components/Translate';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


function renderButton({ icon, action, disabled, label }) {
  return (
    <Button
      key={label}
      disabled={disabled}
      sx={{ p: 0, '&:hover': { opacity: 1 }, '&:disabled': { opacity: 0 } }}
      color="inherit"
      startIcon={icon}
      onClick={action}
    >
      <Translate text={label} />
    </Button>
  );
}

function ResponsiveAppBar({
  // startDate,
  // disabled,
  onSelectMatch,
  onResetMatches,
  onClearMatches,
}) {



  const options = [
    { label: 'app.main.reset', icon: <RefreshIcon />, action: onResetMatches },
    { label: 'app.main.clear', icon: <DeleteIcon />, action: onClearMatches },
    { label: 'app.main.add', icon: <AddIcon />, action: () => onSelectMatch() },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = event => setAnchorElNav(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'secondary.main' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box justifyContent="flex-end" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {options.map((option, i) => (
                <MenuItem key={i}>
                  {renderButton(option)}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            alignItems="center"
            justifyContent="flex-end"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            <Stack direction="row" spacing={2}>
              {options.map(option => renderButton(option))}
            </Stack>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

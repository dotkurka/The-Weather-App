import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { HeaderProps } from 'src/components/Header/types';
import Logo from 'src/components/Logo/Logo';

const pages = [
  { title: 'Weather', link: '/' },
  { title: 'GitHub Repository', link: 'github-repository' },
];

const Header = ({ appBarSx }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <AppBar sx={{ justifyContent: 'center', height: '60px', ...appBarSx }} position='static'>
      <Container sx={{ margin: 'unset' }}>
        <Toolbar disableGutters>
          <Logo sx={{ width: 50, height: 50, mr: 2 }} />
          <Box sx={{ display: 'flex' }}>
            {pages.map(({ title, link }) => (
              <Button
                variant='outlined'
                key={link}
                onClick={() => navigate(link)}
                sx={{ my: 2, color: 'white' }}
              >
                {title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

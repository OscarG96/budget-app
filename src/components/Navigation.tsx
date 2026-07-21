import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MobileBottomNavigation from './MobileBottomNav';
import LoginBtn from './LoginBtn';
import { useSession } from 'next-auth/react';

const pages = [{ label: 'Home', href: '/' }, { label: 'Expenses', href: '/expenses' }, { label: 'Categories', href: '/categories' }];

export default function DesktopAppBar() {
  const { data: session } = useSession();

  return (
    <>
      <Box
        sx={{
          backgroundColor: {
            xs: "#fff",
            md: "primary.main",
          },
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: {
              xs: "#fff",
              md: "primary.main",
            },
            color: {
              xs: "text.primary",
              md: "primary.contrastText",
            },
            boxShadow: "none",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    display: "flex",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  BudgetApp
                </Typography>
              </Box>

              {session && (
                <>
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      mx: 2,
                    }}
                  >
                    {pages.map((page) => (
                      <Button
                        href={page.href}
                        key={page.label}
                        sx={{
                          my: 2,
                          color: "inherit",
                          display: "block",
                        }}
                      >
                        {page.label}
                      </Button>
                    ))}
                  </Box>
                  <LoginBtn {...session} />
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {session && (
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <MobileBottomNavigation />
        </Box>
      )}
    </>
  );
}


import { useState } from "react";
import { Link } from 'remix';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchInput from "./Search";

export default function SearchAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);  
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' color="secondary">
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}
            id='basic-button'
            aria-controls={isOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="new">New note</Link>
              </MenuItem>
            </Menu>
          </IconButton>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
            <Link to="/" style={{ color: 'white' }}>
              Notes
            </Link>
            </Typography>
          <SearchInput />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

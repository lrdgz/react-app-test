import { AppStore } from '@/redux/store';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { CustomDialog } from '../CustomDialog';
import { dialogOpenSubject$ } from '../CustomDialog/CustomDialog';
import { FavoriteTable } from './FavoriteTable';


export interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
	const handleClick = () => {
		dialogOpenSubject$.setSubject = true;
	}

	return(
		<>
			<CustomDialog>
				<FavoriteTable />
			</CustomDialog>
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						React TEST
					</Typography>
					<Button onClick={handleClick} variant='contained'>Open Favorites</Button>
				</Toolbar>
			</AppBar>
		</>
	)
};

export default Navbar;


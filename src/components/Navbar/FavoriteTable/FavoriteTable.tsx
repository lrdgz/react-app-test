import React, { useState } from 'react';
import { DataGrid, GridRenderCellParams }  from '@mui/x-data-grid';
import { Person } from '@/models';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '@/redux/states';
import { AppStore } from '@/redux/store';

export interface FavoriteTableInterface {}

const FavoriteTable: React.FC<FavoriteTableInterface> = () => {
	const pageSize = 5;
	
	const dispatch = useDispatch();
	const stateFavorites = useSelector((store: AppStore) => store.favorites );

	const handleClick = (person: Person) => {
		dispatch(removeFavorite(person));
	};

	const columns = [
		{ field: 'actions', headerName: '', type: 'actions', sortable: false, width: 50, renderCell: (params: GridRenderCellParams) => <>{
			<IconButton color="secondary" aria-label="favorites" component="label" onClick={() => handleClick(params.row)}>
				<Delete />
		  	</IconButton>
		}</> },
		{ field: 'name', headerName: 'Name', flex: 1, minWidth: 150, renderCell: (params: GridRenderCellParams) => <>{params.value}</> },
		{ field: 'category', headerName: 'Category', flex: 1, minWidth: 150, renderCell: (params: GridRenderCellParams) => <>{params.value}</> },
		{ field: 'company', headerName: 'Company', flex: 1, minWidth: 150, renderCell: (params: GridRenderCellParams) => <>{params.value}</> },
	];

	return (
		<DataGrid
			columns={columns}
			rows={stateFavorites}
			disableColumnSelector 
			disableSelectionOnClick 
			autoHeight
			pageSize={pageSize}
			rowsPerPageOptions={[pageSize]}
			getRowId={(row: any) => row.id}
		/>
	);
};

export default FavoriteTable;


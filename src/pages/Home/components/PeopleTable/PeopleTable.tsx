import React, { useState } from 'react';
import { DataGrid, GridRenderCellParams }  from '@mui/x-data-grid';
import { Person } from '@/models';
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '@/redux/states';
import { AppStore } from '@/redux/store';


export interface PeopleTableInterface {}

const PeopleTable: React.FC<PeopleTableInterface> = () => {
	const pageSize = 5;
	
	const dispatch = useDispatch();
	const statePeople = useSelector((store: AppStore) => store.people );

	const [selectedPeople, setSelectedPeople] = useState<Person[]>([]); 

	const findPerson = (person: Person) => !!selectedPeople.find(p => p.id === person.id);
	const filterPerson = (person: Person) => selectedPeople.filter(p => p.id !== person.id);

	const handleChange = (person: Person) => {
		const filteredPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person];
		dispatch(addFavorite(filteredPeople));
		setSelectedPeople(filteredPeople);
	}

	const columns = [
		// { field: name, headerName: 'Name', flex: 1, minWidth: 150, renderCell: (params: GridRenderCellParams) => <>{params.value + params.row.category}</> },
		{ field: 'actions', headerName: '', type: 'actions', sortable: false, width: 50, renderCell: (params: GridRenderCellParams) => <>{
			<Checkbox size="small" checked={findPerson(params.row)} onChange={ () => handleChange(params.row) } />
		}</> },
		{ field: 'name', headerName: 'Name', flex: 1, minWidth: 150, renderCell: (params: GridRenderCellParams) => <>{params.value}</> },
		{ field: 'category', headerName: 'Category', flex: 1, minWidth: 150, renderCell: (params: GridRenderCellParams) => <>{params.value}</> },
		{ field: 'company', headerName: 'Company', flex: 1, minWidth: 150, renderCell: (params: GridRenderCellParams) => <>{params.value}</> },
	];


	return (
		<DataGrid
			columns={columns}
			rows={statePeople}
			disableColumnSelector 
			disableSelectionOnClick 
			autoHeight
			pageSize={pageSize}
			rowsPerPageOptions={[pageSize]}
			getRowId={(row: any) => row.id}
		/>
	);
};

export default PeopleTable;


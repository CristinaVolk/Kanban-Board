
export default {
		auth_request ( state )
		{
			state.status = 'loading';
		},
		auth_success ( state, token, user )
		{
			state.status = 'success';
			state.token = token;
			state.user = user;
		},
		auth_error ( state )
		{
			state.status = 'error';
		},
		logout ( state )
		{
			state.status = '';
			state.token = '';
		},

		set_initial_data ( state, payload)
		{
		state.items = payload
		},

		// Set Loading State
		set_loading_state ( state, payload )
		{
			state.isLoading = payload;
		},

		addTask ( state, newTask )
		{
			state.items[ "0" ].push( Object.assign( newTask ) );
		},

		// Save Task List Item
		save_task_lane_item ( state, updatedItem )
		{
			const itemIdx = state.items.findIndex( task => task.id == item.id );
			state.items[ itemIdx ].body = updatedItem.body;
		},
		// Delete Task List Item
		delete_task_lane_item( state, deletedTask )
		{
			const itemIdx = state.items.findIndex( task => task.id == deletedTask.id );
			state.items[ itemIdx ];
			state.items.splice( itemIdx, 1 );

		},
		// Reorder Task List Items
		reorder_task_lane_items( state, payload )
		{
			state.items.map( item =>
			{
				if (item.id === payload.id) item.row = payload.columnIndex;
			})
		},

		move_task ( state, {fromItems, toItems, itemSeqNum} )
		{
			const itemToMove = fromItems.splice( itemSeqNum, 1 )[ 0 ];
			toItems.push( itemToMove)
		}
}
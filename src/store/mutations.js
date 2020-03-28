
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
		saveTaskLaneItem ( state, updatedTask )
		{
			const list = state.items.find( (list, index) => list[toString(index)] == updatedTask.row );
			const itemIdx = list.findIndex( item => item.id == updatedTask.id );

			// For existing item
			if ( itemIdx > -1 )
			{
				Vue.set( list.items, itemIdx, updatedTask );
			}
			// For new item
			else
			{
				updatedTask.id = guid();
				list.items.push( updatedTask );
			}
		},

		// Delete Task List Item
		delete_task_lane_item( state, deletedTask )
		{
			const list = state.items.find( ( list, index ) => list[ toString( index ) ] == deletedTask.row );
			const itemIdx = list.findIndex( item => item.id == deletedTask.id );
			// For existing item
			if ( itemIdx > -1 )
			{
				Vue.delete( list.items, itemIdx );
			}
		},
		// Reorder Task List Items
		REORDER_TASKLIST_ITEMS ( state, payload )
		{
			const list = state.items.find( ( list, index ) => list[ toString( index ) ] == payload.id );
			Vue.set( list, "items", payload.items );
		},
		move_task ( state, {fromItems, toItems, itemSeqNum} )
		{
			const itemToMove = fromItems.splice( itemSeqNum, 1 )[ 0 ];
			toItems.push( itemToMove)
		}
}
import Vue from "vue";

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
			state.loading = false
		},

		// Set Loading State
		set_loading_state ( state, payload )
		{
			state.loading = payload;
		},

		addTask ( state, newTask )
		{
			state.items[ "0" ].push( Object.assign( newTask ) );
		},

		// Save Task List Item
		save_task_lane_item ( state, updatedItem )
		{
			const itemIdx = state.items.findIndex( task => task.id === updatedItem.id );
			state.items[ itemIdx ].body = updatedItem.body;
		},
		// Delete Task List Item
		delete_task_lane_item( state, deletedTask )
		{
			const itemIdx = state.items.findIndex( task => task.id == deletedTask.id );
			state.items[ itemIdx ];
			state.items.splice( itemIdx, 1 );

		},

		reorder_items ( state, { itemToPush, relatedItem} )
		{
			const itemToPushIndex = state.items.findIndex( task => task.id == itemToPush.id );
			state.items[ itemToPushIndex ].userId = relatedItem.userId;
		}
}
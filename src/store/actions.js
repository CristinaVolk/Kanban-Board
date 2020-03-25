const INITIAL_DATA_URL = `https://trello.backend.tests.nekidaem.ru/api/v1`
const API_KEY =`2XDXDUHQVJVK`
import axios from 'axios'

export default {
		async login ( { commit }, user )
		{
			return new Promise( ( resolve, reject ) =>
			{
				commit( 'auth_request' );
				axios.post( `${INITIAL_DATA_URL}/users/login&API_KEY=${API_KEY}`, user )
					.then( resp =>
					{
						const token = resp.data.token;
						const user = resp.data.user;
						localStorage.setItem( 'token', token );

						axios.defaults.headers.common[ 'Authorization' ] = token;
						commit( 'auth_success', token, user );
						resolve( resp );
					} )
					.catch( err =>
					{
						commit( 'auth_error' );
						localStorage.removeItem( 'token' );
						reject( err );
					} );
			} );
		},
		async register ( { commit }, user )
		{
			return new Promise( ( resolve, reject ) =>
			{
				commit( 'auth_request' );
				axios.post( `${ INITIAL_DATA_URL}/users/create/`, user)
					.then( resp =>
					{
						const token = resp.data.token;
						const user = resp.data.user;
						localStorage.setItem( 'token', token );

						axios.defaults.headers.common[ 'Authorization' ] = token;
						commit( 'auth_success', token, user );
						resolve( resp );
					} )
					.catch( err =>
					{
						commit( 'auth_error', err );
						localStorage.removeItem( 'token' );
						reject( err );
					} );
			} );
		},
		async logout ( { commit } )
		{
			return new Promise( ( resolve, reject ) =>
			{
				commit( 'logout' );
				localStorage.removeItem( 'token' );
				 delete axios.defaults.headers.common[ 'Authorization' ];
				resolve();
			} );
		},
		
	async fetchData ( { commit } )
	{
		commit( "set_loading_state", true );
		return axios.get( `${ INITIAL_DATA_URL }/cards&API_KEY=${ API_KEY }` ).then( res =>
		{
			commit( "set_initial_data", res.data );
			commit( "set_loading_state", false );
		} );
	},	

	async createTask ( { commit }, newTask )
	{
		const newItem = { ...newTask, ...{ id: guid(), seq_num: 0} }
		commit( "set_loading_state", true );
		return axios.post( `${ INITIAL_DATA_URL }/cards/&API_KEY=${ API_KEY }`, newItem, { id: guid(), seq_num: 0 } ).then( res =>
		{
			commit( "addItem", newItem );
			commit( "set_loading_state", false );
		} );
	},

	async saveTaskLaneItem ( { commit }, updatedTask )
	{
		return axios.patch( `${ INITIAL_DATA_URL }/cards/${updatedTask.id}` )
			.then( res => {
			commit( "save_task_lane_item", updatedTask );
		} );		
	},

	async deleteTaskLaneItem ( { commit }, deletedTask )
	{
		return axios.patch( `${ INITIAL_DATA_URL }/cards/${ deletedTask.id }` )
			.then( res =>
			{
				commit( "delete_task_lane_item", deletedTask );
			} );		
	},
	reorderTaskListItems ( { commit }, payload )
	{
		commit( "reorder_task_lane_items", payload );
	},
};


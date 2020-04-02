import axios from 'axios';
import { authHeader } from '../auth_header'

const INITIAL_DATA_URL_2 = `https://jsonplaceholder.typicode.com/posts`
const INITIAL_DATA_URL = `https://trello.backend.tests.nekidaem.ru/api/v1`
const API_KEY =`2XDXDUHQVJVK`

export default {
		async loginUser ( { commit }, user )
		{
			return new Promise( ( resolve, reject ) =>
			{
				commit( 'auth_request' );
				axios.post( `${ INITIAL_DATA_URL }/users/login/`, user )
					.then( resp =>
					{
						const token = resp.data.token;
						const user = resp.data.user;
						localStorage.setItem( 'user-token', token );

						axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${token}`;
						commit( 'auth_success', token, user );
						resolve( resp );
					} )
					.catch( err =>
					{
						commit( 'auth_error' );
						localStorage.removeItem( 'user-token' );
						reject( err );
					} );
			} );
		},
		async registerUser ( { commit }, user )
		{
			return new Promise( ( resolve, reject ) =>
			{
				commit( 'auth_request' );
				axios.post( `${ INITIAL_DATA_URL}/users/create/`, user)
					.then( resp =>
					{
						const token = resp.data.token;
						const user = resp.data.user;
						localStorage.setItem( 'user-token', token );

						axios.defaults.headers.common[ 'Authorization' ] = token;
						commit( 'auth_success', token, user );
						resolve( resp );
					} )
					.catch( err =>
					{
						commit( 'auth_error', err );
						localStorage.removeItem( 'user-token' );
						reject( err );
					} );
			} );
		},
		async logout ( { commit } )
		{
			return new Promise( ( resolve, reject ) =>
			{
				commit( 'logout' );
				localStorage.removeItem( 'user-token' );
				 delete axios.defaults.headers.common[ 'Authorization' ];
				resolve();
			} );
		},

	async fetchData ( { commit } )
	{
		commit( "set_loading_state", true );

		const requestOptions = {
			headers: authHeader()
		};

		return axios.get( `${ INITIAL_DATA_URL_2 }`, requestOptions)
			.then( res =>
			{
			commit( "set_initial_data", res.data );
			commit( "set_loading_state", false );
		} );
	},

	async createTask ( { commit, state }, newTask )
	{
		state.nextId += 1;
		const newItem = { ...newTask, ...{ id: state.nextId, seq_num: state.nextId} }
		commit( "set_loading_state", true );
		return axios.post( `${ INITIAL_DATA_URL }/cards/&API_KEY=${ API_KEY }`, newItem )
		.then( res =>
		{
			commit( "addItem", newItem );
			commit( "set_loading_state", false );
		} );
	},

	async saveTaskLaneItem ( { commit }, updatedItem)
	{
		/*return axios.patch( `${ INITIAL_DATA_URL }/cards/${updatedItem.id}`, updatedItem )
			.then( res => {*/
		commit( "save_task_lane_item", updatedItem );
		//} );
	},

	async deleteTaskLaneItem ( { commit }, deletedTask )
	{
		/*return axios.patch( `${ INITIAL_DATA_URL }/cards/${ deletedTask.id }` )
			.then( res => {*/
				commit( "delete_task_lane_item", deletedTask );
			//} );
	}
};


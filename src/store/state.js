export default {
		status: '',
		token: localStorage.getItem( 'user-token' ) || false,
		user: {},
		items: [],
		nextId: 1

}
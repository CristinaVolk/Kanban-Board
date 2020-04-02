export default {
		status: '',
		token: localStorage.getItem( 'user-token' ) || false,
		loading: true,
		user: {},
		items: [],
		nextId: 1

}
<template>
	<div class="board">
		<menu-bar></menu-bar>
		<div class="row">
			<div class="col-md">
				<task-lane id="on_hold" title="on_hold" :items="on_hold"></task-lane>
			</div>
			<div class="col-md">
				<task-lane id="inProgress" title="inProgress" :items="inProgress"></task-lane>
			</div>
			<div class="col-md">
				<task-lane id="needs_review" title="needs_review" :items="needs_review"></task-lane>
			</div>
			<div class="col-md">
				<task-lane id="approved" title="approved" :items="approved"></task-lane>
			</div>
		</div>
	</div>
</template>

<script>
	import MenuBar from './MenuBar';	
	import TaskLane from './TaskLane';
	import { mapState } from 'vuex';
	export default {
		name: 'KanbanBoard',
		components: {
			'menu-bar': MenuBar,
			'task-lane': TaskLane
		},

		beforeCreate() {
			this.$store.dispatch( "fetchData" )
		},		
		
		computed: mapState( {
			on_hold: s => s.items["0"],
			inProgress: s => s.items["1"],
			needs_review: s => s.items["2"],
			approved: s => s.items["3"],
		} ),
		methods: {
			register: function ()
			{
				let data = {
					username: this.username,
					email: this.email,
					password: this.password
				}
				this.$store.dispatch( 'register', data )
					.then( () => this.$router.push( '/' ) )
					.catch( err => console.log( err ) )
			}
		}
	};
</script>
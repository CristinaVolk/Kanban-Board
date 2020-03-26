<template>
	<div class="board">
		<menu-bar></menu-bar>
		<div class="row">
			<div class="col-sm-3">
				<task-lane id="0" title="on_hold" :items="on_hold"></task-lane>
			</div>
			<div class="col-sm-3">
				<task-lane id="1" title="inProgress" :items="inProgress"></task-lane>
			</div>
			<div class="col-sm-3">
				<task-lane id="2" title="needs_review" :items="needs_review"></task-lane>
			</div>
			<div class="col-sm-3">
				<task-lane id="3" title="approved" :items="approved"></task-lane>
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
		components: {MenuBar, TaskLane },

		beforeCreate() {
			this.$store.dispatch( "fetchData" )
		},		
		
		computed: mapState( {
			on_hold: s => s.items["0"],
			inProgress: s => s.items["1"],
			needs_review: s => s.items["2"],
			approved: s => s.items["3"],
		} )
	};
</script>

<style>
	.menubar {
		margin-bottom: 16px;
	}

	#space {
		margin: 20px;
	}

	.row {
		display: flex;
	}
	
</style>
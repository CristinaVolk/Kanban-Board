<template>
	<div class="board">
		<menu-bar></menu-bar>
		<div class="row">
			<div class="col-sm-3">
			   <div class="title" style="background: #F67117;" >ON HOLD ({{onHoldItemCount}})</div>
				<task-lane id="0" title="on_hold" :items="on_hold"></task-lane>
				<new-item-form row="0"></new-item-form>
			</div>
			<div class="col-sm-3">
				<div class="title" style="background: #1768F6;">IN PROGRESS	({{inProgressItemCount}})</div>
				<task-lane id="1" title="inProgress" :items="inProgress"></task-lane>
				<new-item-form row="1"></new-item-form>
			</div>
			<div class="col-sm-3">
				<div class="title" style="background: #EEEB00;">NEEDS REVIEW ({{needsReviewItemCount}})</div>
				<task-lane id="2" title="needs_review" :items="needs_review"></task-lane>
				<new-item-form row="2"></new-item-form>
			</div>
			<div class="col-sm-3">
				<div class="title" style="background: #2FAC18;">APPROVED ({{approvedItemCount}})</div>
				<task-lane id="3" title="approved" :items="approved"></task-lane>
				<new-item-form row="3"></new-item-form>
			</div>
		</div>
	</div>
</template>

<script>
	import MenuBar from './MenuBar';
	import TaskLane from './TaskLane';
	import NewItemForm from './NewItemForm';
	import { mapState } from 'vuex';
	export default {
		name: 'KanbanBoard',
		components: {MenuBar, TaskLane, NewItemForm },

		beforeCreate() {
			this.$store.dispatch( "fetchData" )
		},

		computed: mapState( {
			on_hold: state => state.items["0"],
			inProgress: state => state.items["1"],
			needs_review: state => state.items["2"],
			approved: state => state.items["3"],

			onHoldItemCount: state => {
				if( !state.items["0"] ) return ''
				return `${ state.items[ "0" ].length }`;
			},
			inProgressItemCount :state =>
			{
				if ( !state.items[ "1" ] ) return ''
				return `${ state.items[ "1" ].length }`;
			},
			needsReviewItemCount :state => {
				if( !state.items["2"] ) return ''
				return `${ state.items[ "2" ].length }`;
			},
			approvedItemCount :state => {
			if( !state.items[ "3" ] ) return ''
				return `${ state.items[ "3" ].length }`;
			},
		})
	}
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
	.col-sm-3 {
		margin: 30px;
		min-width: 300px;
	}
	.title {
		min-height: 40px;
		padding-top: 20px;
	}

</style>
<template>
	<div class="board">
		<menu-bar></menu-bar>
		<div class="row">
			<div class="col-sm-3">
			   <div class="title" style="background: #F67117;" >ON HOLD ({{onHoldItemCount}})</div>
				<task-lane columnIndex="0" title="on_hold" :items="on_hold"></task-lane>
				<new-item-form row="0"></new-item-form>
			</div>
			<div class="col-sm-3">
				<div class="title" style="background: #1768F6;">IN PROGRESS	({{inProgressItemCount}})</div>
				<task-lane columnIndex="1" title="inProgress" :items="inProgress"></task-lane>
				<new-item-form row="1"></new-item-form>
			</div>
			<div class="col-sm-3">
				<div class="title" style="background: #EEEB00;">NEEDS REVIEW ({{needsReviewItemCount}})</div>
				<task-lane columnIndex="2" title="needs_review" :items="needs_review"></task-lane>
				<new-item-form row="2"></new-item-form>
			</div>
			<div class="col-sm-3">
				<div class="title" style="background: #2FAC18;">APPROVED ({{approvedItemCount}})</div>
				<task-lane columnIndex="3" title="approved" :items="approved"></task-lane>
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
			on_hold: state => state.items.filter( item => item.row === "0"),
			inProgress: state => state.items.filter( item => item.row === "1" ),
			needs_review: state => state.items.filter( item => item.row === "2" ),
			approved: state => state.items.filter( item => item.row === "3" ),

			onHoldItemCount: state =>  !state.items ? `${state.items.filter( item => item.row === "0").length}` : `0`,

			inProgressItemCount : state => !state.items ? `${ state.items.filter( item => item.row === "1" ).length }` : `0`,

			needsReviewItemCount : state => !state.items ? `${ state.items.filter( item => item.row === "2" ).length }` : `0`,

			approvedItemCount : state => !state.items ? `${ state.items.filter( item => item.row === "3" ).length }` : `0`
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
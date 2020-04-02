<template>
	<div class="board">
		<div v-if="isLoading"> Loading...</div>
		<div v-else class="row">
			<div class="col-sm-3">
			   <div class="title" style="background: #F67117;" >ON HOLD ({{onHoldItemCount}})</div>
				<task-lane columnIndex="0" :items="on_hold"></task-lane>
				<new-item-form row="0"></new-item-form>
			</div>
			<div class="col-sm-3">
				<div class="title" style="background: #1768F6;">IN PROGRESS	({{inProgressItemCount}})</div>
				<task-lane columnIndex="1" :items="inProgress"></task-lane>
				<new-item-form row="1"></new-item-form>
			</div>
			<div class="col-sm-3">
				<div class="title" style="background: #EEEB00;">NEEDS REVIEW ({{needsReviewItemCount}})</div>
				<task-lane columnIndex="2" :items="needs_review"></task-lane>
				<new-item-form row="2"></new-item-form>
			</div>
			<div class="col-sm-3">
				<div class="title" style="background: #2FAC18;">APPROVED ({{approvedItemCount}})</div>
				<task-lane columnIndex="3" :items="approved"></task-lane>
				<new-item-form row="3"></new-item-form>
			</div>
		</div>
	</div>
</template>

<script>
	import TaskLane from './TaskLane';
	import NewItemForm from './NewItemForm';
	import { mapState } from 'vuex';
	export default {
		name: 'KanbanBoard',
		components: { TaskLane, NewItemForm },
		computed: mapState( {
			isLoading: state => state.loading,
			on_hold: state => state.items.filter( item => item.userId === 1),
			inProgress: state => state.items.filter( item => item.userId  === 2 ),
			needs_review: state => state.items.filter( item => item.userId  === 3),
			approved: state => state.items.filter( item => item.userId  === 4 ),

			onHoldItemCount: state =>  !state.items ? `${state.items.filter( item => item.userId  === 1).length}` : `0`,

			inProgressItemCount : state => !state.items ? `${ state.items.filter( item => item.userId  === 2 ).length }` : `0`,

			needsReviewItemCount : state => !state.items ? `${ state.items.filter( item => item.userId  ===3 ).length }` : `0`,

			approvedItemCount : state => !state.items ? `${ state.items.filter( item => item.userId  === 4 ).length }` : `0`
		})
	}
</script>

<style>
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
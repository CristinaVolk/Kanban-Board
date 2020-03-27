<template>
	<div class="card">
		<div class="card-body">
			<draggable v-model="draggables" :options="{ group: 'default' }">
				<div v-for="item in items"
				:key="item.id"
				@drop = "moveTask($event, items)"
				@dragover.prevent
				@dragenter.prevent
				>
					<item id="item-lane"
					:item="item"
					draggable
					@dragstart = "pickupItem($event, item.id, columnIndex)"></item>
				</div>
			</draggable>
		</div>

	</div>
</template>

<script>
	import Draggable from 'vuedraggable';
	import TaskLaneItem from './TaskLaneItem';
	import { mapActions } from "vuex"
	export default {
		name: 'TaskLane',
		props: [ 'items', 'title', 'columnIndex' ],
		components: {
			item: TaskLaneItem,
			draggable: Draggable
		},
		computed:
		{
		draggables:
		{
			get()
			{
				return this.items;
			},
			set( reorderedListItems )
			{
				const payload = {
					id: this.id,
					items: reorderedListItems
				}
				this.$store.commit.reorderTaskListItems( payload )
			}
		}
	},
	methods: {
		pickupTask(e, itemIndex, fromColumnIndex){
			e.dataTransfer.effectAllowed = 'move'
			e.dataTransfer.dropEffect = 'move'

			e.dataTransfer.setData(item-index, itemIndex)
			e.dataTransfer.setData('from-column-index', fromColumnIndex)
		},
		moveTask (e, toTasks) {

		}
	}
}
</script>

<style>
	.card-body>* {
		min-height: 50px;
		min-width: 400px;
	}


</style>
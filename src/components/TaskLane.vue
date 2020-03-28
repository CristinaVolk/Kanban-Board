<template>
	<div class="card">
		<div class="card-body">
				<div v-for="item in items"
				:key="item.id"
				@drop = "moveItem($event, items)"
				@dragover.prevent
				@dragenter.prevent
				draggable
				@dragstart = "pickupItem($event, item.seq_num, columnIndex)"
				>
				<task-lane-item :item="item"></task-lane-item>
				</div>
		</div>

	</div>
</template>

<script>
	//import Draggable from 'vuedraggable';
	import TaskLaneItem from './TaskLaneItem';
	import { mapActions } from "vuex"
	export default {
		name: 'TaskLane',
		props: [ 'columnIndex', 'title', 'items' ],
		components: { TaskLaneItem
			//draggable: Draggable
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
	methods:  {
		pickupItem(event, itemISeqNum, fromColumnIndex){
			event.dataTransfer.effectAllowed = 'move'
			event.dataTransfer.dropEffect = 'move'

			event.dataTransfer.setData('item-seq_num', itemISeqNum)
			event.dataTransfer.setData('from-column-index', fromColumnIndex)
		},
		moveItem (event, toItems) {
			const fromColumnIndex = event.dataTransfer.getData('from-column-index')
			const fromItems = this.$store.state.items.filter(item => item.row == fromColumnIndex)
			const itemSeqNum = event.dataTransfer.getData('item-seq_num')

			this.$store.commit('move_task', { fromItems, toItems, itemSeqNum})

		}
	}
}
</script>


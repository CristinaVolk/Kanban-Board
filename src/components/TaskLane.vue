<template>
	<div class="card">
		<div class="card-body">
			<draggable v-model="draggables" :options="{ group: 'default' }">
				<div v-for="item in items"
				:key="item.id"
				@dragover.prevent
				@dragenter.prevent
				draggable = "true"
				>
				<item :item="item"></item>
				</div>
				</draggable>
		</div>

	</div>
</template>

<script>
	import Draggable from 'vuedraggable';
	import TaskLaneItem from './TaskLaneItem';
	import { mapMutations, mapActions } from 'vuex'
	export default {
		name: 'TaskLane',
		props: [ 'columnIndex', 'title', 'items' ],
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
					itemId: item.id,
					items: reorderedListItems,
					columnIndex: this.columnIndex

				}
				this.reorderTaskListItems( payload )
			}
		}
	},
		methods:  {
			//...mapMutations(['move_task']),
			...mapActions(['reorderTaskListItems']),

			/*pickupItem(event, itemISeqNum, fromColumnIndex){
				event.dataTransfer.effectAllowed = 'move'
				event.dataTransfer.dropEffect = 'move'

				event.dataTransfer.setData('item-seq_num', itemISeqNum)
				event.dataTransfer.setData('from-column-index', fromColumnIndex)
			},
			moveItem (event, toItems) {
				const fromColumnIndex = event.dataTransfer.getData('from-column-index')
				const fromItems = this.$store.state.items.filter(item => item.row == fromColumnIndex)
				const itemSeqNum = event.dataTransfer.getData('item-seq_num')

				this.move_task({ fromItems, toItems, itemSeqNum, columnIndex})
			}*/
		}
}
</script>

<style>
	.card-body>* {
		min-height: 50px;
	}
</style>

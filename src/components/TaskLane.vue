<template>
	<div class="card">
		<div class="card-body">
		
				<div v-for="item in items" :key="item.id" @drop="moveItem($event, items)" @dragover.prevent @dragenter.prevent
					draggable="true" @dragstart="pickupItem($event, item.seq_num, columnIndex)">
					<item :item="item"></item>
				</div>
			
		</div>

	</div>
</template>

<script>
	import TaskLaneItem from './TaskLaneItem';
	import { mapMutations } from 'vuex'
	export default {
		name: 'TaskLane',
		props: [ 'columnIndex', 'title', 'items' ],
		components: {
			item: TaskLaneItem
		},
		computed:
		{
	},
		methods:  {
			...mapMutations(['move_task']),

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

				this.move_task({ fromItems, toItems, itemSeqNum})
			}
		}
}
</script>

<style>
	.card-body>* {
		min-height: 50px;
	}
</style>

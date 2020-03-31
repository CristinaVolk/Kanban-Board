<template>
	<div class="card">
		<div class="card-body"
			@drop='onDrop($event, items)'
			@dragover.prevent
      		@dragenter.prevent >
				<div
					v-for="(item, index) in items"
					:key="item.id"
					draggable
					@dragstart='startDrag($event, item)'>
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
		props: [ 'columnIndex','items' ],
		components: {
			item: TaskLaneItem
		},
		methods: {
			startDrag: ( evt, item ) =>
			{
				evt.dataTransfer.dropEffect = 'move'
				evt.dataTransfer.effectAllowed = 'move'
				evt.dataTransfer.setData( 'itemID', item.id )
			},
			onDrop( evt, toItems )
			{
				const itemID = evt.dataTransfer.getData( 'itemID' )
				this.$store.commit('reorder_items', {itemID, toItems});
			}
		}
}
</script>

<style>
	.card-body>* {
		min-height: 50px;
	}
</style>

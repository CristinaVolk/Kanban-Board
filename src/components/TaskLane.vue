<template>
	<div class="card">
		<draggable
		v-model="itemList" group="tasks" @start="drag=true" @clone = "clone = false" :move='onMove'>
				<div
					v-for="(item, index) in itemList"
					:key="index">
						<item :item="item"></item>
				</div>
		</draggable>
	</div>
</template>

<script>
	import Vue from 'vue'
	import TaskLaneItem from './TaskLaneItem';
	import { mapMutations } from 'vuex'
	import draggable from 'vuedraggable'

	export default {
		name: 'TaskLane',
		props: [ 'columnIndex','items' ],
		data () {
			 return {itemList: this.items}
		},
		components: {
			item: TaskLaneItem,
			draggable
		},
		methods: {
			onMove: function ( evt )
			{
				const fromItems = evt.draggedContext
				const toItems = evt.relatedContext.list;
				const itemToPush = evt.draggedContext.element;
				const relatedItemIndex = evt.relatedContext.index;
				toItems.splice( relatedItemIndex, 0, itemToPush)

				this.$store.commit( 'reorder_items', {
					itemToPush: itemToPush,
					relatedItem: evt.relatedContext.element,
				} );
			}
		}
}
</script>

<style>
	.card-body>* {
		min-height: 50px;
	}
</style>

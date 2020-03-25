<template>
	<div class="card">
		<div class="card-body">
			<draggable v-model="draggables" :options="{ group: 'default' }">
				<div v-for="item in items" :key="item.id">
					<item :item="item"></item>
				</div>
			</draggable>
		</div>
		<div class="card-footer text-muted">
			{{itemCount}}
		</div>
	</div>
</template>

<script>
	import Draggable from 'vuedraggable';
	import TaskLaneItem from './TaskLaneItem';
	import { mapActions } from "vuex"
	export default {
		name: 'TaskLane',
		props: [ 'items', 'title', 'id' ],
		components: {
			item: TaskLaneItem,
			draggable: Draggable
		},
		computed: 
		{
			itemCount()
			{
				if ( !this.items ) return '';
				if ( this.items.length === 1 ) return '1 task';
				return `${ this.items.length } tasks`;
			},		
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
	}
}
</script>

<style>
	.card-body>* {
		min-height: 50px;
	}
</style>
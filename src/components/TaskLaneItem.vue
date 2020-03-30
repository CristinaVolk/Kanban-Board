<template>
	<div class="card task-lane-item">
		<div class="card-block">
			<div class ="flex flex-col flex-grow items-start justify-between px-4">
				id: {{item.id}}
				<input
					type="text"
					class="p-2 w-full mr-2 block text-xl font-bold"
					:value = "item.title"
					>
				<textarea
					class="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading normal"
					:value = "item.body"
					@change = "handleChange($event)"
					>
				</textarea>
					<button class="btn btn-outline-secondary btn-sm mr-2" @click.prevent="updateItem">
							Save
					</button>
					<button class="btn btn-sm text-danger" @click.prevent="remove">
							Delete
					</button>

			</div>
		</div>
	</div>
</template>


<script>
	import { mapActions } from "vuex"
	export default {
		name: 'TaskLaneItem',
		props: [ 'item' ],

		methods:
		{
			handleChange( $event ) {
				this.item.body = event.target.value
			},
			updateItem()
			{
				this.$store.dispatch('saveTaskLaneItem', this.item)
			},
			cancel()
			{
				this.$emit( "item-cancelled" )
			},
			remove()
			{
				this.$store.dispatch('deleteTaskLaneItem', this.item)
				this.$emit( "item-deleted" )
			}
		}

	};


</script>

<style>
	.card.task-lane-item {
		background: #627180;
		margin-top: 20px;
	}
</style>
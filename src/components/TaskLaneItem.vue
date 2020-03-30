<template>
	<div class="card task-lane-item">
		<div class="card-block">
			<div class ="flex-container">
				<span>id: {{item.id}}</span>
					<button class="button button-close" @click.prevent="remove">
						x
					</button>
					<div contenteditable class="describtion" :value="item.body" @change="updateItem($event)">{{item.body}}
					</div>
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
		{ ...mapActions(['saveTaskLaneItem', 'deleteTaskLaneItem']),

			updateItem()
			{
				this.item.body = event.target.value
				console.log(this.item)
				this.saveTaskLaneItem(this.item)
			},
			remove()
			{
				this.deleteTaskLaneItem(this.item)
			}
		}

	};


</script>

<style>
	.card-block {
		background: rgb(29, 28, 32);
		margin-top: 10px;
		height: 155px;
	}
	.card.task-lane-item {
		background: rgb(29, 28, 32);
		height: 100%;
	}
	.flex-container {
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: flex-start;
		background-color: rgb(3, 3, 3);
		top: 10px;
    	right: 10px;
    	left: 10px;
		width: 280px;
		height: 75%;

	}
	.button-close {
		position: absolute;
    	float: right;
		border: none;
		color: rgb(191, 197, 216);
		background-color: rgb(3, 3, 3);
		top: 1px;
    	right: 1px;
	}
	.describtion {
		height: 100%;
		overflow:hidden;
		text-align: left;
		padding-top: 5px;
		font-size: 0.9em;
	}
</style>
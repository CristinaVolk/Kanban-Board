<template>
	<div class="card task-lane-item" v-if="!isEditing" @click.prevent="startEditing">
		<div class="card-block">
			<div :class="[isNewItem ? 'text-center text-dark font-weight-bold disable-select' : 'text-dark disable-select']">
				<span v-if="item.id" class ="w-full flex-no-shrink font-bold"
				>{{item.id}}</span>
				<p
				class="w-full flex-no-shrink mt-1 text-sm"> {{ displayText }} </p>
			</div>
		</div>
	</div>

	<div class="card" v-else>
		<div class="card-block">
			<form class="form">
				<div class="form-group">
					<textarea
						class = "relative bg-transparent px-2 border mt-2 h-64 border-none leading normal"
						name="itemDetails"
						rows="3"
						v-model.trim="form.text"
						v-validate="'required'"
						data-vv-as="Item Details"
						placeholder="Your item description">
					</textarea>
						<small class="text-danger">{{ errors.first("itemDetails") }}</small>
				</div>


				<div :class="[isNewItem ? 'text-center' : 'd-flex justify-content-between', 'form-group']">
					<div>
						<button class="btn btn-outline-secondary btn-sm mr-2" @click.prevent="save">
							Save
						</button>
						<button class="btn btn-outline-secondary btn-sm" @click.prevent="cancel">
							Cancel
						</button>
					</div>
					<div v-show="!isNewItem">
						<button class="btn btn-sm text-danger" @click.prevent="remove">
							Delete
						</button>
					</div>
				</div>
		    </form>
		</div>
	</div>
</template>


<script>
	import { mapActions } from "vuex"
	export default {
		name: 'TaskLaneItem',
		props: [ 'item' ],

		data()
			{
				return {
					isEditing: false,
					form: {
						id: "",
						text: ""
					}
				}
			},

		computed:
		{
			isNewItem() {
			return this.item.id == ""
			},
			displayText() {
				return this.isNewItem ? "+ New Item" : this.item.text }
		},
		methods:
		{
			...mapActions( {
				saveTaskListItem: "saveTaskLaneItem",
				deleteTaskListItem: "deleteTaskLaneItem"
			} ),
			startEditing()
			{
				this.form.id = this.item.id
				this.form.text = this.item.text
				this.isEditing = true
				this.$emit( "item-editing" )
			},
			clearForm()
			{
				this.form.id = ""
				this.form.text = ""
			},
			save()
			{
				this.$validator.validateAll().then( result =>
				{
					if ( result )
					{
					const updatedItem = {
					id: this.form.id,
					text: this.form.text
					}
						this.saveTaskLaneItem( { item: updatedItem } )
						this.isEditing = false
						this.$emit( "item-edited" )
						this.$validator.reset()
					}
				} )
			},
			cancel()
			{
				this.isEditing = false
				this.$emit( "item-cancelled" )
			},
			remove()
			{
				this.deleteTaskLaneItem( { item: this.item } )
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
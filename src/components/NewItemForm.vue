<template>
	<div class="add-item">
		<form action="#" method="post" v-on:submit.prevent="submitForm">
			<input type="text" v-model="text" value="A description of the task" :placeholder="text">
		</form>
	</div>
</template>

<script>
	export default {
		name: 'NewItemForm',
		data()
		{
			return {
				text: '',
			};
		},
		methods: {
			submitForm()
			{
				if ( this.text )
				{
					let newTask = {
							row: "0",
							text: this.text,
					}
					this.$store.dispatch( 'createTask', newTask )
						.then( () => this.$router.push( '/' ) )
						.catch( err => console.log( err ) )
				}
					this.text = '';
			}
		}
	};
</script>

<style>
	.add-item input {
		outline: none;
		border: 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
		width: 100%;
		transition: all 0.25s;
		background: inherit;
		color: black
		;
	}

	.add-item input:focus {
		border-bottom-color: rgba(255, 255, 255, 1);
	}

	.add-item {
		margin: 30px 0;
	}
</style>
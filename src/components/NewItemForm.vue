<template>
	<div class="add-item">
		<form action="#" method="post" v-on:submit.prevent="submitForm">
			<input type="text" class="block p-2 w-full bg-transparent" v-model="text" placeholder="Add a card" @keyup.enter="submitForm">
		</form>
	</div>
</template>

<script>
	export default {
		props: ["row"],
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
							row: this.row,
							text: this.text
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
		color: whitesmoke
		;
	}

	.add-item input:focus {
		border-bottom-color: rgba(255, 255, 255, 1);
	}

	.add-item {
		margin: 30px 0;
	}

	::placeholder {
  		color:whitesmoke;
	}
</style>
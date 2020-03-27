<template>
	<div class="backlog-view">
		<menu-bar></menu-bar>
		<new-item-form></new-item-form>

		<div class="card" v-for="item in items" :key="item.id">
			<div class="card-block">
				<h5 style="color: whitesmoke;" class="card-title">
					<span class="text-muted">#{{item.id}}</span>
					{{item.title}}
					<span :class="badgeClass(item)">{{badgeText(item)}}</span>
				</h5>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import MenuBar from './MenuBar';
	import NewItemForm from './NewItemForm';
	const badgeDetail = {
		on_hold: {
			text: 'on_hold',
			class: 'badge badge-light'
		},
		inProgress: {
			text: 'inProgress',
			class: 'badge badge-info'
		},
		needs_review: {
			text: 'needs_review',
			class: 'badge badge-info'
		},
		approved: {
			text: 'approved',
			class: 'badge badge-success'
		}
	};
	export default {
		name: 'Backlog',
		components: { MenuBar, NewItemForm },
		computed: mapState( {
			items: state => [ ...state.items["0"], ...state.items["1"], ...state.items["2"], ...state.items["3"] ]
		} ),
		methods: {
			itemLane( item )
			{
				if ( this.$store.state.items["0"].includes( item ) )
				{
					return 'on_hold';
				}
				if ( this.$store.state.items["1"].includes( item ) )
				{
					return 'inProgress';
				}
				if ( this.$store.state.items["2"].includes( item ) )
				{
					return 'needs_review';
				}
				return 'approved';
			},
			badgeText( item )
			{
				const lane = this.itemLane( item );
				return badgeDetail[ lane ].text;
			},
			badgeClass( item )
			{
				const lane = this.itemLane( item );
				return badgeDetail[ lane ].class;
			}
		}
	};
</script>
<script>
	// import { goto } from '$app/navigation';
	// import { onMount } from 'svelte';
	import UserManagement from '$lib/components/UserManagement.svelte';
	import { ProgressBar, InputChip, modalStore } from '@skeletonlabs/skeleton';

	let loading = false;
	export let data;
	const { users, roles } = data;
	console.log(roles);

	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	let searchTerm = [];

	//  Filters the users data according to searchTerms from the input field
	$: filteredUsers =
		searchTerm.length > 0
			? users.filter((user) =>
					searchTerm.every(
						(term) =>
							user.firstName.toLowerCase().includes(term.toLowerCase()) ||
							user.lastName.toLowerCase().includes(term.toLowerCase()) ||
							user.role_name.toLowerCase().includes(term.toLowerCase()) ||
							user.email.toLowerCase().includes(term.toLowerCase())
					)
			  )
			: users;

	//  Makes the table layout
	$: table = {
		// A list of heading labels.
		head: ['firstName', 'lastName', 'role', 'email'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(filteredUsers, ['firstName', 'lastName', 'role_name', 'email']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(filteredUsers, ['firstName', 'lastName', 'role_name', 'email', 'id']),
		// Optional: A list of footer labels.
		foot: ['Total', '', `<code class="code">${filteredUsers.length}</code>`]
	};

	function selectionHandler(e) {
		const modalComponent = {
			ref: UserManagement,
			props: { User: e.detail, roles },
			slot: '<p>Skeleton</p>'
		};
		const modal = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}
</script>

<!-- // TODO: UsersAccordion component, with a loading prop -->
{#if loading}
	<ProgressBar meter="variant-filled-primary" />
{:else}
	<!-- TODO: Add modal when clicked to edit user -->
	<InputChip bind:value={searchTerm} name="chips" placeholder="Search users ..." class="m-4" />
	<Table source={table} class=" p-4" interactive="true" on:selected={selectionHandler} />
{/if}

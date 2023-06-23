<script>
	import { Table, tableSourceMapper, tableMapperValues, SlideToggle } from '@skeletonlabs/skeleton';
	import { resetNotifications } from '$lib/helpers/resetNotifications.js';
	import { onMount } from 'svelte';

	export let data;
	// console.log(data);
	const { data: notifications } = data;

	const readableNotifications = notifications.map((notification) => {
		const date = new Date(notification.created_at);
		notification.created_at = date.toLocaleString();
		return notification;
	});

	const filteredNotifications = readableNotifications.filter((notification) => {
		return notification.visible === 1;
	});

	let showInvisible = false;

	$: tableSource = showInvisible ? readableNotifications : filteredNotifications;
	// console.log(filteredNotifications);

	$: tableSimple = {
		// A list of heading labels.
		head: ['Message', 'Date'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(tableSource, ['message', 'created_at']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(tableSource, ['id']),
		// Optional: A list of footer labels.
		foot: ['Total', '', "<code class='code'>" + tableSource.length + '</code>']
	};

	onMount(() => {
		resetNotifications();
	});
</script>

<main class="p-6">
	<h1>Notifications page</h1>
	<div>
		<SlideToggle name="slide" bind:checked={showInvisible} />
		{showInvisible ? '' : 'Show hidden'}
	</div>
	<Table source={tableSimple} />
</main>

<style>
	div {
		display: flex;
		align-items: center;
		gap: 10px;
	}
</style>

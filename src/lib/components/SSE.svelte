<script>
	import { onMount } from 'svelte';
	import { notifications } from '$lib/stores/notifications';
	export let role;

	let message = '';
	$: console.log(message);

	onMount(() => {
		const eventSource = new EventSource('http://127.0.0.1:3000/sse');

		// Message is default when you use client.write and dont give an event
		eventSource.addEventListener('message', (event) => {
			console.log(event);

			const eventData = JSON.parse(event.data);
			console.log(eventData);
			message = event.data;
		});

		// If you give an event you have to listen for it
		eventSource.addEventListener('notification', (event) => {
			const eventData = JSON.parse(event.data);
			const { target } = eventData;
			console.log(target);

			if (target === role || target == '*') {
				notifications.increment();
				console.log($notifications);
			}

			// message = event.data;
		});

		return () => {
			eventSource.close();
		};
	});
</script>

<!-- <h1>{message}</h1> -->

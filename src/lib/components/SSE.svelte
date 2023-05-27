<script>
	import { onMount } from 'svelte';
	import { notifications } from '$lib/stores/notifications';

	let message = '';

	onMount(() => {
		const eventSource = new EventSource('http://127.0.0.1:3000/sse');

		eventSource.addEventListener('message', (event) => {
			console.log(event.data);
			message = event.data;
			notifications.increment();
		});

		return () => {
			eventSource.close();
		};
	});
</script>

<!-- <h1>{message}</h1> -->

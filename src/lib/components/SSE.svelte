<script>
	import { onMount } from 'svelte';

	let message = '';

	onMount(() => {
		const eventSource = new EventSource('http://127.0.0.1:3000/sse');

		eventSource.addEventListener('message', (event) => {
			message = event.data;
		});

		return () => {
			eventSource.close();
		};
	});
</script>

<h1>{message}</h1>

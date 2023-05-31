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

		/* This code is adding an event listener to the `eventSource` object for the "notification" event. 
	When a "notification" event is received, the code parses the event data as JSON and extracts the "target"
	 property from the data. If the "target" property matches the "role" variable or is equal to "*", 
	 the code increments the "notifications" store and logs the updated value of the store to the console. 
	 This code is  used to handle real-time notifications for the user based on their role.*/
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

		/* This is a cleanup function that is executed when the component is unmounted. 
		It closes the EventSource connection to prevent memory leaks and ensure
		 that the connection is properly closed.*/
		return () => {
			eventSource.close();
		};
	});
</script>

<!-- <h1>{message}</h1> -->

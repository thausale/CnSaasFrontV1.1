<script>
	import Pusher from 'pusher-js';
	import { User } from '$lib/components/stores';
	import { notifications } from '$lib/stores/notifications';
	import { invalidate } from '$app/navigation';
	import { PUBLIC_PUSHER_KEY } from '$env/static/public';
	import { onDestroy, onMount } from 'svelte';
	export let user;
	Pusher.logToConsole = true;

	let pusher;

	onMount(() => {
		const pusher = new Pusher(PUBLIC_PUSHER_KEY, {
			cluster: 'eu'
		});

		const channel = pusher.subscribe('default');
		channel.bind('notification', function (event) {
			// console.log(JSON.stringify(event));
			const { message, target } = event;
			if (target == user.role_id) {
				console.log('ids match');

				notifications.increment();
			}

			console.log('message', message, 'target', target);
		});
	});

	onDestroy(() => {
		if (pusher) {
			pusher.disconnect();
		}
	});
</script>

<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss';
	import {AppShell, AppBar, Avatar } from "@skeletonlabs/skeleton" 
	import Navigation from '$lib/components/Navigation.svelte';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import Clock from '$lib/components/Clock.svelte';
	import { get } from 'svelte/store';

	import { localStorageUser } from '$lib/components/stores';
	const {initials} = $localStorageUser
	function drawerOpen(){
		drawerStore.open()
	}

	console.log($localStorageUser.initials)
</script>

<Drawer>
	<Navigation/>
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10 ">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<Clock />


			<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen} >
				<span>

					<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
						<rect width="100" height="20"/>
						<rect y="30" width="100" height="20"/>
						<rect y="60" width="100" height="20"/>
						
					</svg>
				</span>
			</button>
			</svelte:fragment>
			<svelte:fragment slot="trail">(actions)
			<Avatar initials={initials} />
			</svelte:fragment>
			<!-- TODO: Maybe put the notifications bar in the headline -->
			<!-- <svelte:fragment slot="headline">(headline)</svelte:fragment> -->
		</AppBar>

	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
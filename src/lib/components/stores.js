import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';

export const localStorageUser = localStorageStore('localStorageUser', {
	name: 'frank',
	role: 'operator',
	initials: 'cn'
});

import { localStorageStore } from '@skeletonlabs/skeleton';

export const User = localStorageStore('User', {
	firstName: 'testing this stuff',
	lastName: '',
	role: '',
	initials: '',
	email: '',
	permissions: '',
	user: {},
	functions: []
});

export const Token = localStorageStore('Token', {});

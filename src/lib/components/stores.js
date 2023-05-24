import { localStorageStore } from '@skeletonlabs/skeleton';

export const User = localStorageStore('User', {
	firstName: '',
	lastName: '',
	initials: '',
	email: '',
	permissions: '',
	user: {},
	functions: [],
	role_data: { role: 'operator' }
});

export const Token = localStorageStore('Token', {});

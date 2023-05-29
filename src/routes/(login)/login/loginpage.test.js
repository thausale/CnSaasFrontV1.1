import { render, fireEvent, cleanup } from '@testing-library/svelte';
import login from './+page.svelte';
import { expect, it, afterEach } from 'vitest';

it('true is true', () => {
	expect(true);
});

it('renders login page', () => {
	const { getByText } = render(login, { form: {} });

	// Example assertion: check if a specific element exists
	expect(getByText('Login to cnSaas').textContent).to.equal('Login to cnSaas');
});

it('shows form error messages', async () => {
	const { getByText } = render(login, { form: { error: 'test error' } });

	const errorMessage = getByText('test error');
	expect(errorMessage.textContent).to.equal('test error');
});

it('true is true'),
	() => {
		expect(true);
	};

it('renders login page and fills in login fields', async () => {
	const { getByLabelText, getAllByLabelText } = render(login, { form: {} });

	const emailInput = getByLabelText('Email');
	const passwordInput = getByLabelText('Password');

	// Fill in the email and password fields
	await fireEvent.input(emailInput, { target: { value: 'admin@admin' } });
	await fireEvent.input(passwordInput, { target: { value: 'password' } });

	// Check that the fields were filled in correctly
	expect(emailInput.value).to.equal('admin@admin');
	expect(passwordInput.value).to.equal('password');
});

afterEach(() => {
	cleanup();
});

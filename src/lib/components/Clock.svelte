<script>
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	let time = getTime();
	let date = getDate();

	function getTime() {
		const now = new Date();
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const seconds = now.getSeconds().toString().padStart(2, '0');

		return `${hours}:${minutes}:${seconds}`;
	}

	function getDate() {
		const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		const now = new Date();
		const day = now.getDay() - 1;
		const dayString = day == -1 ? 'sun' : daysOfWeek[day];
		const dayNumber = now.getDate();
		const month = monthNames[now.getMonth()];
		return `${dayString} ${dayNumber} ${month}  `;
	}

	setInterval(() => {
		time = getTime();
	}, 1000);
	setInterval(() => {
		date = getDate();
	}, 1000);
</script>

<div style=" padding: 5px;">
	<p>{time}</p>
	<p>{date}</p>
</div>

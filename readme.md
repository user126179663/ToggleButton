```HTML
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
		<title>Toggle Button</title>
		<script src="toggle-button.js"></script>
		<script>addEventListener('DOMContentLoaded', () => document.querySelector('toggle-button').addEventListener('toggled', () => document.body.classList.toggle('toggled')));</script>
		<style>.toggled { background-color: black; } toggle-button { display: block; height: 3rem; margin: .5rem; }</style>
		<link id="toggle-button-css" rel="stylesheet" href="sample.css" disabled>
	</head>
	<body>
		
		<toggle-button toggle-css="#toggle-button-css"></toggle-button>
		
		<toggle-button toggle-css="#toggle-button-css" activated disabled></toggle-button>
		
	</body>
</html>
```
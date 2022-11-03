```HTML
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
		<title>Toggle Button</title>
		<script src="toggle-button.js"></script>
		<style>toggle-button { display: block; margin: .5rem; }</style>
		<link id="toggle-button-style" rel="stylesheet" href="sample.css" disabled>
	</head>
	<body>
		
		<toggle-button toggle-css="#toggle-button-style"></toggle-button>
		
		<toggle-button toggle-css="#toggle-button-css" activated disabled></toggle-button>
		
	</body>
</html>
```
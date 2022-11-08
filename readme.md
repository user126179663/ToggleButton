```HTML
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
		<title>Toggle Button</title>
		<script src="toggle-button.js"></script>
		<script>
			addEventListener('DOMContentLoaded', () => document.querySelectorAll('toggle-button').forEach(target => target.addEventListener('toggled', () => document.body.classList.toggle('toggled'))), { once: true });
		</script>
		<style>
			
			.toggled { background-color: black; }
			
			toggle-button {
				
				--size: 3rem;
				--opposite-size: calc(var(--size) * 1.618);
				
				display: inline-block;
				height: var(--size);
				width: var(--opposite-size);
				margin: .5rem;
				
			}
			
			.vertical toggle-button {
				
				height: var(--opposite-size);
				width: var(--size);
				
			}
			
		</style>
		<link id="toggle-button-css" rel="stylesheet" href="sample.css" disabled>
		<link id="toggle-button-vertical-css" rel="stylesheet" href="sample-vertical.css" disabled>
	</head>
	
	<body>
		
		<div>
			<toggle-button toggle-css="#toggle-button-css"></toggle-button>
			<toggle-button toggle-css="#toggle-button-css" activated disabled></toggle-button>
		</div>
		
		<div class="vertical">
			<toggle-button toggle-css="#toggle-button-vertical-css"></toggle-button>
			<toggle-button toggle-css="#toggle-button-vertical-css" activated disabled></toggle-button>
		</div>
		
	</body>
	
</html>
```
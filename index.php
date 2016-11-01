
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="main.min.css" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

	<div class="snake-screen">
		<?php for($y=0; $y<50; $y++): ?>
			<div class="snake-row">
				<?php for($x=0; $x<50; $x++): ?>
					<div class="snake-col" x="<?php echo $x; ?>" y="<?php echo $y; ?>"></div>
				<?php endfor; ?>
			</div>
		<?php endfor; ?>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="js.js"></script>

</body>
</html>

function colorDiv(target, color){
	var div = document.getElementById(target);
	div.style.backgroundColor = color;
}

var colorOptions = ['hsl(310, 40%, 70%)', 'hsl(50, 100%, 60%)', 'hsl(120, 70%, 60%)', 'hsl(10, 50%, 50%)', 'hsl(180, 60%, 70%)'];

colorDiv('ball_1',colorOptions[0])
colorDiv('ball_2',colorOptions[1])
colorDiv('ball_3',colorOptions[2])
colorDiv('ball_4',colorOptions[3])
colorDiv('ball_5',colorOptions[4])
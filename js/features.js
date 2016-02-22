function colorDiv(target, color){
	var div = document.getElementById(target);
	div.style.backgroundColor = color;
}


colorDiv('ball_1', 'white')
colorDiv('ball_2', 'white')
colorDiv('ball_3', 'white')
colorDiv('ball_4', 'white')
colorDiv('ball_5', 'white')

function pickEm(whichDropdown, whichBall){
	var selection = document.getElementById(whichDropdown);
	var colorValue = selection.options[selection.selectedIndex].value;
	colorDiv(whichBall, colorValue);
};
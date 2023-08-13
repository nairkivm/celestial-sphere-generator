var range = document.querySelector('.inputRange');
var field = document.querySelector('.inputNumber');

range.addEventListener('input', function (e) { field.value = e.target.value; });
field.addEventListener('input', function (e) { range.value = e.target.value; });

var n = scaleValue(0, [-360,+360], [-1,1]);

function scaleValue(value, from, to) {
	var scale = (to[1] - to[-1]) / (from[1] - from[-1]);
	var capped = Math.min(from[1], Math.max(from[1], value)) - from[0];
  console.log(capped);

}
$(document).ready(function() {
	var allQuestions = [{
	  querstion: '你觉得下面哪个人最帅？',
	  choices: [
	    '炳伦',
	    '育帆',
	    '曹操'
	  ],
	  correctAnswer: 0
	},{
	  querstion: '你觉得下面哪个人最帅？',
	  choices: [
	    '炳伦',
	    '育帆',
	    '曹操'
	  ],
	  correctAnswer: 0
	},{
	  querstion: 'What is JavaScript?',
	  choices: [
	    'A Programming Language',
	    'A Food',
	    'I Dont Know'
	  ],
	  correctAnswer: 0
	}];

	var j = 0;
	var count = 0;
	var array = [];
	/*//淡入淡出
	$('button').click(function() {
		$('#content').fadeToggle(2000);
	});*/
	//start function
	$('#start').click(function() {
		j = 0;
		$('#content').hide(1200,$('#content').remove());
		/*$('#content').remove();*/
		
		changeQ();
		$('#content').hide();
		$('#content').fadeIn(1200);
		$('#start').attr('id', 'start1');
		$('#next').attr('id', 'next1');
		$('#back').attr('id', 'back1');
	});
	//next function
	$('#next').click(function() {
		//判断
		var biaoji = 0;
		for (var i = 0; i < $('input[name = "choices"]').length; i++) {
			if($('input[name = "choices"]').eq(i).prop('checked')) {
				biaoji = 1;
				array[j] = $('input[name = "choices"]').get(i).value;
				break;
			}
		}
		if (biaoji == 0) {
			alert('请先选择答案');
			return;
		}
		//切换题目
		if (j < allQuestions.length-1) {
			j++;
			if (j == allQuestions.length-1) {
				$('#next1').text('finish');
			}
			$('#content').hide(2000,$('#content').remove());
			/*$('#content').remove();*/
			changeQ();
			$('#content').hide();
			$('#content').fadeIn(1200);
		} else {
			//submit and show score function
			count = countScore(array);
			$('#content').remove();
			$('#main').prepend('<div id="content"><p class="highlight">你的总分是：' + count + '</p></div>');
			$('#start1').attr('id', 'start');
			$('#start').text('restart');
			$('#next1').attr('id', 'next');
			$('#next').text('next');
			$('#back1').attr('id', 'back');
		}
	});
	//back function
	$('#back').click(function() {
		if (j > 0) {
			$('#content').remove();
			array[j] = NaN;
			j--;
			array[j] = NaN;
			changeQ();
			$('#content').hide();
			$('#content').fadeIn(1200);
		}
	});
	//change function
	function changeQ() {
		$('#main').prepend('<div id="content"><p>' + (j+1) + "、" + allQuestions[j].querstion + '</p><br></div>');
		for (var i = 0; i < allQuestions[j].choices.length; i++) {
			$('#content').append('<input type="radio" id="' + i + '" name="choices" value="' + i + '">' + '<label for="' + i + '">' + allQuestions[j].choices[i] + '<br>');
		};
	}
	//function for count score
	function countScore(array) {
		var count = 0;
		for (var i = 0; i < allQuestions.length; i++) {
			if(array[i] == allQuestions[i].correctAnswer) {
				count++;
			}
		}
		return count;
	}
});
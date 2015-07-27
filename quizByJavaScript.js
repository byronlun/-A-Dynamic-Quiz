window.addEventListener('load', function() {
	//题库
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
	var main = document.getElementById('main');
	var content = document.getElementById('content');
	var control = document.getElementById('control');
	var start = document.getElementById('start');
	var next = document.getElementById('next');
	var back = document.getElementById('back');
	var j = 0;
	var count = 0;
	var array = [];
	//start function
	start.onclick = function() {
		//删除		
		j = 0;
		var content = document.getElementById('content');
		var a = main.removeChild(content);
		//切换题目
		changeQ();
		//切换button
		start.id = 'start1'
		next.id = 'next1';
		back.id = 'back1';
	};
		
	//next function
	next.onclick = function() {
		//检验并用数组来保存答案
		var biaoji = 0;
		var temp = document.getElementsByName('choices');
		for (var i = 0; i < temp.length; i++) {
			if (temp[i].checked) {
				biaoji = 1;
				array[j] = temp[i].value;
				break;
			}
		}
		if (biaoji == 0) {
			alert('请先选择答案');
			return;
		}
		if (j < allQuestions.length-1) {
			//删除原来题目
			var content = document.getElementById('content');
			var a = main.removeChild(content);
			if (j == allQuestions.length-2) {
				next.firstChild.nodeValue = 'finish';
			}
			//切换题目
			j++;
			changeQ();
		} else {
			//submit and show score function
			count = countScore(array);
			var content = document.getElementById('content');
			var a = main.removeChild(content);
			var div = document.createElement('div');
			div.id = 'content';
			var p = document.createElement('p');
			p.className = 'highlight';
			var allScore = document.createTextNode('你的总分是：' + count);
			p.appendChild(allScore);
			div.appendChild(p);
			main.insertBefore(div,control);
			next.id = 'next';
			back.id = 'back';
			start.id = 'start';
			start.firstChild.nodeValue = 'restart';
			next.firstChild.nodeValue = 'next';
		}
	};
	//back function
	back.onclick = function() {
		//删除原来题目
		if(j > 0) {
			var content = document.getElementById('content');
			var a = main.removeChild(content);
			//切换题目
			array[j] = NaN;
			j--;
			changeQ();
			array[j] = NaN;
		}
	};

	//function for change question
	function changeQ() {
		var div = document.createElement('div');
		div.id = 'content';
		var p = document.createElement('p');
		var question = document.createTextNode( (j+1) + '、' + allQuestions[j].querstion);
		p.appendChild(question);
		div.appendChild(p);
		var br = document.createElement('br');
		div.appendChild(br);
		for (var i = 0; i < allQuestions[j].choices.length; i++) {
			var input = document.createElement('input');
			input.type = 'radio';
			input.name = 'choices';
			input.value = i;
			div.appendChild(input);
			var choice = document.createTextNode(allQuestions[j].choices[i]);
			div.appendChild(choice);
			var br = document.createElement('br');
			div.appendChild(br);
		};
		main.insertBefore(div, control);
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

}, false);

//加一个计时器
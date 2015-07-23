var allQuestions = [
{
  querstion: '你觉得下面哪个人最帅？',
  choices: [
    '炳伦',
    '育帆',
    '曹操'
  ],
  correctAnswer: 0
},
{
  querstion: '你觉得下面哪个人最帅？',
  choices: [
    '炳伦',
    '育帆',
    '曹操'
  ],
  correctAnswer: 0
},
{
  querstion: 'What is JavaScript?',
  choices: [
    'A Programming Language',
    'A Food',
    'I Dont Know'
  ],
  correctAnswer: 1
},
{
  querstion: 'What is JavaScript?',
  choices: [
    'A Programming Language',
    'A Food',
    'I Dont Know'
  ],
  correctAnswer: 2
}
];

var next = document.getElementById('next');
var main = document.getElementById('main');
var j = 0;
var count = 0;
button.onclick = function () {
	if (j < allQuestions.length) {
		//计分
		var temp = document.getElementsByName('choices');
		for (var i = 0; i < temp.length; i++) {
			if (temp[i].checked) {
				if (temp[i].value == allQuestions[j].correctAnswer) {
					count++;
				};
				break;
			}
		}
		j++;
		if (j < allQuestions.length) {
			//删除
			var a = main.removeChild(document.getElementById('content'));
			//添加
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
			main.insertBefore(div, next);
		} else {
			//显示总分
			var p = document.createElement('p');
			var allScore = document.createTextNode('你的总分是：' + count);
			p.appendChild(allScore);
			next.appendChild(p);
			//隐藏next button
			var button = document.getElementById('button');
			next.removeChild(button);
			main.removeChild(content);
		}
	};
};
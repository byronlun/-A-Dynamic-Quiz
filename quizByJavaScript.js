window.addEventListener('load', function() {
	//变量
	var dljm = document.getElementById('dljm');
	var signup = document.getElementById('signup');
	var login = document.getElementById('login');
	var username = document.getElementById('username');
	var password = document.getElementById('password');
	var loginDiv = document.getElementById('loginDiv');
	var sure = document.getElementById('sure');
	var LOGIN = document.getElementById('LOGIN');
	var SURE = document.getElementById('SURE');
	var logout = document.getElementById('logout');
	var Menu = document.getElementById('Menu');
	var quiz = document.getElementById('quiz');

	var IT = document.getElementById('IT');
	var life = document.getElementById('life');
	var singleDog = document.getElementById('singleDog');
	var byronlun = document.getElementById('byronlun');
	var logout = document.getElementById('logout');


	var allQuestions;
	var j = 0;
	var count = 0;
	var array = [];
	//cookie
	var Mycookie = document.cookie;
	if (Mycookie) {
		//直接进入menu界面
		funMenu();
	} else {
		//进入注册页面
		//signup
		signup.onclick = function() {
			username.value = null;
			password.value = null;
			loginDiv.className = 'item hide';
			sure.className = 'item';
			var div = document.getElementById('addWords');
			if (div != null) {
				dljm.removeChild(div);
			}
			var error = document.getElementsByClassName('error')[0];
			if(error != null) {
				dljm.removeChild(error);
			}
			SURE.onclick = function() {
				var userName = username.value;
				var passWord = password.value;
				//将新注册的用户名和密码放到newUserd对象里面
				var newUser = {user: userName, pass: passWord}; 
			 	//usersJSON变量用来存取用户及密码
			 	var usersJSON = {data:[]};
			 	if (localStorage.getItem('users')) {
			 		 var usersJSON = JSON.parse(localStorage.getItem('users'));
			 		 var temp = 0;
			 		for (var i = 0; i < usersJSON.data.length; i ++) {
			 		 	if (userName === usersJSON.data[i].user) {
			 		 		temp =1;
			 		 		break;
			 		 	}
			 		}
			 		if (temp === 1) {
			 		 	var div = document.createElement('div');
						div.id = 'addWords';
						var p1 = document.createElement('p');
						var p2 = document.createElement('p');
						p1.appendChild(document.createTextNode('User already exists!'));
						p2.appendChild(document.createTextNode('Please login!'));
						div.appendChild(p1);
						div.appendChild(p2);
						dljm.insertBefore(div, loginDiv);
						username.value = null;
						password.value = null;
						sure.className= 'item hide';
			 		} else {
			 		 	usersJSON.data.push(newUser);
			 		 	usersJSON = JSON.stringify(usersJSON);
			 		 	localStorage.setItem('users', usersJSON);
			 		 	var div = document.createElement('div');
						div.id = 'addWords';
						var p1 = document.createElement('p');
						var p2 = document.createElement('p');
						p1.appendChild(document.createTextNode('Sign up success!'));
						p2.appendChild(document.createTextNode('Please login!'));
						div.appendChild(p1);
						div.appendChild(p2);
						dljm.insertBefore(div, loginDiv);
						username.value = null;
						password.value = null;
						sure.className= 'item hide';
			 		 }
			 	} else {
			 		usersJSON.data.push(newUser);
			 		usersJSON = JSON.stringify(usersJSON);
			 		localStorage.setItem('users', usersJSON);
			 		var div = document.createElement('div');
					div.id = 'addWords';
					var p1 = document.createElement('p');
					var p2 = document.createElement('p');
					p1.appendChild(document.createTextNode('Sign up success!'));
					p2.appendChild(document.createTextNode('Please login!'));
					div.appendChild(p1);
					div.appendChild(p2);
					dljm.insertBefore(div, loginDiv);
					username.value = null;
					password.value = null;
					sure.className= 'item hide';
			 	}
			};
		};
		//login
		login.onclick = function() {
			username.value = null;
			password.value = null;
			loginDiv.className = 'item';
			sure.className = 'item hide';
			var div = document.getElementById('addWords');
			if (div != null) {
				dljm.removeChild(div);
			}
		};
		//LOGIN
		LOGIN.onclick = function() {
		//验证用户信息
			var userName = username.value;
			var passWord = password.value;
			var usersJSON = localStorage.getItem('users');
			if (usersJSON) {//localStorage 里面保存有数据，进一步检查用户是否存在
				var pass = false;
				usersJSON = JSON.parse(usersJSON);
				for(var i = 0; i < usersJSON.data.length; i++) {
					if (usersJSON.data[i].user === userName) {
						pass = true;
						break;
					}
				}
				if(pass) {//用户存在，进一步判断密码输入是否正确
					var temp = false;
					for(var i = 0; i < usersJSON.data.length; i++) {
						if (usersJSON.data[i].user === userName && usersJSON.data[i].pass === passWord) {
							temp = true;
							break;
						}
					}
					if(temp) {//用户存在并且密码输入正确
						//cookie
						password = getCookie(userName);
						if (password === passWord) {
							alert('Welcome again ' + userName + '!');
						} else {
							setCookie(userName, passWord, 365);
						}
						//进入menu界面
						funMenu();
					} else {//用户存在，但是密码输入错误
						username.value = null;
						password.value = null;
						var div = document.getElementById('addWords');
						if (div != null) {
							dljm.removeChild(div);
						}
						var div = document.createElement('div');
						div.id = 'addWords';
						var p1 = document.createElement('p');
						var p2 = document.createElement('p');
						p1.appendChild(document.createTextNode('Password error!'));
						p2.appendChild(document.createTextNode('Please relogin!'));
						div.appendChild(p1);
						div.appendChild(p2);
						dljm.insertBefore(div, loginDiv);
					}
				} else {//用户不存在，提示返回注册页面
					username.value = null;
					password.value = null;
					var div = document.getElementById('addWords');
					if (div != null) {
						dljm.removeChild(div);
					}
					var div = document.createElement('div');
					div.id = 'addWords';
					var p1 = document.createElement('p');
					var p2 = document.createElement('p');
					p1.appendChild(document.createTextNode('User no exists!'));
					p2.appendChild(document.createTextNode('Please sign up!'));
					div.appendChild(p1);
					div.appendChild(p2);
					dljm.insertBefore(div, loginDiv);
				}
			} else {//localStorage 没有数据，提示进入注册界面
				username.value = null;
				password.value = null;
				var div = document.getElementById('addWords');
				if (div != null) {
					dljm.removeChild(div);
				}
				var div = document.createElement('div');
				div.id = 'addWords';
				var p1 = document.createElement('p');
				var p2 = document.createElement('p');
				p1.appendChild(document.createTextNode('User no exists!'));
				p2.appendChild(document.createTextNode('Please sign up!'));
				div.appendChild(p1);
				div.appendChild(p2);
				dljm.insertBefore(div, loginDiv);
			}
		};
	}
	function funMenu() {
		/*var str = '<div class="main">' +
					'<div id="logout"><button>logout</button></div>' +
					'<div id="menuTitle">' +
						'<h1>请从以下类型中选择一个进行测试</h1>' +
					'</div>' +
					'<div id="IT" class="choice left">' +
						'<h2>IT知识测试</h2>' +
					'</div>' +
						'<div id="life" class="choice right" >' +
						'<h2>生活常识测试</h2>' +
					'</div>' +
					'<div id="singleDog" class="choice left">' +
						'<h2>单身狗测试</h2>' +
					'</div>' +
					'<div id="byronlun" class="choice right">' +
						'<h2>渣伦熟悉度测试</h2>' +
					'</div>';
		document.body.innerHTML = str;*/
		var again = document.getElementById('again');
		console.log(again);
		var quiz = document.getElementById('quiz');
		quiz.className = 'main1 hide'
		dljm.className = 'main hide';
		Menu.className = 'main';
		/*var IT = document.getElementById('IT');*/
		IT.onclick = funIT;
		/*var life = document.getElementById('life');*/
		life.onclick  = funLife;
		/*var singleDog = document.getElementById('singleDog');*/
		singleDog.onclick = funSingleDog;
		/*var byronlun = document.getElementById('byronlun');*/
		byronlun.onclick = funByronlun;
/*		var logout = document.getElementById('logout');
*/		logout.onclick = function() {
			/*var string = '<div class="main">' +
							'<div id="bye">' +
								'<p>感谢你的到来</p>' +
								'<p>欢迎再次来访</p>' +
							'</div>' +
							'<div id="reLogin">' +
								'<button>重新登录</button>' +
							'</div>' +
						'</div>';
			document.body.innerHTML = string;
			var reLogin = document.getElementById('reLogin');
			reLogin.onclick = function() {
			var dljm = '<div id="dljm" class="main">' +
							'<div class="item">' +
								'<input type="button", class="button", id="login" name="login", value="LOGIN">' +
								'<input type="button", class="button", id="signup" name="signup", value="SIGN UP">' +
							'</div>' +
							'<div class="item">' +
								'<input type="text", class="text", name="username", value="username">' +
							'</div>' +
							'<div id="password" class="item">' +
								'<input type="text", class="text", name="password", value="password">' +
							'</div>' +
							'<div class="item" id="showError">' +
								'<p id="error"></p>' +
							'</div>' +
							'<div class="item" id="LOGIN">' +
								'<input type="submit", class="submit" name="login", value="LOGIN">' +
							'</div>' +
						'</div>'
			document.body.innerHTML = dljm;
			};*/
			dljm.className = 'main';
			Menu.className = 'main hide';
		};
	}
	function funLogout() {
		/*var string = '<div class="main">' +
						'<div id="bye">' +
							'<p>感谢你的到来</p>' +
							'<p>欢迎再次来访</p>' +
						'</div>' +
						'<div id="reLogin">' +
							'<button>重新登录</button>' +
						'</div>' +
					'</div>';
		document.body.innerHTML = string;*/
		var again = document.getElementById('again');
		again.className = 'main';
		quiz.className = 'main1 hide';
		var reLogin = document.getElementById('reLogin');
		reLogin.onclick = function() {
			var again = document.getElementById('again');
			again.className = 'main hide';
			Menu.className = 'main hide';
			dljm.className = 'main';
		}

	}
	//IT知识测试
	function funIT() {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					var ITjson = xhr.responseText;
					allQuestions = JSON.parse(ITjson);
					/*var string = '<div id="quiz" class="main1">' +
									'<h1>关于大学生情商的调查问卷</h1>' +
									'<div id="content">' +
										'<h2>想知道你的情商指数么？</h2>' +
										'<h2>点击start键开始你的情商测试</h2>' +
									'</div>' +
									'<div id="control">' +
										'<button id="start">start</button>' +
										'<button id="back">back</button>' +
										'<button id="next">next</button>' +
										'<button id="menu">menu</button>' +
										'<button id="Logout">logout</button>' +
									'</div>' +
								'</div>';
					document.body.innerHTML = string;*/
					Menu.className = 'main hide';
					quiz.className = 'main1'
					var start = document.getElementById('start');
					start.onclick = function() {
						funStart(allQuestions);
						var next1 = document.getElementById('next1');
						var back1 = document.getElementById('back1');
						next1.onclick = function() {
							funNext(allQuestions);
						};
						back1.onclick = function() {
							funBack(allQuestions);
						}
					}
				}
				else {
					alert('Request was unsuccessful:' + xhr.status);
				}
			}
		};
		xhr.open('get', 'IT.json',true);
		xhr.send(null);
	}
	//生活常识测试
	var funLife = function() {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					var ITjson = xhr.responseText;
					var allQuestions = JSON.parse(ITjson);
					var string = '<div id="quiz" class="main">' +
									'<h1>关于大学生情商的调查问卷</h1>' +
									'<div id="content">' +
										'<h2>想知道你的情商指数么？</h2>' +
										'<h2>点击start键开始你的情商测试</h2>' +
									'</div>' +
									'<div id="control">' +
										'<button id="start">start</button>' +
										'<button id="back">back</button>' +
										'<button id="next">next</button>' +
									'</div>' +
								'</div>';
					document.body.innerHTML = string;
				}
				else {
					alert('Request was unsuccessful:' + xhr.status);
				}
			}
		};
		xhr.open('get', 'IT.json',true);
		xhr.send(null);
	};
	//单身狗测试
	var funSingleDog = function() {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					var ITjson = xhr.responseText;
					var allQuestions = JSON.parse(ITjson);
					var string = '<div id="quiz" class="main">' +
									'<h1>关于大学生情商的调查问卷</h1>' +
									'<div id="content">' +
										'<h2>想知道你的情商指数么？</h2>' +
										'<h2>点击start键开始你的情商测试</h2>' +
									'</div>' +
									'<div id="control">' +
										'<button id="start">start</button>' +
										'<button id="back">back</button>' +
										'<button id="next">next</button>' +
									'</div>' +
								'</div>';
					document.body.innerHTML = string;
				}
				else {
					alert('Request was unsuccessful:' + xhr.status);
				}
			}
		};
		xhr.open('get', 'IT.json',true);
		xhr.send(null);
	};
	//渣伦测试
	var funByronlun = function() {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					var ITjson = xhr.responseText;
					var allQuestions = JSON.parse(ITjson);
					var string = '<div id="quiz" class="main">' +
									'<h1>关于大学生情商的调查问卷</h1>' +
									'<div id="content">' +
										'<h2>想知道你的情商指数么？</h2>' +
										'<h2>点击start键开始你的情商测试</h2>' +
									'</div>' +
									'<div id="control">' +
										'<button id="start">start</button>' +
										'<button id="back">back</button>' +
										'<button id="next">next</button>' +
									'</div>' +
								'</div>';
					document.body.innerHTML = string;
				}
				else {
					alert('Request was unsuccessful:' + xhr.status);
				}
			}
		};
		xhr.open('get', 'IT.json',true);
		xhr.send(null);
	};
	//start function
	function funStart(allQuestions) {
		//删除
		j = 0;
		var quiz = document.getElementById('quiz');
		var content = document.getElementById('content');
		var a = quiz.removeChild(content);
		//切换题目
		changeQ(allQuestions);
		//切换button
		start.id = 'start1'
		next.id = 'next1';
		back.id = 'back1';	
		var menu1 = document.getElementById('menu1');
		var Logout1 = document.getElementById('Logout1');
		if (menu1 || Logout1) {
			menu1.id = 'menu';
			Logout1.id = 'Logout';
		}
	}
	//next function
	function funNext(allQuestions) {
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
			var next1 = document.getElementById('next1');
			var quiz = document.getElementById('quiz');
			var content = document.getElementById('content');
			var a = quiz.removeChild(content);
			if (j == allQuestions.length-2) {
				next1.firstChild.nodeValue = 'finish';
			}
			//切换题目
			j++;
			changeQ(allQuestions);
		} else {
			//submit and show score function
			count = countScore(array);
			var content = document.getElementById('content');
			var quiz = document.getElementById('quiz');
			var a = quiz.removeChild(content);
			var div = document.createElement('div');
			div.id = 'content';
			var p = document.createElement('p');
			p.className = 'highlight';
			var allScore = document.createTextNode('你的总分是：' + count);
			p.appendChild(allScore);
			div.appendChild(p);
			quiz.insertBefore(div,control);
			var next1 = document.getElementById('next1');
			var back1 = document.getElementById('back1');
			var start1 = document.getElementById('start1');
			next1.id = 'next';
			back1.id = 'back';
			start1.id = 'start';
			var menu = document.getElementById('menu');
			var Logout = document.getElementById('Logout');
			menu.id = 'menu1';
			Logout.id = 'Logout1';
			start.firstChild.nodeValue = 'restart';
			next.firstChild.nodeValue = 'next';
			menu1.onclick = funMenu;	
			Logout1.onclick = funLogout;	
		}
	}
	//back function
	function funBack(allQuestions) {
		//删除原来题目
		if(j > 0) {
			if (j < allQuestions.length) {
				next1.firstChild.nodeValue = 'next';
			};
			var quiz = document.getElementById('quiz');
			var content = document.getElementById('content');
			var a = quiz.removeChild(content);
			//切换题目
			array[j] = NaN;
			j--;
			changeQ(allQuestions);
			array[j] = NaN;
		}
	}
	//function for change question
	function changeQ(allQuestions) {
		var div = document.createElement('div');
		div.id = 'content';
		var quiz = document.getElementById('quiz');
		var control = document.getElementById('control');
		var string;
		string = '<p>' + (j+1) + '、' + allQuestions[j].querstion + '</p><br>';
		for (var i = 0; i < allQuestions[j].choices.length; i++) {
			string += '<input type="radio" name="choices" value="' + i + '" id="' + 
			i + '"><label for="' + i + '">' + allQuestions[j].choices[i] + '</label><br>';
		}
		div.innerHTML = string;
		quiz.insertBefore(div, control);
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
	function getCookie(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + '=');
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";",c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return '';
	}
	function setCookie(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
	}

}, false);

//加一个计时器,还可以加一个计算题目完成和总题目的比例。
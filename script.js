var model = {
	data: [
		{
			name: "GOLDEN TAC",
			model: "GB274",
			pic: "url('pics//pic1.jpg')",
			price: 125.10
		},
		{
			name: "NIGHT SEA",
			model: "GB281",
			pic: "url('pics//pic2.jpg')",
			price: 124.50
		},
		{
			name: "GOLDEN FRIEND TOO",
			model: "GB288",
			pic: "url('pics//pic3.jpg')",
			price: 147.10
		},
		{
			name: "THE STRAPPER",
			model: "GB289",
			pic: "url('pics//pic4.jpg')",
			price: 125.40
		},
		{
			name: "FOUR NUMBERS",
			model: "GB292",
			pic: "url('pics//pic5.jpg')",
			price: 152.10
		},
		{
			name: "ONCE AGAIN",
			model: "GB743",
			pic: "url('pics//pic6.jpg')",
			price: 104.30
		}
	],
	sortArr: function(sortBy) {
		this.data.sort(function(a, b) {
			if( a[sortBy] > b[sortBy] ){
				return 1;
			}
			else return -1;
		})
	},
	filterArr: function(maxValue) {
		var newArr = this.data.filter(function(item) {
			return item['price'] <= maxValue;
		});
		return newArr;
	}
};

var view = {
	createMarkup: function( dataObj, i, array ) {
		var box = document.createElement('div');
		box.className = 'box';

		var iks = document.createElement('div');
		iks.className = 'iks';

		iks.onclick = function(e) {
			array.splice(i, 1);
			var block = e.target.parentNode;
			block.parentNode.removeChild(block);
			view.render('holder', model.data);
		}

		var photo = document.createElement('div');
		photo.className = 'photo';
		photo.style.background = dataObj.pic;
		photo.style.backgroundPosition = 'center';
		photo.style.backgroundSize = 'cover';

		var line = document.createElement('hr');
		
		var top = document.createElement('div');
		top.className = 'top';
		top.textContent = dataObj.name;

		var middle = document.createElement('div');
		middle.className = 'middle';
		middle.textContent = dataObj.model;

		var bottom = document.createElement('div');
		bottom.className = 'bottom';
		bottom.textContent = dataObj.price + " $";

		var menu = document.createElement('div');
		menu.className = 'menu';
		var add = document.createElement('div');
		add.className = 'add';
		add.innerHTML = "<a href='#'>ADD TO WISH LIST</a>";
		var more = document.createElement('div');
		more.className = 'more';
		more.innerHTML = "<a href='#'>LEARN MORE</a>";

		menu.appendChild(add);
		menu.appendChild(more);

		box.appendChild(iks);
		box.appendChild(photo);
		box.appendChild(line);
		box.appendChild(top);
		box.appendChild(middle);
		box.appendChild(bottom);
		box.appendChild(menu);

		return box;
	},
	render: function(holder, arr) {
		var parDiv = document.getElementById(holder);
		parDiv.innerHTML = "";
		arr.map(function(item, index) {
			parDiv.appendChild( this.createMarkup( item, index, arr ) );
		}.bind(this));
		console.log(arr);
	}
}

var range = document.getElementById('range');

var tempArr = model.data;
var minmax =  function() {
	tempArr.sort(function(a, b) {
		if( a['price'] > b['price'] ){
			return 1;
		}
		else return -1;
	})
}
minmax();

var min = Math.floor(tempArr[0].price);
range.setAttribute('min', min);
document.getElementById('min').textContent = min;

var max = Math.floor(tempArr[tempArr.length - 1].price) + 1;
range.setAttribute('max', max);
range.setAttribute('value', max);
document.getElementById('max').textContent = max;

var controller = {
	sortBy: function(e) {
		var field = e.target.value;
		model.sortArr(field);
		view.render('holder', model.filterArr(range.value));
	},
	filterTo: function(e) {
		view.render('holder', model.filterArr(range.value));
	}
}

var select = document.getElementById('choice');
select.onchange = controller.sortBy;

view.render('holder', model.data);

range.onmousedown = function() {
	range.onmousemove = function() {
		document.getElementById('max').textContent = range.value;
		controller.filterTo();
	}
}
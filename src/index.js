let footballersId = [3455, 8198, 28003, 26399, 25557, 342229, 27992, 54928, 39983, 5023, 68290, 35207, 164770, 37666, 353366];

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0a9734bf35mshfdc39692fbca45cp149514jsnd68f1fc0e309',
		'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
	}
};

const newFootballer = (id) => 
{
	fetch(`https://transfermarket.p.rapidapi.com/players/get-transfer-history?id=${footballersId[id%footballersId.length]}&domain=com`, options)
	.then(response => response.json())
	.then(response =>
	{
		console.log(response)
		
		dataTransfers = response["transferHistory"]
		infoPlayer = response["share"]
		transferPlayer = response["transferHistory"]
		console.log(dataTransfers)
		
		let numClubs = dataTransfers.length;
		
		console.log(dataTransfers[numClubs - 1]["oldClubName"])
		for (let i = numClubs - 1; i >= 0; i--)
		{
			let club = dataTransfers[i]["newClubName"]
			let season = dataTransfers[i]["season"]
			console.log(club, season)
		}
		
	} )
	.catch(err => console.error(err));
}

document.getElementById('t').addEventListener('click', function() 
{
	namePlayer = infoPlayer['title'].split(' - ')[0].split(' ');
	console.log("Function started");
	let removeArrow = 0;
	var paras = document.getElementsByClassName('club');
	while(paras[0]) 
	{
		paras[0].parentNode.removeChild(paras[0]);
		removeArrow++;
	}

	let className = "c"
	for (let i = 1; i <= removeArrow; i++)
	{
		document.getElementById(className).remove();
		className = className + "c"
	}
	


	let id = Math.floor(Math.random() * 100000);
	let numClubs = dataTransfers.length;
	
	className = "c"

	for (let i = numClubs - 1; i >= 0; i--)
	{
		let clubImage = dataTransfers[i]["newClubImage"]
		let season = dataTransfers[i]["season"]
		let clubName = dataTransfers[i]["newClubName"]
		
		document.body.insertAdjacentHTML("beforeend", `<div class="club"><img src="${clubImage}" class = "clubImg">\
										<p class = "clubTxt">${season}</p>\
										<p class = "clubTxt">${clubName}</p>\
										</div>\
										<canvas id="${className}" width="50" height="100"></canvas>`);
		className = className + "c"
	}

	className = "c"
	for (let i = numClubs - 1; i >= 1; i--)
	{
		const canvas = document.querySelector(`#${className}`);
		const context = canvas.getContext('2d');

		drawArrow(context, 0, 28, 50, 28);
		className = className + "c"
	}

	
	newFootballer(id);
});

const drawArrow = (context, x1, y1, x2, y2, t = 0.9) => {
	const arrow = {
	  dx: x2 - x1,
	  dy: y2 - y1
  };
	const middle = {
	  x: arrow.dx * t + x1,
	  y: arrow.dy * t + y1
  };
  const tip = {
	  dx: x2 - middle.x,
	  dy: y2 - middle.y
  };
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(middle.x, middle.y);
	context.moveTo(middle.x + 0.5 * tip.dy, middle.y - 0.5 * tip.dx);
  context.lineTo(middle.x - 0.5 * tip.dy, middle.y + 0.5 * tip.dx);
  context.lineTo(x2, y2);
  context.closePath();
  context.stroke();
};

document.getElementById('send').addEventListener('click', function() 
{
	let footballer = document.getElementsByTagName("input")[0];
	let val = footballer.value;
	console.log(val);
	//let namePlayer = infoPlayer['title'].split(' - ')[0].split(' ');
	console.log(namePlayer);
	if (namePlayer.includes(val))
	{
		console.log("Correct!")
	}
});

// ================================================================================================

let dataTransfers;
let infoPlayer;
let namePlayer;
let transferPlayer;

console.log("HEllo ")
newFootballer(Math.floor(Math.random() * 100000))

var svg = document.getElementById("svg");
var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
svg.appendChild(polygon);

var array = [ [ 0,0 ], 
             [ 50,50 ],
             [ 25,25 ], ];

for (let value of array) {
  var point = svg.createSVGPoint();
  point.x = value[0];
  point.y = value[1];
  polygon.points.appendItem(point);
}
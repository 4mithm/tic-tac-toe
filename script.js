const cells = document.querySelectorAll(".cell");
const stat = document.querySelector("#status");
const button = document.querySelector("#b1");
console.log(stat);
console.log(button);
const wincondition = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[6, 4, 2],
	[0, 4, 8],
];
let options = ["", "", "", "", "", "", "", "", ""];
let current_player = "X";
let running = false;
initGame();
function initGame() {
	running = true;
	cells.forEach((cell) => {
		cell.addEventListener("click", cellClicked);
	});
	button.addEventListener("click", restartGame);
	stat.textContent = `${current_player}'s TURN  `;
}
function cellClicked() {
	const cellindex = this.getAttribute("cellindex");
	if (options[cellindex] != "" || !running) return;
	updateCell(this, cellindex);
	checkWinner();
}
function updateCell(cell, cellindex) {
	options[cellindex] = current_player;
	cell.textContent = current_player;
}
function changePlayer() {
	current_player = current_player == "X" ? "O" : "X";
	stat.textContent = `${current_player}'s TURN `;
}
function checkWinner() {
	let winner = false;
	wincondition.forEach((arr) => {
		const cellA = options[arr[0]];
		const cellB = options[arr[1]];
		const cellC = options[arr[2]];
		if (cellA == "" || cellB == "" || cellC == "") return;
		if (cellA == cellB && cellB == cellC) winner = true;
	});
	if (winner) {
		stat.textContent = `${current_player} WON`;
		running = false;
	} else if (!options.includes("")) {
		stat.textContent = `DRAW`;
		running = false;
	} else changePlayer();
}
function restartGame() {
	options = ["", "", "", "", "", "", "", "", ""];
	current_player = "X";
	cells.forEach((cell) => {
		cell.textContent = "";
	});
	stat.textContent = `${current_player}'s TURN  `;
	running = true;
}

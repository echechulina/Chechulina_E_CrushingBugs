(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),

				puzzlePieces = document.querySelectorAll('.puzzle-image'),
				dropZones = document.querySelectorAll('.drop-zone'),
				gameBoard = document.querySelector('.puzzle-board');
				zonePieces = document.querySelector('.puzzle-pieces');

	let imageNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];


	function changeImageSet() {

		imageNames.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.bgkey}.jpg`;
		});

		// and set the drop zone background
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgkey}.jpg)`;
	}

	function allowDrag(event) {

		console.log('started dragging an image: this one - ', event.target.id);
		event.dataTransfer.setData("draggedImg", this.id);
		// event.dataTransfer.setData("targetTrack", this.dataset.track);

		// set a reference to a data track so i can retrieve it later in the drop
	}

	function allowDragOver(event) {
		event.preventDefault(); // for next week
		console.log('dragged something over me!');
	}

	function allowDrop(event) {
		if (this.children.lenght >= 1)
		{
			return;
		}

		console.log('dropped an image');
		let droppedImage = event.dataTransfer.getData("draggedImg");
		event.target.appendChild(document.querySelector(`#${droppedImage}`));
		//debugger;
	}
	 function resetPuzzle()
	{
	  for (let loop = 0; loop < puzzlePieces.length; loop=loop+1)
	{
	zonePieces.appendChild(puzzlePieces[loop]);
	}
}
	// click on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => {
	button.addEventListener('click', changeImageSet);
	button.addEventListener('click', resetPuzzle);
});
	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	dropZones.forEach (zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});

	// research call, apply and bind
	changeImageSet.call(puzzleButtons[0]); // emulates a click on the first bottom button
})();

//Door assignments
const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
//Image of the Chore Bot
const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
//Image of the beach
const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
//Image of space
const spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
//Image of the closed door
const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg'
//Global variables needed for the random door generator
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
//start button variable
const startButton = document.getElementById('start');
//variable to control if the game can continue
let currentlyPlaying = true;
//function to see if the door chosen is the ChoreBot image
const currentScore = document.getElementById('current');
const bestScore = document.getElementById('best'); 
const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};
//function that checks if the door has already been opened, eliminating a common cheat
const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
};
//function that implements the door rules
const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)){
    gameOver();
  }
}
//Random door generator function
const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor1 = spaceDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
  } else {
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = botDoorPath;
  }
}
//Method that 'opens' the door that has the Chore Bot 'behind' it
doorImage1.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  };
};
//functions that 'open' the doors with other images besides the Chore Bot
doorImage2.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage2)) { 
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};
doorImage3.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  };
};
//function that restarts the game, setting all the values back to the initial values, and randomizing the doors again
const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good luck!';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}
//click handler function for the start button

startButton.onclick = () => {
    if (!currentlyPlaying) {
      startRound();
  }
};
//function that controls the game over conditions
const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
  } else {
    startButton.innerHTML = 'Game over! Play agan?'
  }
  currentlyPlaying = false;
};
//initial call to randomize the doors when the page is loaded
startRound();
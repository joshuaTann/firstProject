document.getElementById("startbutton").addEventListener("click", () => {
    document.getElementById("startscreen").remove()
    playGame();
})

const playGame = () => {

//making the obstacles
let generateobstacle = setInterval(() => {
//set a variable to create a div
    let obstacle = document.createElement("div");
//give the div a class of "obstacles"
    obstacle.classList.add("obstacles");
//getting the left value to randomly generate the objects across the top of the screen
    // let obstacleleft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    obstacle.style.left = Math.floor(Math.random() * 600) + "px";

    display.appendChild(obstacle);

//object spawn at an interval of one second
}, 1000);

//moving the obstacles
let moveobstacle = setInterval(() => {
//capturing the class "obstacles in a variable"
    let obstacles = document.getElementsByClassName("obstacles");
//if obstacles are not undefined i.e. they exist,
    if(obstacles != undefined){
//for each obstacle in the class obstacles
        for(let i = 0; i < obstacles.length; i++){
            let obstacle = obstacles[i];
//take the current "top" value of the object
            let obstacletop = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));
//increase it by 5px every 25 milliseconds          
            obstacle.style.top = obstacletop + 2 + "px";
            //if the obstacle touches the bottom then end the game
            if(obstacletop > 600) {
                alert("Game Over. Press OK to try again!")
                clearInterval(moveobstacle);
                window.location.reload();
            }
        }  
    }
}, 20);

//making the car move
let car = document.getElementById("car")
let display = document.getElementById("display")

//listening for keypresses
window.addEventListener("keydown", (e) => {
    //getting left value of the car so we can move it
    let left = parseInt(window.getComputedStyle(car).getPropertyValue("left"))
    if(e.key === "a" && left > 10) {
        car.style.left = left - 30 + "px";
    } else if(e.key === "d" && left <= 610) {
        car.style.left = left + 30 + "px";
    }

//bullets
if (e.key === "w") {
    let bullet = document.createElement("div");
    bullet.classList.add("bullets");
    display.appendChild(bullet);

    let movebullet = setInterval(() => {
      let obstacles = document.getElementsByClassName("obstacles");

      for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        if (obstacles != undefined) {
          let obstaclebound = obstacle.getBoundingClientRect();
          let bulletbound = bullet.getBoundingClientRect();

          //Condition to check whether the rock/alien and the bullet are at the same position..!
          //If so,then we have to destroy that rock

          if (
            bulletbound.left >= obstaclebound.left &&
            bulletbound.right <= obstaclebound.right &&
            bulletbound.top <= obstaclebound.top &&
            bulletbound.bottom <= obstaclebound.bottom
          ) {
            obstacle.parentElement.removeChild(obstacle); //Just removing that particular obstacle;
            //Scoreboard
            document.getElementById("score").innerHTML =
              parseInt(document.getElementById("score").innerHTML) + 1;
          }
        }
      }
      let bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      //Stops the bullet from moving outside the gamebox
      if (bulletbottom >= 575) {
        clearInterval(movebullet);
        bullet.style.backgroundColor = "black"
      }

      bullet.style.left = left + "px"; //bullet should always be placed at the top of my jet..!
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
})

}







































// $(() => {
// //score
// let $num = 0
// const score = setInterval(() => {
//     $('#score').text($num);
//     $num++;
//     }, 1000);





// const generateobstacle = () => {
//     setInterval(() => {
//     let $obstacle = $('<div>').attr('class', 'obstacles');
//     //get the left of the obstacle to position it
    
//     $obstacle.css('left', `${Math.floor(Math.random() * 600)}px`)
//     $('#display').append($obstacle);
// }, 2000) 
// }

// const moveobstacle = () => {
//     setInterval(() => {
//         let $obstacles = $(".obstacles");
//         if($obstacles != undefined) {
//             for(let i = 0; i < $obstacles.length; i++) {
//                 let $obstacle = $obstacles.eq(i);
//                 let $obstacletop = $obstacle.css(`top`);
                
//                 $obstacle.css(`top`, `${$obstacletop + 1}px`);
//             }
//         }

//     }, 25);
// }
// generateobstacle()
// moveobstacle()
// });



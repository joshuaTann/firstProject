//scoring
//simple set interval command to increase the score by 1 every second
let num = 0
const score = setInterval(() => {
document.getElementById("score").innerText = num
num++;
}, 1000);

//making the obstacles
let generateobstacle = setInterval(() => {
//set a variable to create a div
    let obstacle = document.createElement("div");
//give the div a class of "obstacles"
    obstacle.classList.add("obstacles");
//getting the left value to randomly generate the objects across the top of the screen
    let obstacleleft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    obstacle.style.left = Math.floor(Math.random() * 520) + "px";

    display.appendChild(obstacle);

//object spawn at an interval of one second
}, 800);

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
            obstacle.style.top = obstacletop + 3 + "px"

        }
    }
}, 25);

//removing the obstacles when they reach the bottom of the div
let obstacles = document.getElementsByClassName("obstacles");
//if obstacles are not undefined i.e. they exist,
    if(obstacles != undefined){
//for each obstacle in the class obstacles
        for(let i = 0; i < obstacles.length; i++){
            let obstacle = obstacles[i];
//take the current "top" value of the object
            let obstacletop = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));
//remove the element when it reaches the bottom of the div        
            if(obstacletop > 670){
                obstacle.parentNode.removeChild(obstacle)
            }

        }
    }


//making the car move
let car = document.getElementById("car")
// let display = document.getElementById("display")

window.addEventListener("keydown", (e) => {
    let left = parseInt(window.getComputedStyle(car).getPropertyValue("left"))
    if(e.key == "a" && left > 10) {
        car.style.left = left - 30 + "px";
    } else if(e.key == "d" && left <= 630) {
        car.style.left = left + 30 + "px";
    }
})

//collisions
for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];
    if (obstacle != undefined) {
      let obstaclebound = obstacle.getBoundingClientRect();
      let carbound = car.getBoundingClientRect();

      //Condition to check whether the obstacle and the car are at the same position..!

      if (
        carbound.left >= obstaclebound.left &&
        carbound.right <= obstaclebound.right &&
        carbound.top <= obstaclebound.top &&
        carbound.bottom <= obstaclebound.bottom
      ) {
          alert (`Game Over. Your score was ${num}`);
          clearInterval(moveobstacle);
          window.location.reload()
      }
    }}



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



document.getElementById("startbutton").addEventListener("click", () => {
    document.getElementById("startscreen").remove()
    easyGame();
    movethetank();
})

const restart = () => {
    let aliens = document.getElementsByClassName("aliens")
    while(aliens[0]) {
        aliens[0].parentElement.removeChild(aliens[0])
    }
    document.getElementById("score").innerHTML = 0
   document.getElementById("endgamemsg").remove();
    easyGame();
    movethetank();
}

const movethetank = () => {
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
      let aliens = document.getElementsByClassName("aliens");

      for (let i = 0; i < aliens.length; i++) {
        let alien = aliens[i];
        if (aliens != undefined) {
          let alienbound = alien.getBoundingClientRect();
          let bulletbound = bullet.getBoundingClientRect();

          //Condition to check whether the rock/alien and the bullet are at the same position..!
          //If so,then we have to destroy that rock

          if (
            bulletbound.left >= alienbound.left &&
            bulletbound.right <= alienbound.right &&
            bulletbound.top <= alienbound.top &&
            bulletbound.bottom <= alienbound.bottom
          ) {
            alien.parentElement.removeChild(alien); //Just removing that particular alien
            bullet.parentElement.removeChild(bullet); //remove the bullet that hit
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
        bullet.parentElement.removeChild(bullet);
      }

      bullet.style.left = left + "px"; //bullet should always be placed at the top of my jet..!
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
})

}


const easyGame = () => {

    //making the aliens
    let generatealien = setInterval(() => {
    //set a variable to create a div
        let alien = document.createElement("div");
    //give the div a class of "aliens"
        alien.classList.add("aliens");
    //getting the left value to randomly generate the objects across the top of the screen
        // let obstacleleft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
        alien.style.left = Math.floor(Math.random() * 600) + "px";
    
        display.appendChild(alien);
    
    //object spawn at an interval of one second
    }, 1000);
    
    //moving the obstacles
    let movealien = setInterval(() => {
    //capturing the class "obstacles in a variable"
        let aliens = document.getElementsByClassName("aliens");
    //if obstacles are not undefined i.e. they exist,
        if(aliens != undefined){
    //for each obstacle in the class obstacles
            for(let i = 0; i < aliens.length; i++){
                let alien = aliens[i];
    //take the current "top" value of the object
                let alientop = parseInt(window.getComputedStyle(alien).getPropertyValue("top"));
    //increase it by 5px every 25 milliseconds          
                alien.style.top = alientop + 2 + "px";
                //if the obstacle touches the bottom then end the game
                if(alientop > 600) {
                    //stop making more aliens and moving them
                    clearInterval(movealien);
                    clearInterval(generatealien);

                    //create a div containing a message of your score
                    let endgamemsg = document.createElement("div")
                    endgamemsg.setAttribute("id", "endgamemsg");
                    endgamemsg.innerHTML = `Your score was ${document.getElementById("score").innerHTML}.`;
                    display.appendChild(endgamemsg);

                    //stick a retry button into the div
                    let retrybutton = document.createElement("button");
                    retrybutton.classList.add("retrybutton");
                    retrybutton.innerHTML = "RETRY?"
                    endgamemsg.appendChild(retrybutton);

                    //restarting the game on retry
                    retrybutton.addEventListener("click", () => {
                        restart();
                    })

                    // window.location.reload();
                }
            }  
        }
    }, 20);
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



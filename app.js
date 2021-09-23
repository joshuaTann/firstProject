let difficulty = document.getElementById("choosedifficulty")
let health = document.getElementById("health")


document.getElementById("startbutton").addEventListener("click", () => {
    if (difficulty.value === "Choose Difficulty:") {
        alert("Please choose a difficulty before starting!")
    } else {
    document.getElementById("startscreen").remove()
    movethetank();
    if(difficulty.value === "Easy") {
        runGame(EASY);
    } else if (difficulty.value === "Medium") {
        runGame(MEDIUM);
    } else if (difficulty.value === "Hard") {
        runGame(HARD);
    } 
    }
})

const restart = () => {
    let aliens = document.getElementsByClassName("aliens")
    while(aliens[0]) {
        aliens[0].parentElement.removeChild(aliens[0])
    }
    document.getElementById("score").innerHTML = 0
   health.value = 100
    health.classList.remove("healthred");
    health.classList.add("healthgreen");
    car.style.borderRadius = `${50}px`;
    car.style.borderStyle = "solid";
    car.style.borderBottom = "hidden";
    
   document.getElementById("endgamemsg").remove();
   if(difficulty.value == "Easy") {
    runGame(EASY);
} else if (difficulty.value == "Medium") {
    runGame(MEDIUM);
} else if (difficulty.value == "Hard") {
    runGame(HARD);
};
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
        car.style.left = left - 20 + "px";
    } else if(e.key === "d" && left <= 610) {
        car.style.left = left + 20 + "px";
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

          //Condition to check whether the alien and the bullet are at the same position..!
          //If so,then we have to destroy that alien

          if (
            bulletbound.left >= alienbound.left &&
            bulletbound.right <= alienbound.right &&
            bulletbound.top <= alienbound.top &&
            bulletbound.bottom <= alienbound.bottom
          ) { 
              if(alien.value !== undefined && alien.value > 25) {
              alien.value = alien.value - 25;
              alien.innerHTML = alien.value;
              bullet.parentElement.removeChild(bullet); 
            } else if(alien.value === undefined || alien.value <= 25) {
                bullet.parentElement.removeChild(bullet); //remove the bullet that hit
                alien.innerHTML = ""
                alien.style.backgroundImage = "url('explosion5.gif')"
                setTimeout(() => {
                    alien.parentElement.removeChild(alien); //Just removing that particular alien
                }, 300)
            //Scoreboard
            if(alien.value !== undefined) {
                let currentscore = document.getElementById("score")
                currentscore.innerHTML = parseInt(document.getElementById("score").innerHTML) + 5;
                currentscore.style.color = "rgba(0, 0, 0, 0)";
                currentscore.style.backgroundImage = "url('plus5.gif')";
                setTimeout (() => {
                    currentscore.style.color = "white";
                    currentscore.style.backgroundImage = ""
                }, 1000)
                } else {
                    document.getElementById("score").innerHTML =
                parseInt(document.getElementById("score").innerHTML) + 1;
                }
            }   
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

      bullet.style.left = left + 20 + "px"; //bullet should always be placed at the top of my jet..!
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
})

}

//Run the Game
const EASY = 1
const MEDIUM = 2
const HARD = 3

const runGame = (speed) => {
    let generatealien = setInterval(() => {
    //set a variable to create a div
        let alien = document.createElement("div");
      
    //give the div a class of "aliens"
        alien.classList.add("aliens");
       
    //getting the left value to randomly generate the objects across the top of the screen
        // let obstacleleft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
        alien.style.left = Math.floor(Math.random() * 580) + "px";
        display.appendChild(alien) 
    //object spawn at an interval of two second
    }, 2000);

    //have another variable for second class of aliens
    let generatealien2 = setInterval(() => {
        let alien2 = document.createElement("div");
        alien2.value = 100
        alien2.innerHTML = alien2.value

        alien2.classList.add("aliens");
        alien2.classList.add("aliens2")

        alien2.style.left = Math.floor(Math.random() * 580) + "px";
        display.appendChild(alien2)
    }, 10000)
    
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
                alien.style.top = alientop + speed + "px";

                //Healthbar
                let health = document.getElementById("health");
                    if(health.value <= 70){
                        health.classList.remove('healthgreen');
                        health.classList.add("healthyellow");
                    } 
                    if(health.value < 30) {
                        health.classList.remove("healthyellow");
                        health.classList.add("healthred");
                    }

                    //Shield
                    if(health.value === 0){
                        car.style.borderRadius = 0;
                        car.style.borderStyle = "hidden"
                    }
                //if the obstacle touches the bottom then end the game
                if(alientop > 585) {
                    if(health.value > 0){
                        alien.parentElement.removeChild(alien);
                        health.value = health.value - 20;
                    } else if(health.value === 0){
                    //stop making more aliens and moving them
                    clearInterval(movealien);
                    clearInterval(generatealien);
                    clearInterval(generatealien2);

                    //create a div containing a message of your score
                    let endgamemsg = document.createElement("div")
                    endgamemsg.setAttribute("id", "endgamemsg");
                    endgamemsg.innerHTML = `Your score was <strong>${document.getElementById("score").innerHTML}</strong>`;
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
                }   
                }
            }  
        }
    }, 20);
}
    

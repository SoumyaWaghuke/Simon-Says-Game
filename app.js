let gameSeq = [];
let userSeq = [];

let highest_score = 0;

let btns = ["red","green","yellow","blue"];

let started = false;
let level =0;

let h2 = document.querySelector('h2');

document.addEventListener('keypress',function(){
    if (started== false){
        console.log("Game started");
        started = true;

        levelup();
    }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randidx = Math.floor(Math.random()*4);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    console.log(randbtn);
    btnflash(randbtn);
}

let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function btnPress(){
   
    let btn = this;
    userFlash(btn);
    
    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },500);
}



function checkAns(idx){
    let result="";
    if (userSeq[idx]===gameSeq[idx]){
       if(userSeq.length == gameSeq.length){
        setTimeout(levelup,1000)
       }
    }else{
        if (highest_score < level-1){
            highest_score = level-1;
            result = `Your Highest score : ${highest_score}`;
        }else{
            result =`Highest Score was ${highest_score}, You loose!`;
        }
        
        document.querySelector('body').style.background = "red";
        setTimeout(function(){
            document.querySelector('body').style.background = "black ";
        },150);
        h2.innerHTML = `Game Over! your score is <b>${level-1} </b><br>${result} <br> Press any key to start.`
        reset();
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0
}

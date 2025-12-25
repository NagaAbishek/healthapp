const fireworks = document.getElementById("fireworks");
const loginBtn = document.getElementById("loginBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const successToast = document.getElementById("successToast");

/* 🐰 RABBIT VIDEOS */
const rabbitIdle = document.getElementById("rabbitIdle");
const rabbitSuccess = document.getElementById("rabbitSuccess");
const rabbitError = document.getElementById("rabbitError");

let currentRabbit = rabbitIdle;

/* 🔁 SMOOTH CROSSFADE (NO FLICKER) */
function showRabbit(nextRabbit){
  if(currentRabbit === nextRabbit) return;

  nextRabbit.classList.add("active");
  nextRabbit.currentTime = 0;
  nextRabbit.play();

  const prevRabbit = currentRabbit;
  currentRabbit = nextRabbit;

  setTimeout(()=>{
    prevRabbit.classList.remove("active");
    prevRabbit.pause();
    prevRabbit.currentTime = 0;
  },450);
}

/* 🎆 COLORS */
const COLORS = [
  "#ff3b3b","#ff9f1c","#ffd93b",
  "#3bff6f","#3bbcff","#6a4c93",
  "#ff7ad9","#ffffff"
];

const randomColor = () =>
  COLORS[Math.floor(Math.random()*COLORS.length)];

/* 🚀 FIREWORKS */
function skyShot(){
  const x = Math.random()*80 + 10;
  const rise = -(420 + Math.random()*120);

  const rocket = document.createElement("div");
  rocket.className = "rocket";
  rocket.style.left = x + "%";
  rocket.style.setProperty("--rise", rise + "px");
  fireworks.appendChild(rocket);

  setTimeout(()=>{
    rocket.remove();
    skyBlast(x, 140);
  },1300);
}

function skyBlast(x,y){
  for(let i=0;i<60;i++){
    const s=document.createElement("div");
    s.className="spark";
    s.style.left=x+"%";
    s.style.top=y+"px";
    const a=Math.random()*Math.PI*2;
    const r=160+Math.random()*120;
    s.style.setProperty("--x",Math.cos(a)*r+"px");
    s.style.setProperty("--y",Math.sin(a)*r+"px");
    s.style.background=randomColor();
    fireworks.appendChild(s);
    setTimeout(()=>s.remove(),2600);
  }
}

/* ✅ SUCCESS MESSAGE */
function showSuccessToast(){
  successToast.classList.remove("show");
  void successToast.offsetWidth;
  successToast.classList.add("show");
}

/* 🔁 RETURN TO IDLE AFTER VIDEO ENDS */
rabbitSuccess.onended = () => showRabbit(rabbitIdle);
rabbitError.onended   = () => showRabbit(rabbitIdle);

/* 🔐 LOGIN */
loginBtn.onclick = () => {
  if(username.value==="admin" && password.value==="admin123"){
    showRabbit(rabbitSuccess);

    for(let i=0;i<10;i++){
      setTimeout(skyShot, Math.random()*2500);
    }

    setTimeout(showSuccessToast, 400);
  }else{
    showRabbit(rabbitError);
  }
};

const fireworks = document.getElementById("fireworks");
const loginBtn = document.getElementById("loginBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const toast = document.getElementById("successToast");

/* 🐰 RABBIT */
const rabbitIdle = document.getElementById("rabbitIdle");
const rabbitSuccess = document.getElementById("rabbitSuccess");
const rabbitError = document.getElementById("rabbitError");

let currentRabbit = rabbitIdle;
let successPlayCount = 0;
let errorPlayCount = 0;

/* SMOOTH SWITCH */
function showRabbit(next){
  if(currentRabbit === next) return;

  next.classList.add("active");
  next.currentTime = 0;
  next.play();

  const prev = currentRabbit;
  currentRabbit = next;

  setTimeout(()=>{
    prev.classList.remove("active");
    prev.pause();
    prev.currentTime = 0;
  },450);
}

/* PLAY TWICE LOGIC */
rabbitSuccess.onended = () => {
  successPlayCount++;
  if(successPlayCount < 2){
    rabbitSuccess.currentTime = 0;
    rabbitSuccess.play();
  }else{
    successPlayCount = 0;
    showRabbit(rabbitIdle);
  }
};

rabbitError.onended = () => {
  errorPlayCount++;
  if(errorPlayCount < 2){
    rabbitError.currentTime = 0;
    rabbitError.play();
  }else{
    errorPlayCount = 0;
    showRabbit(rabbitIdle);
  }
};

/* FIREWORKS */
const COLORS=["#ff3b3b","#ff9f1c","#ffd93b","#3bff6f","#3bbcff","#ffffff"];
const randomColor=()=>COLORS[Math.floor(Math.random()*COLORS.length)];

function skyShot(){
  const x=Math.random()*80+10;
  const rise=-(420+Math.random()*120);
  const r=document.createElement("div");
  r.className="rocket";
  r.style.left=x+"%";
  r.style.setProperty("--rise",rise+"px");
  fireworks.appendChild(r);

  setTimeout(()=>{
    r.remove();
    for(let i=0;i<50;i++){
      const s=document.createElement("div");
      s.className="spark";
      s.style.left=x+"%";
      s.style.top="140px";
      const a=Math.random()*Math.PI*2;
      const d=160+Math.random()*120;
      s.style.setProperty("--x",Math.cos(a)*d+"px");
      s.style.setProperty("--y",Math.sin(a)*d+"px");
      s.style.background=randomColor();
      fireworks.appendChild(s);
      setTimeout(()=>s.remove(),2600);
    }
  },1300);
}

/* TOAST */
function showToast(type,text){
  toast.textContent=text;
  toast.classList.remove("show","success","error");
  toast.classList.add(type);
  void toast.offsetWidth;
  toast.classList.add("show");
}

/* LOGIN */
loginBtn.onclick=()=>{
  successPlayCount = 0;
  errorPlayCount = 0;

  if(username.value==="admin" && password.value==="admin123"){
    showRabbit(rabbitSuccess);

    for(let i=0;i<8;i++){
      setTimeout(skyShot,Math.random()*2000);
    }

    setTimeout(()=>{
      showToast("success","✅ Login Successful");
    },400);

  }else{
    showRabbit(rabbitError);

    setTimeout(()=>{
      showToast("error","❌ Login Failed");
    },300);
  }
};

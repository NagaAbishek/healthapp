const loginBtn = document.getElementById("loginBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const toast = document.getElementById("successToast");

/* 🐰 MAIN RABBIT */
const rabbitIdle = document.getElementById("rabbitIdle");
const rabbitSuccess = document.getElementById("rabbitSuccess");
const rabbitError = document.getElementById("rabbitError");

let currentRabbit = rabbitIdle;
let successPlayCount = 0;
let errorPlayCount = 0;

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

/* PLAY TWICE */
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

/* TOAST */
function showToast(type,text){
  toast.textContent=text;
  toast.classList.remove("show","success","error");
  toast.classList.add(type);
  void toast.offsetWidth;
  toast.classList.add("show");
}

/* LOGIN */
loginBtn.onclick = () => {
  successPlayCount = 0;
  errorPlayCount = 0;

  if(username.value==="admin" && password.value==="admin123"){
    showRabbit(rabbitSuccess);
    setTimeout(()=>showToast("success","✅ Login Successful"),400);
  }else{
    showRabbit(rabbitError);
    setTimeout(()=>showToast("error","❌ Login Failed"),300);
  }
};

/* =====================
   🐰 EMAIL RABBIT CARET
===================== */

const rabbitCaret = document.getElementById("rabbitCaret");

/* text width measure */
const measureSpan = document.createElement("span");
measureSpan.style.position = "absolute";
measureSpan.style.visibility = "hidden";
measureSpan.style.whiteSpace = "pre";
measureSpan.style.font = "600 15px system-ui";
document.body.appendChild(measureSpan);

function updateRabbitCaret(){
  const text = username.value || "";
  measureSpan.textContent = text.replace(/ /g,"\u00a0");

  const paddingLeft = 14;
  rabbitCaret.style.left = paddingLeft + measureSpan.offsetWidth + "px";

  rabbitCaret.classList.remove("hop");
  void rabbitCaret.offsetWidth;
  rabbitCaret.classList.add("hop");
}

username.addEventListener("focus",()=>{
  rabbitCaret.style.display="block";
  updateRabbitCaret();
});

username.addEventListener("blur",()=>{
  rabbitCaret.style.display="none";
});

username.addEventListener("input",updateRabbitCaret);

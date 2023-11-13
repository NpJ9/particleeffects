const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
let hue = 0;
const colors = ['#BA1200', '#031927','#9DD1F1','#508AA8','#C8E0F4','#FF6978','#340068','#6D435A','#B1EDE8','#FFFCF9','#BA1200',]
let colorArrayIndicator = 0;
let changeBackgroundColor = 0;

const mouse = {
  x: null,
  y: null,
}

window.addEventListener('resize', function(){
  // Canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

 window.addEventListener('click', function (event){
    mouse.x = event.x;
    mouse.y = event.y;

    

    
    for (let i = 0; i < 40; i++){
      particlesArray.push(new Particle2());
      }
 
  })


  window.addEventListener('keydown', function (e) {
    if (e.key ==="32"|
      e.code === "Space" ||      
      e.keyCode === 32 ) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(245,0,0,0.1)'; 
      }
  })

  window.addEventListener('keydown', function (e) {
    if (e.key ==="Enter"){
      colorArrayIndicator += 1;
     console.log(colorArrayIndicator)

     if (colorArrayIndicator === 10) {
      colorArrayIndicator = 0;
     }
    }
  
  })


    

 
 window.addEventListener('mousemove', function (event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 5; i++){
      particlesArray.push(new Particle());
      }
    
    })


  class Particle {
    constructor() {
      this.x = mouse.x;
      this.y = mouse.y;
  
      this.size = Math.random() * 15 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = 'hsl(' + hue + ',100%, 50%)';
    }

    update(){
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.2) this.size -= 0.01;
  
    }
    
    draw(){
      ctx.fillStyle =this.color;
      ctx.beginPath(); 
      ctx.arc(this.x, this.y, this.size, 0 , Math.PI * 2); 
      ctx.fill();
    }
  }



  class Particle2 {
    constructor() {
      this.x = mouse.x;
      this.y = mouse.y;
  
      this.size = Math.random() * 30 + 1;
      this.speedX = Math.random() * 4 - 1.5;
      this.speedY = Math.random() * 4 - 1.5;
      this.color = colors[colorArrayIndicator];
    }

    update(){
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.2) this.size -= 0.01;
      
  
    }
    
    draw(){
    
      ctx.beginPath(); 
      ctx.arc(this.x, this.y, this.size, 0 , Math.PI * 2); 
      ctx.fillStyle =colors[colorArrayIndicator]
      ctx.fill();
    }
  }





function handleParticles() {
  for (let i = 0 ; i < particlesArray.length ; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
        for (let j = i; j <  particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy *dy)
          if (distance < 100){

            ctx.beginPath()
            ctx.strokeStyle = particlesArray[i].color;
            ctx.lineWidth = particlesArray[i].size / 10;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }

    }
    
    if (particlesArray[i].size <= 0.3){
      particlesArray.splice(i, 1);
      console.log(particlesArray.length)
      i--;  

    }


  }
}

window.addEventListener('keydown', function (e) {
  if (e.key ==="Backspace")
    changeBackgroundColor += 1;
  if (changeBackgroundColor >= 2) {
    changeBackgroundColor = 0
  }


})

  function animate() {

    // Clears out drawn cricles 
    if (changeBackgroundColor === 0) {
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);}
 
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue++;

    requestAnimationFrame(animate);
  }
  

console.log(ctx)
animate()



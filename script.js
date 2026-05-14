window.onload = function(){

  /* Canvas */

  const canvas = document.getElementById("jarvisCanvas");

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  const mouse = {
    x:null,
    y:null,
    radius:100
  };

  /* Mouse Move */

  window.addEventListener("mousemove", function(e){

    mouse.x = e.x;
    mouse.y = e.y;

  });

  /* Resize */

  window.addEventListener("resize", function(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();

  });

  /* Particle */

  class Particle{

    constructor(x,y){

      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;

      this.baseX = x;
      this.baseY = y;

      this.size = 2;

      this.density = Math.random() * 30;
    }

    draw(){

      ctx.fillStyle = "#00f7ff";

      ctx.beginPath();

      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

      ctx.fill();
    }

    update(){

      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;

      let distance = Math.sqrt(dx*dx + dy*dy);

      if(distance < mouse.radius){

        this.x -= dx / 20;
        this.y -= dy / 20;

      }else{

        this.x += (this.baseX - this.x) / 10;
        this.y += (this.baseY - this.y) / 10;
      }
    }
  }

  /* Init */

  function init(){

    particles = [];

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "white";

    ctx.font = "bold 160px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
      "JARVIS",
      canvas.width / 2,
      canvas.height / 2
    );

    const textData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    for(let y=0; y<textData.height; y+=4){

      for(let x=0; x<textData.width; x+=4){

        const index =
          (y * textData.width + x) * 4;

        if(textData.data[index + 3] > 128){

          particles.push(
            new Particle(x,y)
          );
        }
      }
    }
  }

  init();

  /* Animate */

  function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let i=0; i<particles.length; i++){

      particles[i].draw();
      particles[i].update();
    }

    requestAnimationFrame(animate);
  }

  animate();

  /* Popup */

  const loginPopup =
    document.getElementById("loginPopup");

  const signupPopup =
    document.getElementById("signupPopup");

  const overlay =
    document.getElementById("overlay");

  window.openLogin = function(){

    loginPopup.classList.add("active");

    signupPopup.classList.remove("active");

    overlay.classList.add("active");
  };

  window.openSignup = function(){

    signupPopup.classList.add("active");

    loginPopup.classList.remove("active");

    overlay.classList.add("active");
  };

  window.closePopup = function(){

    loginPopup.classList.remove("active");

    signupPopup.classList.remove("active");

    overlay.classList.remove("active");
  };

  overlay.addEventListener("click", closePopup);

};
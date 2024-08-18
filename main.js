// 1. Initial Setup and Configuration
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cH;
var cW;
var bgColor = "#FF6138";
var animations = [];
var circles = [];
var mousePath = [];
var devicePixelRatio = window.devicePixelRatio || 1;
var drawingEnabled = false;
var automaticAnimationInterval;
var inactivityTimeout = 30000; // 30 seconds
var inactivityCheckInterval;

// 2. Color Picker Module
var colorPicker = (function() {
  var colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
  var index = 0;
  function next() {
    index = (index + 1) % colors.length;
    return colors[index];
  }
  function current() {
    return colors[index];
  }
  return {
    next: next,
    current: current
  };
})();

// 3. Animation Removal
function removeAnimation(animation) {
  var index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
}

// 4. Calculate Radius for Page Fill Effect
function calcPageFillRadius(x, y) {
  var l = Math.max(x - 0, cW - x);
  var h = Math.max(y - 0, cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

// 5. Event Listener Setup
function addClickListeners() {
  document.addEventListener("touchstart", handleEvent);
  document.addEventListener("mousedown", handleEvent);
}

// 6. Event Handling
function handleEvent(e) {
  if (!drawingEnabled && !e.automatic) return;

  if (!e.automatic && e.touches) {
    e.preventDefault();
    e = e.touches[0];
  }
  var currentColor = colorPicker.current();
  var nextColor = colorPicker.next();
  var targetR = calcPageFillRadius(e.pageX, e.pageY);
  var rippleSize = Math.min(200, (cW * 0.4));
  var minCoverDuration = 750;

  var pageFill = new Circle({
    x: e.pageX,
    y: e.pageY,
    r: 0,
    fill: nextColor
  });
  var fillAnimation = anime({
    targets: pageFill,
    r: targetR,
    duration: Math.max(targetR / 2, minCoverDuration),
    easing: "easeOutQuart",
    complete: function() {
      bgColor = pageFill.fill;
      removeAnimation(fillAnimation);
      mousePath = [];
    }
  });

  var ripple = new Circle({
    x: e.pageX,
    y: e.pageY,
    r: 0,
    fill: currentColor,
    stroke: {
      width: 3,
      color: currentColor
    },
    opacity: 1
  });
  var rippleAnimation = anime({
    targets: ripple,
    r: rippleSize,
    opacity: 0,
    easing: "easeOutExpo",
    duration: 900,
    complete: function() {
      removeAnimation(rippleAnimation);
    }
  });

  var particles = [];
  for (var i = 0; i < 32; i++) {
    var particle = new Circle({
      x: e.pageX,
      y: e.pageY,
      fill: currentColor,
      r: anime.random(24, 48)
    });
    particles.push(particle);
  }
  var particlesAnimation = anime({
    targets: particles,
    x: function(particle) {
      return particle.x + anime.random(rippleSize, -rippleSize);
    },
    y: function(particle) {
      return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
    },
    r: 0,
    easing: "easeOutExpo",
    duration: anime.random(1000, 1300),
    complete: function() {
      removeAnimation(particlesAnimation);
    }
  });

  animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

// 7. Object Extension Utility
function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

// 8. Circle Constructor and Draw Method
var Circle = function(opts) {
  extend(this, opts);
};

Circle.prototype.draw = function() {
  ctx.globalAlpha = this.opacity || 1;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  if (this.stroke) {
    ctx.strokeStyle = this.stroke.color;
    ctx.lineWidth = this.stroke.width;
    ctx.stroke();
  }
  if (this.fill) {
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
  ctx.closePath();
  ctx.globalAlpha = 1;
};

// 9. Invert Color Utility
function invertColor(hex) {
  hex = hex.slice(1);
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16).padStart(2, '0');
  var g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16).padStart(2, '0');
  var b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

// 10. Mouse Movement Handling
var mouseX = 0;
var mouseY = 0;
var invertMode = false;
var lastActivityTime = Date.now();

function onMouseMove(e) {
  if (!drawingEnabled) return;

  mouseX = e.pageX;
  mouseY = e.pageY;
  mousePath.push({ x: mouseX, y: mouseY });
  lastActivityTime = Date.now();
}

document.addEventListener("mousemove", onMouseMove);

// 11. Window Resize Handling
function handleResize() {
  cW = window.innerWidth;
  cH = window.innerHeight;
  c.width = cW * devicePixelRatio;
  c.height = cH * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
}

// 12. Animation Loop
function animate() {
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, cW, cH);

  animations.forEach(function(anim) {
    anim.animatables.forEach(function(animatable) {
      animatable.target.draw();
    });
  });

  if (mousePath.length > 1) {
    ctx.strokeStyle = invertMode ? bgColor : invertColor(bgColor);
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(mousePath[0].x, mousePath[0].y);
    for (var i = 1; i < mousePath.length; i++) {
      ctx.lineTo(mousePath[i].x, mousePath[i].y);
    }
    ctx.stroke();
  }

  requestAnimationFrame(animate);
}

// 13. Initial Setup
function setup() {
  handleResize();
  window.addEventListener("resize", handleResize);
  addClickListeners();
  animate();
  startAutomaticAnimation();
  startInactivityCheck();
}

setup();

// 14. Start Button Handling
function startDrawing() {
  drawingEnabled = true;
  document.getElementById("overlay").style.display = "none"; 
  stopAutomaticAnimation(); 
  lastActivityTime = Date.now();
}

document.getElementById("start-button").addEventListener("click", startDrawing);

// Listen for spacebar key press to start drawing
document.addEventListener("keydown", function(e) {
  if (e.code === "Space") {
    startDrawing();
  }
});

// 15. Automatic Animation Control
function startAutomaticAnimation() {
  automaticAnimationInterval = setInterval(function() {
    if (!drawingEnabled) {
      var x = Math.random() * cW;
      var y = Math.random() * cH;
      handleEvent({ pageX: x, pageY: y, automatic: true });
    }
  }, 3000); // 3 seconds interval
}

function stopAutomaticAnimation() {
  clearInterval(automaticAnimationInterval);
}

// 16. Inactivity Check
function startInactivityCheck() {
  inactivityCheckInterval = setInterval(function() {
    var currentTime = Date.now();
    if (currentTime - lastActivityTime > inactivityTimeout) {
      location.reload();
    }
  }, 1000); // Check every second
}

function stopInactivityCheck() {
  clearInterval(inactivityCheckInterval);
}

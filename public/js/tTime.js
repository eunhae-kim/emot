let interval;

function receiveMsgFromParent(e) {
  const message = JSON.parse(e.data);
  switch (message.function) {
    case 'getHeight':
      clearInterval(interval);
      const bodyHeight = document.body.clientHeight;
      window.parent.postMessage({ function: 'onGetHeight', data: { height: bodyHeight } }, '*');
      break;
  }
}

function sendLoadCompleteToParent() {
  window.parent.postMessage({ function: 'loadComplete' }, '*');
}

// overlay div for pinch
const overlay = document.createElement('div');
overlay.id = 'pinch-overlay';
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(255, 255, 255, 0)'; // white version
overlay.style.pointerEvents = 'none';
document.body.appendChild(overlay);

// Image zoom in/out using pinch like instagram
function pinchLikeInsta(image) {
  let initialDistance = 0;
  let currentScale = 1;
  let initialX = 0;
  let initialY = 0;
  let currentX = 0;
  let currentY = 0;
  image.style.transition = 'transform 0.3s ease-out';

  function handleTouchStart(event) {
    if (event.touches.length === 2) {
      event.preventDefault();

      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      initialDistance = getDistance(touch1, touch2);

      const midpoint = getMidpoint(touch1, touch2);
      initialX = midpoint.x - currentX;
      initialY = midpoint.y - currentY;
    }
  }

  function handleTouchMove(event) {
    if (event.touches.length === 2) {
      event.preventDefault();
      image.style.zIndex = '1';
      image.style.position = 'relative';

      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const newDistance = getDistance(touch1, touch2);
      const moveMidpoint = getMidpoint(touch1, touch2);

      const scaleFactor = newDistance / initialDistance;

      const minScale = 1;
      const maxScale = 5;
      currentScale = Math.min(Math.max(minScale * scaleFactor, minScale), maxScale);

      currentX = moveMidpoint.x - initialX;
      currentY = moveMidpoint.y - initialY;

      image.style.transform = `scale(${currentScale}) translate(${currentX}px, ${currentY}px)`;

      const opacity = 0.4 * scaleFactor;
      overlay.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    }
  }

  function handleTouchEnd(event) {
    if (event.touches.length === 0) {
      event.preventDefault();
      initialDistance = 0;
      currentX = 0;
      currentY = 0;
      currentScale = 1;
      image.style.transform = `scale(${currentScale}) translate(${currentX}px, ${currentY}px)`;
      overlay.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    }
  }

  image.addEventListener('transitionend', function () {
    image.style.zIndex = 'auto';
    image.style.position = '';
  });

  function getMidpoint(touch1, touch2) {
    const midpointX = (touch1.clientX + touch2.clientX) / 2;
    const midpointY = (touch1.clientY + touch2.clientY) / 2;
    return { x: midpointX, y: midpointY };
  }

  function getDistance(touch1, touch2) {
    return Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
  }
  // Add event listeners for touch events
  image.addEventListener('touchstart', handleTouchStart);
  image.addEventListener('touchmove', handleTouchMove);
  image.addEventListener('touchend', handleTouchEnd);
}

window.onload = function () {
  window.addEventListener('message', receiveMsgFromParent);
  interval = setInterval(sendLoadCompleteToParent, 150);

  // Apply a pinch to an image section
  const images = document.querySelectorAll('.img-section img');
  images.forEach(pinchLikeInsta);
};
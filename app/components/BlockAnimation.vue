<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <div class="block">1</div>
      <div class="block">2</div>
      <div class="block">3</div>
      <div class="block">4</div>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  /* configure variables here */
  --block-w: 100px;
  --block-h: 100px;
  --gap: 20px;
  --anim-speed: 3s;

  /* Container shows 3 blocks */
  width: calc((var(--block-w) * 3) + (var(--gap) * 2));
  height: calc(var(--block-h) + 20px);
  margin: 20px auto;
  overflow: hidden; /* important: hide the 4th block */
  border: 1px solid #eee;
  display: flex;
  align-items: center;
}

.carousel-wrapper {
  display: flex;
  gap: var(--gap);
  /* the animation moved the whole thing */
  animation: slide-seamless var(--anim-speed) infinite ease-in-out;
}

.block {
  width: var(--block-w);
  height: var(--block-h);
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 8px;
  flex-shrink: 0; /* avoid, that flexbox shrinks something */
}

@keyframes slide-seamless {
  /* 0% to 25%: nothing moves (to look at it) */
  0%, 25% {
    transform: translateX(0);
  }

  /* 75% to 100%: until target position is reached */
  /* we move one block + gap to the left */
  75%, 100% {
    transform: translateX(calc(-1 * (var(--block-w) + var(--gap))));
  }
}
</style>
<template>
  <defs>
    <pattern id="diagonal-stripe-more" patternUnits="userSpaceOnUse" width="6" height="6">
      <path
          d="M-1,1 l2,-2
            M0,6 l6,-6
            M5,7 l2,-2"
          stroke="#fff"
          style="opacity: 1"
          stroke-width="1.5"
        />
    </pattern>
    <pattern id="diagonal-stripe-less" patternUnits="userSpaceOnUse" width="10" height="10">
      <rect x="0" y="0" width="10" height="10" fill="#fff" />
      <path
        d="M-1,1 l2,-2
               M0,10 l10,-10
               M9,11 l2,-2"
        stroke="#000"
        style="opacity: 1"
        stroke-width="2"
      />
    </pattern>
  </defs>
</template>

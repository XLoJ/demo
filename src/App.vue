<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  font-family: 'Fira Code', 'Microsoft YaHei UI', sans-serif;
}

@import '~bulma/sass/utilities/_all';

$primary: $turquoise;
$primary-invert: findColorInvert($primary);
$navbar-padding-vertical: 0.5rem;
$section-padding: 2rem 2rem;
$footer-padding: 2rem 1.5rem 2rem;

@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>

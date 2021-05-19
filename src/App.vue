<template>
  <div id="app">
    <router-view />
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>XLor Online Judge</strong> by
          <a href="https://xlor.cn">XLor</a>. The source code is hosted on
          <a href="https://github.com/XLoJ">Github</a> and is licensed
          <a href="https://github.com/XLoJ/demo/blob/master/LICENSE">MIT</a>.
        </p>
      </div>
    </footer>
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

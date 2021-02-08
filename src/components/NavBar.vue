<template>
  <div class="w-full bg-darkC h-32 top-0">
    <div class="float-left h-full grid">
      <h1 class="text-5xl text-lightC font-black my-auto ml-24">4PM</h1>
    </div>
    <div class="float-right text-lighter h-full grid grid-cols-2 pr-32">
      <div class="my-auto font-semibold text-2xl uppercase">
        <router-link to="/">Home</router-link>
      </div>
      <div class="my-auto font-semibold text-2xl uppercase">
        <router-link to="/add">Add Projects</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style >
a:hover,
a:active,
a.router-link-active {
  @apply text-lightHover;
}
</style>
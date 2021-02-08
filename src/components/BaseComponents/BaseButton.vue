<template>
  <div :class="t" class="rounded-lg text-lighter transition duration-150 ease mx-auto text-center uppercase cursor-pointer p-5 ">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: ["type"],
  computed: {
    t() {
      if (this.type === "forProject") {
        return "shadow-xl mt-4 bg-bl-d text-2xl font-black hover:bg-bl-dh";
      } else if (this.type === "forTask") {
        return " shadow-lg h-full bg-bl-d text-xl font-bold hover:bg-bl-dh";
      } else {
        return "shadow-xl mt-4 bg-baseC text-2xl font-black hover:bg-baseHover";
      }
    },
  },
};
</script>

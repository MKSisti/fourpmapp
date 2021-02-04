<template>
  <div :class="t" class="rounded-lg transition duration-150 ease-in-out mx-auto text-center uppercase cursor-pointer p-5 text-lightM">
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
        return "shadow-xl mt-4 bg-baseC text-2xl font-black hover:bg-baseHover";
      } else if (this.type === "forTask") {
        return " shadow-lg h-full bg-lightC text-xl font-bold hover:bg-lightHover";
      } else {
        return "shadow-xl mt-4 bg-baseC text-2xl font-black hover:bg-baseHover";
      }
    },
  },
};
</script>

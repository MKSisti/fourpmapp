<template>
  <div
    class="rounded-lg"
    :class="[
      color ? color : 'bg-darkC',
      shadow ? shadow : 'shadow-xl',
      width ? width : 'lg:w-3/4',
      margin ? margin : 'mx-auto',
      padding ? padding : 'py-8 px-12',
    ]"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "BaseCard",
  props: ["color", "shadow", "width", "margin", "padding"],
};
</script>
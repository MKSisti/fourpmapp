<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="w"
    :height="h"
  >
    <!-- <path fill="none" d="M0 0h24v24H0z" /> -->
    <path :d="path" />
  </svg>
</template>

<script>
export default {
  name: "BaseIcon",
  props: ["name", "w", "h"],
  computed: {
    path() {
      if (this.name == "arrow-down") return "M12 16l-6-6h12z";
      else if (this.name == "check-blank")
        return "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z";
      else if (this.name == "check-checked")
        return "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7.003 13l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z";
      else if (this.name == "minus")
        return "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 8v2h10v-2H7z";
      else if (this.name == "delete")
        return "M7 6V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5zm6.414 8l1.768-1.768-1.414-1.414L12 12.586l-1.768-1.768-1.414 1.414L10.586 14l-1.768 1.768 1.414 1.414L12 15.414l1.768 1.768 1.414-1.414L13.414 14zM9 4v2h6V4H9z";
      else if (this.name == "error")
        return "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z";
      else if (this.name == "loading")
        return "M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z";
      else if (this.name == "stop")
        return "M6 7v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z";
      else if (this.name == "circle")
        return "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z";
      else if (this.name == "add")
        return "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7 8H7v2h4v4h2v-4h4v-2h-4V7h-2v4z";
      else if (this.name == "logo")
        return "M801.6 13.8L519.2 202c-6.8 4.5-15.6 4.5-22.4 0L214.4 13.8c-4.2-2.8-9.1-4.3-14.1-4.3H33.4 C19.4 9.5 8 20.9 8 34.9v749.1c0 14.1 11.4 25.4 25.4 25.4h149.1c14.1 0 25.4-11.4 25.4-25.4V620.3c0-6.8 3.4-13.1 9-16.8l291-194 l150-100l110.4-73.6c16.9-11.3 39.6 0.8 39.6 21.2v527c0 14.1 11.4 25.4 25.4 25.4h149.1c14.1 0 25.4-11.4 25.4-25.4V34.9 c0-14.1-11.4-25.4-25.4-25.4H815.7C810.7 9.5 805.8 11 801.6 13.8z M208 371.7V247.3c0-16.1 18-25.8 31.4-16.8l93.4 62.2 c12 8 12 25.6 0 33.6l-93.4 62.2C226 397.5 208 387.9 208 371.7z";
      else return "";
    },
  },
};
</script>
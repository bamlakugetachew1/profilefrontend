<script>
import router from "../index.js";
export default {
  name: "login",
  components: {},
  created() {},
  data() {
    return {
      username: "",
    };
  },

  methods: {
    chatnow() {
      if (this.username.trim().length == 0) {
        alert("username should not be empty");
      } else {
        sessionStorage.setItem("username", this.username);
        router.push({
          name: "homePage",
        });
      }
    },
  },
};
</script>

<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Room</title>
    </head>
    <body>
      <div class="mt-40 bg-gray-200 mx-7 md:mx-24 lg:mx-40">
        <div class="text-center">
          <h3 class="capitalize font-serif mb-3 pt-3">Just enter username</h3>
          <input
            v-model="username"
            class="w-60 h-12 mb-3 text-center capitalize font-serif"
            type="text"
            placeholder="username"
          /><br />
          <button
            @click="chatnow"
            class="capitalize font-serif font-bold mb-3 w-24 bg-cyan-500 rounded-sm"
          >
            chat now
          </button>
        </div>
      </div>
    </body>
  </html>
</template>

<style scoped></style>

<script>
import axios from "axios";
import router from "../index.js";
export default {
  name: "homepage",
  components: {},
  data() {
    return {
      display: 1,
      username: "",
      topicname: "",
      response: 0,
      show: 0,
      availlablegroups: [],
    };
  },
  created() {
    this.username = sessionStorage.getItem("username");
    if (this.username == null) {
      router.push({
        name: "login",
      });
    } else {
      this.getallgroups();
    }
  },

  methods: {
    darkmode() {
      this.display = 0;
    },

    show1() {
      this.show = 1;
    },

    close() {
      this.show = 0;
    },

    whitemode() {
      this.display = 1;
    },

    joinandchatnow(topicname) {
      sessionStorage.setItem("topicname", topicname);
      router.push({
        name: "room",
        query: { topicname: topicname },
      });
    },
    async creategroup() {
      var communications = document.getElementById("language").value;
      if (this.topicname.trim().length == 0) {
        alert("topic should be provided");
      } else {
        var url =
          "https://chatapp-wdwk.onrender.com/topic/getmembers/" +
          this.topicname +
          "/" +
          this.username +
          "/" +
          communications
        await axios
          .post(url)
          .then((response) => {
            this.show = 0;
            this.getallgroups();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    async getallgroups() {
      var url = "https://chatapp-wdwk.onrender.com/topic/allgroups";
      await axios
        .get(url)
        .then((res) => {
          this.availlablegroups = res.data.data;
          for (let i = 0; i < this.availlablegroups.length; i++) {
            this.availlablegroups[i].members.shift();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    hide() {
      this.response = 0;
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
      <title>Portfolio</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
      />
    </head>

    <body :class="this.display == 1 ? ' bg-gray-200' : 'bg-zinc-500'">
           <div  id="content">

      <!--  -->
      <div class="pt-8 md:px-20 lg:px-40">
        <nav class="flex justify-between px-5">
          <h1 class="font-mono text-md uppercase font-semibold">LET'S CHAT</h1>
          <ul class="flex">
            <li
              v-if="this.display == 0"
              class="mr-3 text-3xl md:mr-5 lg:mr-7 font-medium"
              @click="whitemode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </li>

            <li
              v-if="this.display == 1"
              class="mr-3 text-3xl md:mr-5 lg:mr-7 font-medium"
              @click="darkmode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </li>
            <li
              class="bg-cyan-500 w-10 text-center font-mono font-medium rounded-full hover:bg-slate-500"
            >
              {{ this.username[0] }}
            </li>
          </ul>
        </nav>

        <div class="pt-10 text-center p-5">
          <h3
            class="pb-5 text-xl font-sans text-gray-800 md:text-3xl capitalize"
          >
            language practice community
          </h3>
        </div>

        <div>
          <button
            class="mx-7 px-2 bg-cyan-500 font-serif rounded-sm capitalize hover:bg-slate-500"
            @click="show1"
          >
            Create new Group
          </button>
        </div>

        <div v-if="this.show == 1" class="mt-5 mb-3 text-center">
          <label for="topic" class="mt-2 font-serif font-medium"
            >Write a Topic</label
          ><br />
          <input
            v-model="topicname"
            type="text"
            name="topic"
            placeholder="enter topic name"
            class="mt-2 w-48 font-serif font-semibold px-2"
          /><br />
          <label for="langs" class="mt-2 font-serif font-medium"
            >Choose a language</label
          ><br />
          <select id="language" name="langs" class="mt-2 w-48 mb-3 px-2">
            <option value="english" selected>English</option>
            <option value="amharic">Amharic</option></select
          ><br />
          <button
            class="mx-7 px-2 bg-cyan-500 font-serif rounded-sm capitalize hover:bg-slate-500"
            @click="creategroup"
          >
            Create
          </button>
          <button
            class="mx-7 px-2 bg-cyan-500 font-serif rounded-sm capitalize hover:bg-slate-500"
            @click="close"
          >
            Cancel
          </button>
        </div>

        <h3 class="text-center pb-7 text-2xl text-gray-800 pt-5 font-serif">
          Availlable Groups
        </h3>
       <p v-if="this.availlablegroups.length == 0" class="capitalize text-center  mx-14 mt-3 mb-2" >not found avalliable groups please creat one</p> 

        <div class="md:flex flex-wrap justify-between gap-3">
          <div
            v-for="groups in this.availlablegroups"
            :key="groups._id"
            :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
            class="pt-5 rounded-md mx-3 mb-3 shadow-sm lg:mx-0 md:w-64 lg:w-80"
          >
            <div class="flex justify-between">
              <div class="pb-3 pt-5 text-left pl-10">
                <h3 class="pb-3 text-xl text-gray-800 font-serif capitalize">
                  {{ groups.language }}
                </h3>
                <h3 class="pb-3 text-xl text-gray-800 font-serif capitalize">
                  {{ groups.topicname }}
                </h3>
              </div>
              <img
                class="w-10 h-10 mt-7 mr-3 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz6CvPDoa-D7wUKJPPUVNNiIZGKauBDKPeD2RrE4Q&s"
              />
            </div>

            <div class="flex justify-center flex-wrap gap-5 pb-5">
              <p
                class="bg-stone-300 w-10 text-center font-mono font-medium rounded-full hover:bg-slate-500 capitalize"
                v-for="memebers in groups.members"
              >
                {{ memebers[0] }}
              </p>
            </div>
            <button
              class="mx-7 px-2 py-3 mb-3 m-auto bg-cyan-500 font-serif rounded-sm capitalize hover:bg-slate-500"
              @click="joinandchatnow(groups.topicname)"
            >
              Join and Chat now
            </button>
          </div>
          <br /><br />
        </div>

        </div>

        <div
          class="text-center pb-7  mt-auto text-2xl text-gray-800 font-serif"
        >
          <h3
            class="text-center pb-2 pt-5 text-2xl text-gray-800 lg:pt-10 font-serif capitalize"
          >
            Thanks for Using our services
          </h3>
          <h5
            class="text-center pb-2 text-2xl text-gray-800 font-serif capitalize"
          >
            Created by Bamlaku
          </h5>
          <p
            class="text-center pb-2 text-xl text-gray-800 font-serif capitalize"
          >
            LET'S CHAT 2022
          </p>
        </div>
      </div>
      <!-- create new interface sections -->
    </body>
  </html>
</template>

<style scoped>
  #content{min-height: calc(100vh - 100px);}


</style>

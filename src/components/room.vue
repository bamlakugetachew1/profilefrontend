<script>
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import router from "../index.js";
import axios from "axios";
var socket = io("https://chatapp-wdwk.onrender.com/", {
  reconnect: true,
  "reconnection delay": 1000,
  "reconnection limit": 5000,
  "max reconnection attempts": 100,
});
socket.on("connect", async () => {


      
    if(sessionStorage.getItem("reconnected") == "true"){

      socket.emit("joingroup", {
        groupname: sessionStorage.getItem("topicname"),
        username: sessionStorage.getItem("username"),
      });

      var url =
        "https://chatapp-wdwk.onrender.com/topic/getmembers/" +
        sessionStorage.getItem("topicname") +
        "/" +
        sessionStorage.getItem("username")+
        "/" +
        "amharic";
      await axios
        .post(url)
        .then((response) => {
          socket.emit("groupmem", {
            lengthof: response.data.data.members.length,
            data: response.data.data.members,
          });
        })
        .catch((err) => {
          console.log(err);
        });

        sessionStorage.setItem("reconnected","false");
   
    }












});
socket.on("disconnect", function () {

});

socket.io.on("reconnect", async () => {
  sessionStorage.setItem("reconnected","true");
});

function apendmessage(data) {
  const messageList = document.getElementById("topouterclass");
  messageList.classList.add("pl-3", "py-3", "mb-2");
  const div = document.createElement("div");
  div.classList.add("flex");
  const chatItem = document.createElement("li");

  const p = document.createElement("p");
  const span = document.createElement("span");

  const p1 = document.createElement("p");
  p1.classList.add("bg-white", "w-full");
  p1.textContent = "-";

  span.classList.add("ml-3");
  span.textContent = data.time;
  chatItem.textContent = data.msg;
  p.textContent = data.sender || " ";
  div.appendChild(p);
  div.appendChild(span);
  messageList.appendChild(div);
  messageList.appendChild(chatItem);
  messageList.appendChild(p1);
  messageList.scrollIntoView(false);
}

socket.on("wellcome", (msg) => {
  apendmessage(msg);
});

socket.on("notifymembers", (msg) => {
  apendmessage(msg);
});

socket.on("notifyuserleave", (msg) => {
  apendmessage(msg);
});

socket.on("send message", (msg) => {
  apendmessage(msg);
});

socket.on("sendnumber", (msg) => {
  const online = document.getElementById("online");
  online.textContent = msg.size - 1;
  const usersections = document.getElementById("usersections");

  if (usersections.hasChildNodes()) {
    var child = usersections.lastElementChild;
    while (child) {
      usersections.removeChild(child);
      child = usersections.lastElementChild;
    }

    for (let i = 1; i < msg.data.length; i++) {
      const pelement = document.createElement("p");
      pelement.classList.add(
        "capitalize",
        "w-10",
        "rounded-full",
        "font-bold",
        "bg-slate-200",
        "text-center",
        "mb-2",
        "memebers"
      );
      var cont = msg.data[i];
      pelement.textContent = cont[0];
      usersections.appendChild(pelement);
    }
  } else {
    for (let i = 1; i < msg.data.length; i++) {
      const pelement = document.createElement("p");
      pelement.classList.add(
        "capitalize",
        "w-10",
        "rounded-full",
        "font-bold",
        "bg-slate-200",
        "text-center",
        "mb-2",
        "memebers"
      );
      var cont = msg.data[i];
      pelement.textContent = cont[0];
      usersections.appendChild(pelement);
    }
  }
});

export default {
  name: "room",
  components: {},
  data() {
    return {
      size: "",
      groupname: "",
      inputmessage: " ",
      memebername: [],
      showemoji1: 1,
      username: "",
      topicname: "",
    };
  },
  mounted() {},
  created() {
    this.username = sessionStorage.getItem("username");
    this.topicname = sessionStorage.getItem("topicname");

    if (this.username == null || this.topicname == null) {
      router.push({
        name: "login",
      });
    } else {
      socket.emit("joingroup", {
        groupname: this.topicname,
        username: this.username,
      });

      this.getmembers();
    }

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  },

  methods: {
    logoutroom() {
      socket.emit("terminate");
      router.push({
        name: "homepage",
      });
    },

    emojicode(data) {
      this.inputmessage += String.fromCodePoint(data);
    },

    sendmessage() {
      if (this.inputmessage.trim().length === 0) {
      } else {
        socket.emit("new message", this.inputmessage);
        this.inputmessage = " ";
        this.showemoji1 = 1;
      }
    },

    async getmembers() {
      var url =
        "https://chatapp-wdwk.onrender.com/topic/getmembers/" +
        this.topicname +
        "/" +
        this.username +
        "/" +
        "amharic";
      await axios
        .post(url)
        .then((response) => {
          socket.emit("groupmem", {
            lengthof: response.data.data.members.length,
            data: response.data.data.members,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showemoji() {
      this.showemoji1 += 1;
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
    <body class="bg-gray-200">
      <div>
        <nav class="flex justify-between px-5 pt-3">
          <h1 class="font-mono text-md uppercase font-semibold">LET'S CHAT</h1>
          <ul class="flex">
            <li
              @click="logoutroom"
              class="bg-cyan-500 px-3 text-center font-mono font-medium rounded-sm hover:bg-slate-500"
            >
              LOGOUT ROOM
            </li>
          </ul>
        </nav>

        <div class="flex mt-3 mx-3 md:mx-10 lg:mx-20 xl:mx-25">
          <div class="bg-sky-100 w-1/4 pt-3 pl-3">
            <div>
              <div class="flex pb-1">
                <h3 class="pt-1 pl-1">ROOM NAMES</h3>
              </div>
              <h5 class="pl-1 font-serif mb-2">{{ this.topicname }}</h5>
            </div>
            <div class="h-80 overflow-auto">
              <div class="flex pb-2">
                <img
                  class="w-7 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjrhflMuXv5uYO2r_PGpL0BYBg-twCl1hrwpIKBRHbZg&s"
                />
                <h3 class="pt-1 pl-1">USER</h3>
              </div>
              <div class="flex gap-1">
                <h5 id="online" class="font-serif">0</h5>
                <span class="capitalize font-serif">online</span>
              </div>

              <div class="pl-2 font-serif" id="usersections"></div>
            </div>
          </div>

          <div class="bg-slate-50 w-3/4 pt-3 pl-3">
            <div class="h-80 overflow-auto">
              <ul
                id="topouterclass"
                class="bg-slate-200 mx-3 md:mx-7 mb-3 lg:mx-10"
              ></ul>

              <br />
            </div>

            <div
              v-if="this.showemoji1 % 2 == 0"
              class="bg-slate-200 ml-20 mr-4 h-52 w-32 mb-3 md:h-52 md:w-40 md:ml-48 lg:ml-80"
            >
              <div class="pt-2 flex justify-between flex-wrap w-36">
                <svg
                  @click="emojicode('128516')"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-emoji-laughing w-16 h-8 rounded-full mb-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"
                  />
                </svg>

                <svg
                  @click="emojicode('128544')"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-emoji-angry-fill w-16 h-8 rounded-full mb-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 0 1 .166.76c.071.206.111.44.111.687C7 7.328 6.552 8 6 8s-1-.672-1-1.5c0-.408.109-.778.285-1.049l-1.009-.504a.5.5 0 0 1-.223-.67zm.232 8.157a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 1 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5 0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5z"
                  />
                </svg>

                <svg
                  @click="emojicode('128528')"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-emoji-neutral w-16 h-8 rounded-full mb-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z"
                  />
                </svg>

                <svg
                  @click="emojicode('128536')"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-emoji-kiss w-16 h-8 rounded-full mb-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.493 13.368a7 7 0 1 1 2.489-4.858c.344.033.68.147.975.328a8 8 0 1 0-2.654 5.152 8.58 8.58 0 0 1-.81-.622Zm-3.731-3.22a13 13 0 0 0-1.107.318.5.5 0 1 1-.31-.95c.38-.125.802-.254 1.192-.343.37-.086.78-.153 1.103-.108.16.022.394.085.561.286.188.226.187.497.131.705a1.892 1.892 0 0 1-.31.593c-.077.107-.168.22-.275.343.107.124.199.24.276.347.142.197.256.397.31.595.055.208.056.479-.132.706-.168.2-.404.262-.563.284-.323.043-.733-.027-1.102-.113a14.87 14.87 0 0 1-1.191-.345.5.5 0 1 1 .31-.95c.371.12.761.24 1.109.321.176.041.325.069.446.084a5.609 5.609 0 0 0-.502-.584.5.5 0 0 1 .002-.695 5.52 5.52 0 0 0 .5-.577 4.465 4.465 0 0 0-.448.082Zm.766-.087-.003-.001-.003-.001c.004 0 .006.002.006.002Zm.002 1.867-.006.001a.038.038 0 0 1 .006-.002ZM6 8c.552 0 1-.672 1-1.5S6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8Zm2.757-.563a.5.5 0 0 0 .68-.194.934.934 0 0 1 .813-.493c.339 0 .645.19.813.493a.5.5 0 0 0 .874-.486A1.934 1.934 0 0 0 10.25 5.75c-.73 0-1.356.412-1.687 1.007a.5.5 0 0 0 .194.68ZM14 9.828c1.11-1.14 3.884.856 0 3.422-3.884-2.566-1.11-4.562 0-3.421Z"
                  />
                </svg>

                <svg
                  @click="emojicode('128521')"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-emoji-wink w-16 h-8 rounded-full mb-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm1.757-.437a.5.5 0 0 1 .68.194.934.934 0 0 0 .813.493c.339 0 .645-.19.813-.493a.5.5 0 1 1 .874.486A1.934 1.934 0 0 1 10.25 7.75c-.73 0-1.356-.412-1.687-1.007a.5.5 0 0 1 .194-.68z"
                  />
                </svg>

                <svg
                  @click="emojicode('128534')"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-emoji-dizzy w-16 h-8 rounded-full mb-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M9.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zm-5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708zM10 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
                  />
                </svg>

                <svg
                  @click="emojicode('128526')"
                  class="w-16 h-8 rounded-full mb-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="b"
                    d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z"
                  />
                  <path
                    d="M21.554 5.693c-.063-.289-2.888-.829-4.871-.829a5.584 5.584 0 0 0-3.3.7A3.125 3.125 0 0 1 12 5.919a3.125 3.125 0 0 1-1.381-.352 5.584 5.584 0 0 0-3.3-.7c-1.983 0-4.808.54-4.871.829s-.113 1.217.088 1.381.439.025.477.6.477 2.976 1.808 3.767 3.741.163 4.6-.365A4.3 4.3 0 0 0 11.3 8.568c.138-.892.351-1.507.7-1.507s.565.615.7 1.507a4.3 4.3 0 0 0 1.883 2.51c.854.528 3.264 1.155 4.6.365s1.77-3.189 1.808-3.767.276-.439.477-.6.149-1.095.086-1.383z"
                    style="fill: #101820"
                  />
                  <ellipse
                    cx="12"
                    cy="13.375"
                    rx="5.479"
                    ry=".297"
                    style="fill: #864e20"
                  />
                  <ellipse class="b" cx="12" cy="14.646" rx="1.969" ry=".229" />
                </svg>

                <svg
                  @click="emojicode('128527')"
                  class="w-16 h-8 rounded-full mb-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8 11V9a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm7.225 3.368a4 4 0 0 1-6.45 0 1 1 0 0 0-1.55 1.264 6 6 0 0 0 9.55 0 1 1 0 1 0-1.55-1.264zM23 12A11 11 0 1 1 12 1a11.013 11.013 0 0 1 11 11zm-2 0a9 9 0 1 0-9 9 9.011 9.011 0 0 0 9-9zm-4-3h-3a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2z"
                  />
                </svg>

                <svg
                  @click="emojicode('128525')"
                  class="w-16 h-8 rounded-full mb-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16.957 9.783C16.74 10.972 15 12 15 12s-1.74-1.028-1.957-2.217C12.828 8.611 13.459 8 14.112 8a.98.98 0 0 1 .888.471.98.98 0 0 1 .888-.471c.653 0 1.284.611 1.069 1.783zM9 12s1.74-1.028 1.957-2.217C11.172 8.611 10.541 8 9.888 8A.98.98 0 0 0 9 8.471.98.98 0 0 0 8.112 8c-.653 0-1.284.611-1.069 1.783C7.26 10.972 9 12 9 12zm6.225 2.368a4 4 0 0 1-6.45 0 1 1 0 0 0-1.55 1.264 6 6 0 0 0 9.55 0 1 1 0 1 0-1.55-1.264zM23 12A11 11 0 1 1 12 1a11.013 11.013 0 0 1 11 11zm-2 0a9 9 0 1 0-9 9 9.01 9.01 0 0 0 9-9z"
                  />
                </svg>

                <svg
                  @click="emojicode('128530')"
                  class="w-16 h-8 rounded-full mb-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 16a4.045 4.045 0 0 0 3.225-1.632 1 1 0 1 1 1.55 1.264 6 6 0 0 1-9.55 0 1 1 0 0 1 1.55-1.264A4.045 4.045 0 0 0 12 16zM1 12a11 11 0 1 1 11 11A11.013 11.013 0 0 1 1 12zm2 0a9 9 0 1 0 9-9 9.01 9.01 0 0 0-9 9zm11 0a1 1 0 0 0 1-1 1 1 0 0 1 2 0 1 1 0 0 0 2 0 3 3 0 0 0-6 0 1 1 0 0 0 1 1zm-7-1a1 1 0 0 1 2 0 1 1 0 0 0 2 0 3 3 0 0 0-6 0 1 1 0 0 0 2 0z"
                  />
                </svg>
              </div>
            </div>

            <div class="mx-3 md:mx-7 mb-3 lg:mx-10 flex">
              <input
                class="w-3/5 h-7 bg-indigo-100 px-3 text-left"
                type="text"
                placeholder="messages"
                id="input"
                v-model="inputmessage"
              />
              <img
                class="w-7 rounded-full ml-3"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIUBeyPbSsvKg1U1WSCVywUOPZzaKAi9Fw3l5nThjLkA&s"
                @click="showemoji"
              />
              <button
                class="bg-cyan-500 ml-3 px-3 h-7 rounded-md text-left"
                @click="sendmessage"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>

<style scoped></style>

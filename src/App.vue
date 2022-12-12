<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  data() {
    return {
      display: 1,
      username: "FULL NAME",
      useremail: "EMAIL",
      messages: "MESSAGES",
      response: 0,
    };
  },
  methods: {
    darkmode() {
      this.display = 0;
    },

    whitemode() {
      this.display = 1;
    },
    async sendmessages() {
      if (
        this.username == "FULL NAME" ||
        this.useremail == "EMAIL" ||
        this.messages == "MESSAGES"
      ) {
        alert("ALL FILDS ARE REQUIRED");
      } else {
        await axios
          .post("https://cute-teal-sea-lion-yoke.cyclic.app/messages/addmessages", {
            username: this.username,
            useremail: this.useremail,
            messages: this.messages,
          })
          .then((response) => {
            this.response = response.data.message;
            this.username = "FULL NAME";
            this.useremail = "EMAIL";
            this.messages = "MESSAGES";
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    async downloadprofile() {
      axios({
        url: "https://cute-teal-sea-lion-yoke.cyclic.app/messages/download",
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fURL = document.createElement("a");
        fURL.href = fileURL;
        fURL.setAttribute("download", "bamlaku.jpg");
        document.body.appendChild(fURL);
        fURL.click();
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
      <div class="pt-8 md:px-20 lg:px-40">
        <nav class="flex justify-between px-5">
          <h1 class="font-mono text-md uppercase font-semibold">
            Bamlaku Getachew
          </h1>
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
              @click="downloadprofile"
              class="bg-cyan-500 w-20 text-center font-mono font-medium rounded hover:bg-slate-500"
            >
              Resume
            </li>
          </ul>
        </nav>

        <div class="pt-10 text-center p-5">
          <h2 class="text-4xl pb-5 text-cyan-800 md:text-6xl">
            Bamlaku Getachew
          </h2>
          <h3
            class="pb-5 text-xl font-sans text-gray-800 md:text-3xl capitalize"
          >
            fullstack web and mobile developer
          </h3>
          <p
            class="pb-5 font-sans leading-7 text-gray-800 text-md md:text-xl max-w-lg mx-auto"
          >
            Solution-driven web developer adept at contributing to highly
            collaborative work environment and finding solutions. Proven
            experience developing consumer-focused websites using HTML, CSS, PHP
            and JavaScript. Good knowledge of the best practices for web design,
            user experience, and speed
          </p>
        </div>

        <div class="flex justify-center px-10 gap-5 pb-10 animate-bounce">
          <a href="https://github.com/bamlakugetachew1" target="_blank">
            <img
              :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
              class="w-10 md:h-100 md:w-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCIKVuXHi6ijnPWJNbHKg3CcnMLr8Z7HtPoySrg6Y&s"
              alt="github"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/bamlaku-getachew/"
            target="_blank"
          >
            <img
              :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
              class="w-10"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTJ6xQIggOJ-2u3TIqY4GYuUI4jeK5I25NjywYrZg&s"
              alt="linked in"
            />
          </a>
        </div>

        <div class="mt-10">
          <img
            class="rounded-full h-80 w-80 mx-auto"
            src="https://res.cloudinary.com/dwq2ftoo3/image/upload/v1669919254/photo_2022-12-01_21-25-52_vtei43.jpg"
            alt="developer images"
          />
        </div>

        <h3 class="text-center pb-7 text-2xl text-gray-800 pt-5 font-serif">
          Tools and Technology
        </h3>

        <div class="lg:flex justify-between gap-3">
          <div
            :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
            class="pt-5 rounded-md mx-3 shadow-sm lg:mx-0"
          >
            <h3 class="text-center pb-3 text-xl text-gray-800 pt-5 font-serif">
              Frontend Technologies
            </h3>
            <p
              class="pb-5 font-sans leading-7 text-gray-800 text-md mx-10 text-center lg:mx-1"
            >
              I have 2 years of experience in blending the art of design with
              skill of programming to deliver an immersive and engaging user
              experience through efficient website development, proactive
              feature optimization, and relentless debugging and use below
              Technology and popular javascript frameworks
            </p>
            <div class="flex justify-center gap-5 pb-5">
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
              />
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
              />
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg"
              />
            </div>

            <div class="flex justify-center gap-5 pb-10">
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
              />
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
              />
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original-wordmark.svg"
              />
            </div>
          </div>
          <br /><br />
          <div
            :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
            class="pt-5 rounded-md mx-3 shadow-sm lg:mx-0"
          >
            <h3 class="text-center pb-3 text-xl text-gray-800 pt-5 font-serif">
              Backend Technologies
            </h3>
            <p
              class="pb-5 font-sans leading-7 text-gray-800 text-md mx-10 text-center lg:mx-1"
            >
              haveing 2 years of experience in building different backend
              platforms gives me a comfortable knowledge to work on any backend
              ideas,also working with different backend tools including the most
              popular node js and php gives me a handefull confindnce to convert
              any ideas to real world projects
            </p>
            <div class="flex justify-center gap-5 pb-5">
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
              />
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg"
              />
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
              />
            </div>

            <div class="flex justify-center gap-5 pb-10">
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original-wordmark.svg"
              />

              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
              />
            </div>
          </div>

          <br /><br />
          <div
            :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
            class="pt-5 rounded-md mx-3 shadow-sm lg:mx-0"
          >
            <h3 class="text-center pb-3 text-xl text-gray-800 pt-5 font-serif">
              Database Technologies & other tools
            </h3>
            <p
              class="pb-5 font-sans leading-7 text-gray-800 text-md mx-10 text-center lg:mx-1"
            >
              having working with popular database management system including
              mongodb,mysql and postgressql through different real world
              projects gives me an ability to store and manipulate data
              according to your company needs and wants, if you can think it i
              will develope according to requirments and constriants
            </p>
            <div class="flex justify-center gap-5 pb-5">
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
              />

              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg"
              />

              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg"
              />
            </div>

            <div class="flex justify-center gap-5 pb-10">
              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              />

              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
              />

              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg"
              />

              <img
                class="w-10"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg"
              />
            </div>
          </div>
        </div>

        <h3
          class="text-center pb-7 pt-5 text-2xl text-gray-800 lg:pt-10 font-serif"
        >
          Portfolio and Projects
        </h3>

        <div class="lg:flex justify-between gap-3">
          <div
            :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
            class="pt-5 rounded-md mx-3 shadow-sm"
          >
            <h3 class="text-center pb-3 text-xl text-gray-800 pt-5 font-serif">
              Dukaan Ethiopia
            </h3>
            <p
              class="pb-5 font-sans leading-7 text-gray-800 text-md mx-10 text-center"
            >
              AN ECOMMERCE website that let us merchants to open store from
              comfort of their home with out the hassle of renting and other
              costs relates to physical store, this particular project developes
              with new Technology like node js,mongodb,express and vue js as a
              frontend javascript frameworks
            </p>
            <a
              href="https://dukaanethiopia.netlify.app/"
              target="_blank"
              class="flex justify-center gap-3 pb-10"
              :class="this.display == 0 ? 'text-slate-100' : ' text-cyan-500'"
            >
              visit
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
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </a>
          </div>

          <br /><br />
          <div
            :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
            class="pt-5 rounded-md mx-3 shadow-sm"
          >
            <h3 class="text-center pb-3 text-xl text-gray-800 pt-5 font-serif">
              Smart Iq
            </h3>
            <p
              class="pb-5 font-sans leading-7 text-gray-800 text-md mx-10 text-center"
            >
              a tutoring website that let us students to hire qualified tutors
              from comfort of their home,that allowes students make a chat and
              negotiate with tutors, this particular project developes with new
              Technology like
              php,mysql,html,javascript-original,jquery,sass,bootstrap and some
              trends
            </p>
            <a
              href="https://passwordmanager.infinityfreeapp.com/"
              target="_blank"
              class="flex justify-center gap-3 pb-10"
              :class="this.display == 0 ? 'text-slate-100' : ' text-cyan-500'"
            >
              visit
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
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </a>
          </div>
          
          
          
          
           <br /><br />
          <div
            :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
            class="pt-5 rounded-md mx-3 shadow-sm"
          >
            <h3 class="text-center pb-3 text-xl text-gray-800 pt-5 font-serif">
              LET'S CHAT
            </h3>
            <p
              class="pb-5 font-sans leading-7 text-gray-800 text-md mx-10 text-center"
            >
                a chatting website that let us womens and other socity memebers to 
              disscuss comfort of their home,that allowes user make a chat and
              reflect their ideas, this particular project developes with new
              Technology like
              node js,socket io,express,javascript-original,jquery,sass,tailwind cssand some
              trends
            </p>
            <a
              href="https://letschatwithfreedom.netlify.app/"
              target="_blank"
              class="flex justify-center gap-3 pb-10"
              :class="this.display == 0 ? 'text-slate-100' : ' text-cyan-500'"
            >
              visit
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
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </a>
          </div>
          
          
         
          
          
          
        </div>

        <h3
          class="text-center pb-7 pt-5 text-2xl text-gray-800 lg:pt-10 font-serif"
        >
          Contact Me
        </h3>
        <div class="lg:flex lg:justify-center gap-10">
          <div>
            <div class="px-10 pb-3">
              <div class="flex gap-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12 rounded-full"
                  :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>

                <div>
                  <h5>Address</h5>
                  <p>Motta,01 kebele</p>
                </div>
              </div>
            </div>

            <div class="px-10 pb-3">
              <div class="flex gap-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12 rounded-full"
                  :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                  />
                </svg>

                <div>
                  <a href="tel:0974458838">0974458838</a>
                </div>
              </div>
            </div>
            <div class="px-10 pb-3">
              <div class="flex gap-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12 rounded-full"
                  :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>

                <div>
                  <p>
                    <a href="mailto:abuyeget@gmail.com">abuyeget@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div
            v-if="this.response == 1"
            class="text-lg text-stone-500 capitalize text-center"
          >
            <h5>THanks for sending messages</h5>
            <span class="pt-3 pb-3 flex justify-center" @click="hide"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-10 h-10 items-center"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>

          <div class="px-10">
            <input
              :class="this.display == 0 ? 'bg-zinc-200' : 'bg-white'"
              class="w-full h-10 capitalize pl-5 pb-5 lg:w-80 rounded-md"
              type="text"
              v-model="username"
              required
            /><br /><br />
            <input
              :class="this.display == 0 ? 'bg-zinc-200' : 'bg-white'"
              class="w-full h-10 capitalize pl-5 lg:w-80 rounded-md"
              type="email"
              v-model="useremail"
              required
            /><br /><br />

            <textarea
              :class="this.display == 0 ? 'bg-zinc-400' : 'bg-white'"
              type="text"
              class="text-left capitalize rounded-md"
              v-model="messages"
              rows="5"
              cols="30"
            >
         messages
      </textarea
            >
            <br /><br />
            <Button
              class="w-20 bg-slate-500 mb-10 text-lg rounded-md"
              @click="sendmessages"
              >SEND</Button
            >
          </div>
        </div>
      </div>
    </body>
  </html>
</template>

<style scoped></style>

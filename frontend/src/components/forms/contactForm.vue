<template>

  <div class="position-relative">
    <transition name="fade">
      <div v-if="!submitted" class="position-absolute w-100">
        <b-form @submit="onSubmit">

          <!-- Name -->
          <b-form-group
            id="nameGroup"
            label="Your name"
            label-for="nameInput"
            :description="errors.first('name')"
            :class="{'input': true, 'text-danger': errors.has('name') }"
          >
            <b-form-input
              id="nameInput"
              name="name"
              data-vv-name="name"
              v-model="model.name"
              v-validate="'required'"
              :class="{'input': true, 'text-danger': errors.has('name') }"
              class="text-dark"
              type="text"
              placeholder="What's your name?"
            >
            </b-form-input>
          </b-form-group>

          <!-- Email -->
          <b-form-group
            id="emailGroup"
            label="Your email"
            label-for="emailInput"
            :description="errors.first('email')"
            :class="{'input': true, 'text-danger': errors.has('email') }"
          >
            <b-form-input
              id="emailInput"
              name="email"
              data-vv-name="email"
              v-model="model.email"
              v-validate="'required|email'"
              :class="{'input': true, 'text-danger': errors.has('email') }"
              class="text-dark"
              type="text"
              placeholder="you@awesome.com"
            >
            </b-form-input>
          </b-form-group>

          <!-- Subject -->
          <b-form-group
            id="subjectGroup"
            label="Your subject"
            label-for="subjectInput"
            :description="errors.first('subject')"
            :class="{'input': true, 'text-danger': errors.has('subject') }"
          >
            <b-form-input
              id="subjectInput"
              name="subject"
              data-vv-name="subject"
              v-model="model.subject"
              v-validate="'required'"
              :class="{'input': true, 'text-danger': errors.has('subject') }"
              class="text-dark"
              type="text"
              placeholder="What do you want to chat about?"
            >
            </b-form-input>
          </b-form-group>

          <!-- Comments -->
          <b-form-group
            id="commentsGroup"
            label="Your comments"
            label-for="commentsInput"
            :description="errors.first('comments')"
            :class="{'input': true, 'text-danger': errors.has('comments') }"
            class="position-relative"
          >
            <span class="counter text-muted">
              {{model.comments.length}}/100
            </span>
            <b-form-textarea
              id="commentsInput"
              name="comments"
              data-vv-name="comments"
              v-model="model.comments"
              v-validate="'required|min:100'"
              :class="{'input': true, 'text-danger': errors.has('comments') }"
              class="text-dark"
              type="text"
              placeholder="Your message..."
              rows="4"
            >
            </b-form-textarea>
          </b-form-group>


          <b-button
            @tap="onSubmit"
            @click="onSubmit"
            variant="primary text-white w-100"
          >
            Submit
          </b-button>
        </b-form>

        <ul>
          <li
            v-for="(error, index) in errors.collect('field')"
            :key="index"
          >
            {{ error }}
          </li>
        </ul>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="submitted" class="position-absolute w-100">
        <h1 class="pb-5">
          Your message is&nbsp;sent!
        </h1>
        <p class="text-dark">
          Thanks for getting in touch, I'll keep an eye out for your&nbsp;message.
        </p>
        <p class="text-dark">
          Talk soon!
        </p>
      </div>
    </transition>
  </div>

</template>

<script>
import axios from 'axios'

// const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export default {
  data () {
    return {
      form: {},
      model: {
        name: '',
        email: '',
        subject: '',
        comments: ''
      },
      submitted: false
    }
  },
  methods: {
    onSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.sendMail()
        }
      })
    },
    sendMail () {
      let vm = this
      console.log(vm.model)

      axios.post('static/mail/index.php', vm.model)
      .then(function (response) {
        console.log(response)
        vm.submitted = true
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style>
  .help-block {
    font-size: 0.7em;
  }
  .form-group small{
    color: inherit !important;
  }
  .counter {
    font-size: 0.5em;
    position: absolute;
    font-weight: bold;
    right: 8px;
    top: 1.1em;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
  }
</style>


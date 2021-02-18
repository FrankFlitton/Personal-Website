<template>
  <div class="p-relative w-100 h-100">
    <transition name="fade">
      <div v-if="!submitted" class="position-absolute w-100 bg-light pl-4 pr-4">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <input class="d-none" type="hidden" name="form-name" value="website-contact" />

          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-textarea
            v-model="message"
            :rules="messageRules"
            label="Message"
            required
          ></v-textarea>

          <v-btn
            :disabled="!valid"
            color="black"
            class="mr-4 white--text"
            @click="sendForm"
          >
            Send Message
          </v-btn>
        </v-form>
        <p class="error--text my-5">
          {{ error }}
        </p>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="submitted" class="p-absolute w-100 bg-light pl-4 pr-4">
        <h1 class="pb-5">Your message is&nbsp;sent!</h1>
        <p
          class="text-dark"
        >Thanks for getting in touch, I'll keep an eye out for your&nbsp;message.</p>
        <p class="text-dark">Talk soon!</p>
      </div>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 5) || 'Name must be more than 5 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      message: '',
      messageRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 20) || 'Message must be more than 20 characters',
      ],
      submitted: false,
      error: ''
    }),

    methods: {
      encode (data) {
        return Object.keys(data)
          .map(
            key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
          )
          .join("&");
      },
      sendForm () {
        this.validate()
        this.$nextTick(() => {
          if (this.valid) {
            this.handleSubmit()
          }
        })
      },
      handleSubmit () {
        const dataPayload = {
          name: this.name,
          email: this.email,
          message: this.message
        }

        const axiosConfig = {
          header: { "Content-Type": "application/x-www-form-urlencoded" }
        };
        axios.post(
          "/",
          this.encode({
            "form-name": "website-contact",
            ...dataPayload
          }),
          axiosConfig
        )
        .then(() => { this.submitted = true })
        .catch(error => this.error = error)
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>
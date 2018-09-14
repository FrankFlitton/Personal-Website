<template>

  <div>

    <!-- <form @submit="submit">
      <formly-form
        :form.sync="form"
        :model.sync="model"
        :fields.sync="fields"
        class="mb-5"
      >
        <button>Submit</button>
      </formly-form>

    </form> -->
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

    <!-- <div class="debug">
      <pre><code>{{ $data }}</code></pre>
      <pre><code>{{ errors }}</code></pre>
    </div> -->

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
</style>


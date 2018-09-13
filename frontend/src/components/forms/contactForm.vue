<template>

  <div>
    <form class="vue-form" @submit.prevent="submit">

      <div class="error-message">
        <p v-show="!email.valid">Oh, please enter a valid email address.</p>
      </div>

      <fieldset>
        <legend>Vue Contact Form</legend>
        <div>
          <label class="label" for="name">Name</label>
          <input type="text" name="name" id="name" required="" v-model="name">
        </div>
        <div>
          <label class="label" for="email">Email</label>
          <input type="email" name="email" id="email" required=""
                :class="{ email , error: !email.valid }"
                v-model="email.value">
        </div>
        <div>
          <h4>Team Member</h4>
          <p class="select">
            <select class="budget" v-model="selection.member">
              <option value="0">Sarah Drasner</option>
              <option value="1">Evan You</option>
            </select>
          </p>
        </div>

        <div>
          <h4>Framework</h4>

          <ul class="vue-form-list">
            <li>
              <input type="radio" name="radio-1" id="radio-1" value="angular"
                    v-model="selection.framework">
              <label for="radio-1">AngularJS</label>
            </li>
            <li>
              <input type="radio" name="radio-2" id="radio-2" value="react"
                    v-model="selection.framework">
              <label for="radio-2">ReactJS</label>
            </li>
            <li>
              <input type="radio" name="radio-3" id="radio-3" value="vue"
                    v-model="selection.framework">
              <label for="radio-3">VueJS</label>
            </li>
          </ul>
        </div>

        <div>
          <h4>Features</h4>
          <ul class="vue-form-list">
            <li
              v-for="(feature, index) in features"
              :key="feature"
            >
              <input type="checkbox"
                    :value="feature"
                    :id="'cb-feature-'+index"
                    v-model="selection.features">
              <label :for="'cb-feature-'+index">{{feature}}</label>
            </li>
            <li>
              <input type="checkbox" id="checkbox-all" @click="checkAll">
              <label for="checkbox-all">Check All</label>
            </li>
          </ul>
        </div>
        <div>
          <label class="label" for="textarea">Message with Counter</label>
          <textarea class="message" name="textarea" id="textarea" required=""
                    v-model="message.text"
                    :maxlength="message.maxlength"></textarea>
          <span class="counter">{{ message.text.length }} / {{ message.maxlength }}</span>
        </div>
        <div>
          <input type="submit" value="Send Form">
        </div>
      </fieldset>
    </form>

    <div class="debug">
      <pre><code>{{ $data }}</code></pre>
    </div>

  </div>

</template>

<script>
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
import {config, domain} from '../../../../../mail-gun-config.js'

var mailgun = require('mailgun.js')
const mg = mailgun.client(config)

export default {
  data () {
    return {
      name: 'John Doe',
      email: {
        value: 'jo@hnd.oe',
        valid: true
      },
      features: ['Reactivity', 'Encapsulation', 'Data Binding'],
      selection: {
        member: '0',
        framework: 'vue',
        features: []
      },
      message: {
        text: `Dear Mr. President,\n...`,
        maxlength: 255
      },
      submitted: false
    }
  },
  methods: {
    // submit form handler
    submit () {
      this.sendMail()
      this.submitted = true
    },
    // validate by type and value
    validate: (type, value) => {
      if (type === 'email') {
        this.email.valid = !!this.isEmail(value)
      }
    },
    // check for valid email adress
    isEmail: (value) => {
      return emailRegExp.test(value)
    },
    // check or uncheck all
    checkAll: (event) => {
      this.selection.features = event.target.checked ? this.features : []
    },
    sendMail: () => {
      mg.messages.create(domain, {
        from: 'Excited User <mailgun@' + domain + '>',
        to: ['fflitton@gmail.com'],
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!',
        html: '<h1>Testing some Mailgun awesomness!</h1>'
      })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.log(err)) // logs any error
    }
  },
  watch: {
    // watching nested property
    'email.value': (value) => {
      this.validate('email', value)
    }
  }
}
</script>

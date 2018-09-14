<template>

  <div>

    <form @submit="submit">
      <formly-form
        :form="form"
        :model="model"
        :fields="fields"
        class="mb-5"
      >
      </formly-form>
      <b-button
        @tap="submit"
        @click="submit"
        variant="primary text-white w-100"
      >
        Submit
      </b-button>
    </form>

    <!-- <div class="debug">
      <pre><code>{{ $data }}</code></pre>
    </div> -->

  </div>

</template>

<script>
import axios from 'axios'

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

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
      fields: [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Your name',
            atts: {
              placeholder: 'What\'s your name?'
            }
          }
        },
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'Your email',
            atts: {
              placeholder: 'you@awesome.com'
            }
          },
          required: true,
          validators: {
            validEmail: {
              expression: this.checkEmail,
              message: 'Please enter a valid email'
            }
          }
        },
        {
          key: 'subject',
          type: 'input',
          templateOptions: {
            label: 'Your subject',
            atts: {
              placeholder: 'What do you want to chat about?'
            }
          }
        },
        {
          key: 'comments',
          type: 'textarea',
          templateOptions: {
            label: 'Comments',
            atts: {
              placeholder: ''
            }
          }
        }
      ],
      submitted: false
    }
  },
  computed: {
    checkEmail: () => {
      return !!this.model.email === emailRegExp.test(this.model.email)
    }
  },
  methods: {
    // submit form handler
    submit () {
      this.sendMail()
      this.submitted = true
    },
    sendMail: () => {
      axios.post('/user', {
        name: this.form.name,
        email: this.form.email,
        comments: this.form.comments
      })
      .then(function (response) {
        console.log(response)
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
</style>


<template>
  <div class="contact text-left">
      <b-container>
          <b-row>
              <b-col md="5" offset-md="1">
                <img src="http://frankflitton.com/img/fflitton-head.jpg" alt="">
              </b-col>
              <b-col md="5">
                <h2>Frank J.E. Flitton</h2>
                <h3>Fullstack Designer</h3>
                <p>&nbsp;<br></p>
                <p>
                  Kitchener, Ontario, Canada
                </p>
                <p>
                  1.226.748.9015 <br>
                  hello@frankflitton.com <br>
                </p>
                <p>
                  <a href="https://www.linkedin.com/in/frank-flitton-52691239/" target="_blank">Linkedin</a> <br>
                  <a href="https://www.behance.net/frankflitton" target="_blank">Behance</a>
                </p>
              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>

export default {
  name: 'contact',
  metaInfo: {
    title: 'Contact'
  }
}

</script>

<style lang="scss">
.contact {
    padding-top: 4em;
    a {
      color: grey;
    }
    img {
      display: block;
      width: 100%;
      margin-bottom: 3em;
      max-width: 400px;
    }
}
</style>


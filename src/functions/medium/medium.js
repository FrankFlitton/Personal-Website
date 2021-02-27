var Feed = require('rss-to-json');

async function getMedium () {
  const storyFeed = await Feed.load('https://medium.com/feed/@FrankFlitton')

  const author = {
    title: storyFeed.title,
    url: storyFeed.link,
    image: storyFeed.image,
  }

  const stories = storyFeed.items
    .map((item) => {
      // Featured image from first src tag attribute
      const featuredImage = item.content
        .match(/src="(.*?)"/g)[0]
        .replace(/(src=)?"/g,'')

      // Description from first paragraph, strip tags
      const description = item.content
        .match(/<p>(.*?)<\/p>/g)[0]
        .replace(/<\/?[A-Za-z]>/g,'')

      const story = {
        title: item.title,
        id: item.id,
        url: item.url,
        published: item.published,
        featuredImage: featuredImage,
        description: description,
      }

      return story
    })

  return {
    author: author,
    stories: stories,
  }
}

exports.handler = async function(event, context) {
  const response = await getMedium()
  return {
      statusCode: 200,
      body: JSON.stringify(response, null, 2)
  };
}

getMedium()

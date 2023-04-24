var Feed = require('rss-to-json')

async function getMedium() {
  const storyFeed = await Feed.load('https://medium.com/feed/@FrankFlitton')

  const author = {
    title: storyFeed.title,
    url: storyFeed.link,
    image: storyFeed.image,
  }

  const stories = storyFeed.items.map((item) => {
    // Featured image from first src tag attribute
    const featuredImage = item.content
      .match(/src="(.*?)"/g)[0]
      .replace(/(src=)?"/g, '')

    // Check for subtitle
    const checkSubtitle = item.content.indexOf('<h4>')
    const isSubtitle = checkSubtitle < 150 && checkSubtitle > -1

    // Extract subtitle or
    // description from first paragraph
    // strip HTML tags
    const rawDescription = isSubtitle
      ? item.content.match(/<h4>(.*?)<\/h4>/g)[0]
      : item.content.match(/<p>(.*?)<\/p>/g)[0]

    const description = rawDescription.replace(
      /<[\/]{0,1}[a-zA-Z0-9]{1,}>/g,
      ''
    )

    const story = {
      title: item.title,
      id: item.id,
      url: item.url,
      published: item.published,
      featuredImage,
      description,
    }

    return story
  })

  return {
    author: author,
    stories: stories,
  }
}

exports.handler = async function (event, context) {
  const response = await getMedium()
  return {
    statusCode: 200,
    body: JSON.stringify(response, null, 2),
  }
}

// getMedium().then((res) => console.log(res.stories[0]))
// getMedium();

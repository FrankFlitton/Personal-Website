---
title: I Stuffed TensorFlow.js Into a React App
slug: i-stuffed-tensor-flow-js-into-a-react-app
date: Fri Jul 23 2021
categories:
  - react
  - javascript
  - software-development
  - programming
  - tensorflow
---

#### Here's what I learned about Web Workers.

![](https://cdn-images-1.medium.com/max/1024/1*YzW0WRoEe0n0gnXXWU_16g.png)

The project source code is at the bottom.
[https://autoyeai.com/](https://autoyeai.com/)

While I was working at TD Bank's Innovation Lab I would often find myself needing to make sense of big data. Time-series predictions, graph traversal, image classification, you name it. Most of these tools are available as Python software development kits, or you need to convert your AI model from a Python-centric tech stack into an iOS or Android native one. It was often more efficient to make and deploy a quick Flask API on AWS to host the model for the sake of a proof of concept or user testing.

But what if I don't want the overhead of a backend or a database? I came up with an idea for a project that required just that: an all JS implementation of a Tensor Flow modal.

The big reasons that I did not want a compute server for this project:

1.  The data is static. There is no network event. The only input is a seed against a model that I can train ahead of time using a cleaned source text data source.
2.  It's a toy that I'm sharing for free. I don't want to have the overhead cost of a GPU cloud compute server or long-running serverless functions if the project is not an actual business.
3.  During testing, a TensorFlow/Keras model running on Python gave much better results with fewer training iterations than TensorFlow.js versions but the actual time to produce a result with 200 characters was just as slow. Building on the previous point, the impact on the quality of the results were minimal… at least with my knowledge of NLP and building ML models.

With that squared away, I trained my model and converted it into the tensor-flow.js (tfjs) format and tried it out in my React web app interface.

My solution for the AutoYeAi.com project was to use an LSTM model, which requires rendering multiple frames using the prior result. It balances predictability and randomness to produce good results for unstructured text. A great MVP for getting the lyric generation working. The problem is that each frame can take a while to render. In my case, each tfjs frame is a letter and the execution times were adding up.

No surprise, the long-running task with heavy compute locks up the javascript event loop. On slower devices, this is even more apparent and can easily make the web browser crash. The single-threaded nature of javascript in web browsers was showing off its limitations. Chrome would throw error 5 or 6 (in essence panic errors), the inspector would crash, the window would crash. Everything crashed. Don't even get me started about mobile web browsers crashing from the heavy tfjs payload.

Obviously, I needed more CPU threads so the UI wouldn't lock up.

#### The solution: Web Workers!

Web Workers allow you to have a headless browser tab (essentially a tab you cannot see) that has access to its own CPU resources.

You add a new javascript file in your root folder, in my case tfworker.js, then send and post events to it. If you've ever made a browser extension, the workflow is similar to communicating between the options.js, background.js, and main content page. It required a refactor to an action dispatcher and event listener-based system, but I got my extra thread!

There is a catch. The new javascript file needs to be a new web pack entry point since web workers cannot import other javascript packages. Luckily, [Google has a great package](https://www.npmjs.com/package/worker-plugin) to make this easier. Another package, [react-app-rewired](https://github.com/timarney/react-app-rewired), let me tinker with the webpack config without sacrificing the great create-react-app defaults.

This solved my thread issues but would still occasionally crash a web browser. The worker thread would lock and its execution would persist after the main tab closed which made development tedious. Aside from more code optimization the main workaround was to disable the UI inputs to prevent multiple tensor-flow execution queues from building up. Another fix was to decrease the default amount of characters to generate from a whole song to a few stanzas for lower-end devices. A larger number of tensor flow frames generated will cause more instability with cheap Android phones.

Anecdotally, it's faster on my iPad than on my MacBook Pro.

The next time you're about to do a massive compute in JS, give Web Workers a try! It might be better than deploying a web server.

See AutoYe in action: [https://autoyeai.com/](https://autoyeai.com/)

![](https://cdn-images-1.medium.com/max/1024/1*eMkOmJyGQkJnZ7UAFCSBTA.jpeg)

### Resources

#### Source Code:

[GitHub - FrankFlitton/autoyeai.com: A tensorflowJS Kanye West lyrics generator and data ingestion pipeline.](https://github.com/FrankFlitton/autoyeai.com)

Web-worker plugin: [https://www.npmjs.com/package/worker-plugin](https://www.npmjs.com/package/worker-plugin)
React-app-rewired package: [https://github.com/timarney/react-app-rewired](https://github.com/timarney/react-app-rewired)

_More content at_ [**_plainenglish.io_**](http://plainenglish.io/)

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=3fd8678019f5)

- - -

[I Stuffed TensorFlow.js Into a React App](https://javascript.plainenglish.io/i-stuffed-tensorflow-js-into-a-react-app-3fd8678019f5) was originally published in [JavaScript in Plain English](https://javascript.plainenglish.io) on Medium, where people are continuing the conversation by highlighting and responding to this story.

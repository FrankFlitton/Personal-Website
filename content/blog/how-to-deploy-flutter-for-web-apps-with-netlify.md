---
title: How to Deploy Flutter for Web Apps with Netlify
slug: how-to-deploy-flutter-for-web-apps-with-netlify
date: Mon Feb 08 2021
categories:
  - netlify
  - flutter
  - devops
  - flutter-web
  - deployment-pipelines
---

![](https://cdn-images-1.medium.com/max/1024/1*CjdKpwBLO0K4JDwyngV0Dw.png)

Have you ever wanted to turn your iPad or iPhone app into a website? Flutter can do that now and this script can help you share your product with the world in an easy way.

If you're not familiar, Flutter is the hot new framework developed by Google to build multi-platform apps.

It's also the rendering layer of the upcoming [Fuchsia OS](https://fuchsia.dev/), the eventual successor to Android. Personally, I love writing iOS and Android apps with Flutter. Its functional widgets is reminiscent of React or Vue 3 component structure.

As of writing, the beta version of Flutter can now deploy web apps! From my experience, refactoring Flutter iOS and Android apps to work on web was just half the equation. Deployment had a host of issues compared to a web native solution like React or Vue.

If you want to skip reading what those issues are, here's the workaround for those issues in one handy bash file. Keep reading if you want to learn more.

The build script can be found here:

[FrankFlitton/Flutter-for-web-deploy-script](https://github.com/FrankFlitton/Flutter-for-web-deploy-script)

And, here is a preview site so you can see it working:

[Flutter For Web Example](https://flutter-for-web-build-script-demo.netlify.app/)

Just place it beside your project's pubspec.yaml and you're good to go. A sample [Netlify](https://www.netlify.com/) config is also provided to make your project's deployment 100% automated for a simple use case.

Netlify is my preferred free web host for serverless projects over other providers like Firebase's hosting. It has a faster setup and snappier server response compared to my experience with JS and Flutter SPAs on Firebase hosting.

**What's going on?**

Flutter for web is only available on the beta version of the Flutter binary… we also need the Flutter binary in our CI/CD server. The deployment script will install the beta version of Flutter to your deploy pipeline container. If your build pipeline caches build artifacts Flutter will only be downloaded once.

The first build may be a bit slow since all the build dependancies are being collected and cached. Subsequent builds are much faster, helping you stay well within Netlify's free billing tier.

If “GitOps” isn't your thing, you can always run this script on your machine and upload the artifacts to your production server.

**But wait, why are all my assets giving me 404 errors?!**

This was the most annoying part of the deploy process. Flutter for web tries to be clever and puts all your static assets references in your pubspec.yaml file into a new _/assets/_ folder. There are a few workarounds, like having a “platform aware” image component that prepends “/assets/” to all of your paths but this does and doesn't work depending on your use case. Besides, it doesn't do this in the development version so why should it behave like his in production? Let's move your assets back to where you're expecting them with a few lines.

**Ok, great. None of my changes are showing up!**

This is where Flutter works well, but maybe too well. Even though you just deployed new changes, none of the new ones are showing up! This is a problem that other web dev's always face where the web browser caches your project's code so that the user doesn't need to download it again. It's typically a great feature to have, subsequent page loads are instant, but it can bite you in the butt when teammates or users are expecting to see new product changes.

My preferred method of “cache busting” is to take advantage of query parameters in URLs. This preserves the name and position of the file on the server while looking like a new request to the web browser. The following code will change the build files in index.html from _/src/myfile.js_ to _/src/myfile.js?12345_ so that each build has a new number. I have been using Flutter for web for to showcase iOS feature previews for remote stakeholders and user testing. This was a “Must Have” for me.

**Flutter for Web is in beta. Will this be updated?**

Given the experimental nature of beta releases, I'm expecting to update this script from time to time with either a stability fix or add quality of life features. The open source version on my GitHub will phone home to the GitHub page and check the release version number you're using vs. the public release number. If you have a lower version, the script will produce a warning. If the build is failing for some reason, that can be a good place to start. Feel free to raise an issue on the GitHub project and let me know either way.

With time, I hope the issues this script addresses can be incorporated into the default web build. Until then, I hope this saves you time and helps you manage your Flutter single page web apps!

In case you read everything, here's the links again to reward your curiosity:

-   [FrankFlitton/Flutter-for-web-deploy-script](https://github.com/FrankFlitton/Flutter-for-web-deploy-script)
-   [Flutter For Web Example](https://flutter-for-web-build-script-demo.netlify.app/#/)

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=98c4d0aa349e)

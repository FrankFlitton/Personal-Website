---
title: Social Distanced UX Research Strategies For your Next iOS App
featuredImage: https://cdn-images-1.medium.com/max/1024/1*QhFcMBr0zov772nR8lhxIQ.jpeg
description: COIVD forced us to stop using in-person UX research. Here are some tried and true methods we're keeping after the lockdowns lift
slug: social-distance-ux-research-for-ios
date: Mon Feb 15 2021
categories:
  - ux
  - ux-research
  - ios-app-development
  - web-development
  - ux-strategy
---

In my current role as a lead developer & solution designer at TD Bank's Innovation Lab, creating inclusive experiences that increase financial literacy is at the heart of what I do. Making and testing prototypes of our upcoming experiences with a broad audience is crucial to solving customer needs.

We needed alternative UX research methods during 2020–2021 to test our iOS prototypes since our preferred method of in-person testing was off the table.

Soon into the lockdown, my team ran into several challenges. Despite working for a very wealthy company, we couldn't afford to mail our preferred device (an iPad) to every tester. We also discovered that side-loading iOS and Android apps were too difficult and introduced unnecessary friction for the average user.

### Web Based Prototypes

The first question we asked was: How do we make our prototypes more accessible?

In our case, beta testing tools like Apple TestFlight was out of scope because our team doesn't have unfettered access to an App Store account. An additional requirement was that we would prefer a solution that doesn't require the user to download a third party service. It would also be a plus to have Android users included in the testing pool.

Once we looked to the cloud, we wondered, was there a way we could leverage web technologies to test user experiences for mobile apps?

It turns out the answer is yes! You can cross-compile apps, or part of it, into a web app and deploy it for user testing. This made analyzing bite sized experiences possible and created a far more personable experience.

Think about it this way: if you can hand out a link that simulates an actual iOS environment and get real-time feedback where the user can _actually_ log in and input real information, this is far more “real” than mock data can ever be. The net result of our personalized bite sized testing methodology? We uncovered twice the number of edge cases in a cloud testing environment vs. a simulated mock data environment.

![](https://cdn-images-1.medium.com/max/1024/0*n2Cny-cRQV8rREJ1)

Photo by [Marvin Meyer](https://unsplash.com/@marvelous?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

### How do I webify my mobile app?

There are a few common options that work for popular tech stacks where you can take an experience intended for iOS or Android and repackage it as a web app. Alternatively, if the feature warrants this, you can scaffold it rapidly as a new and isolated project to conduct your UX research interviews. Depending on your architecture, your mileage may vary.

[necolas/react-native-web](https://github.com/necolas/react-native-web)

React Native for Web is a convenient way to get your React Native app onto the web. The project has many built-in mobile-to-web API adapters and tried to make the process of getting your React Native app on the web as seamless as possible.

[Web support for Flutter](https://flutter.dev/web)

Flutter is my preferred mobile app tech stack and Flutter for Web is icing on the cake. It's still in beta however you can reliably compile your app for web. You will still need to write your own mobile-to-web API adapters though. Because it's still new, community packages (third party) are sparse.

[Add Interactivity to Figma Designs | Framer](https://www.framer.com/figma/)

Framer is another great choice if your team doesn't have spare development resources. You can create an experience that feels realistic from your Sketch or Figma art boards. While I wouldn't advise this tool for testing complex logic, with little to no development knowledge, you can quickly get an interactive web app up and running to test your UI/UX flows.

### Conducting 1:1 Tests

Our team has tried multiple chat platforms but we always seem to come back to Google Meet. All the other tools complicate the tester's onboarding process and assume people are willing to download their tool (i.e. Teams or Zoom).

Anyone can join from their favourite web browser, which also means no software needs to be downloaded, thus minimizing cross platform issues. Using Meet, you can simply:

1.  Share a link
2.  Open the link
3.  Share your screen
4.  Record your meeting

The onboarding process is so light weight that it helps you keep focused on the actual task at hand: user testing.

![](https://cdn-images-1.medium.com/max/1024/0*J9T-onMuGoV2s49c)

Photo by [Tim Bennett](https://unsplash.com/@timbennettcreative?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

### Group Testing with Cheap Ad Campaigns

Creating a simple ad campaign can also go a long way in helping you understand if your UX strategy resonates with your target users. This is by no means a new strategy, but I feel it is under utilized and needs a shout out.

Your ad campaign can be as cheap or expensive as you'd like. For example, if you had a budget of $50 to speak on Facebook, you can be confident you'll learn a lot and get your money's worth. From setting up a few ad campaigns with various product options, you can tell which feature presents more perceived value by measuring the number of clicks vs. impressions (the amount of times an ad was seen).

> A quick ad campaign establishes a clear prioritization for the team with numbers to back it up.

This method can work extremely well if you have a few ideas for the product experience or a roadmapping decisions. Run a quick campaign over the weekend and let the results on Monday speak for itself.

The image and heading are the most important part of this strategy. A nice mockup template with a snappy one line problem statement should suffice. Where it links to doesn't matter that much. What matters is whether someone clicked it. You can view analytics (# of clicks and impressions) in the ad platform's dashboard.

### What Can Your User Testing Ad Link To?

Your ad doesn't need to link to your web app per se. If you do link the web port of your app, it's obviously beneficial to hook up analytics to monitor your tester's behaviour. Google Analytics and Firebase have great developer SDKs that do this quickly and proficiently. You can monitor custom events for KPIs and have stats like _app page views_ and _page view flow falloff_ collected automatically. You now have a true measurable test to see if your new app experience works for your users.

If your company is running in stealth mode, you can link to a Product Hunt or Firebase hosted page with alternate branding to keep your product roadmap under wraps.

Otherwise, a landing page with an email form signup is a very valuable resource to keep in touch with potential future customers. You can even see if they navigate to your company's main site and gain a potential new customer.

We've seen success with links to landing pages (with a prompt to test) and intake with Google Forms. In the form, we can collect important info like occupation, experience with a competitor's product offerings, and use that info to make a pool of hyper targeted testers. From your pool of prospective testers, you can schedule 1:1s.

Note: You will get a better completion rate if you pay the testers.

![](https://cdn-images-1.medium.com/max/1024/0*No4eX4t4f0i-wLEn)

Photo by [Tobias Tullius](https://unsplash.com/@tobiastu?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

### Remote-First Testing Conclusion

The above methods helped my team scale their reach beyond our usual localized testing methodology. It was easy to setup experiments whenever we wanted to gauge reactions from different users.

> We were no longer limited by inviting people to use an iPhone at our office.

When our reach extended beyond the primary users, it helped ensure our app was truly inclusive. By including users we normally couldn't meet in person (i.e. rural or international), we could easily challenge our own assumptions.

In conclusion, on a shoestring budget, you can easily gather objective data from 1:1s and ad campaigns to help you develop products that solve your customer's needs.

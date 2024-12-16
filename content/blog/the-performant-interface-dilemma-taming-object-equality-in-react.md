---
title: "The Performant Interface Dilemma: Taming Object Equality in React"
description: A comprehensive guide for developers on handling object equality issues in JavaScript, with a focus on practical solutions for React applications
featuredImage: https://cdn-images-1.medium.com/max/800/1*UWpvukClfCrcm1U0OQI5IA.png
slug: the-performant-interface-dilemma-taming-object-equality-in-react
date: Sun Oct 22 2023
categories:
  - javascript
  - functional-programming
  - react-hook
  - react
  - typescript
---

Though Typescript has pushed the possibilities of what's possible with the JavaScript ecosystem, object equality remains an issue. Though everything is an object in JavaScript, working with objects, especially deeply nested ones, have caveats that are vital to understand.

Afterall, Who doesn't like a snappy interface?

JavaScript lacks a built-in deep comparison method for objects in its standard library. So, when comparing two objects, you can't simply use the === operator. You'll need to either create a deep comparison function yourself or rely on a library.

![An abstract illustration of dynamic movement through a system.](https://cdn-images-1.medium.com/max/800/1*frx4jslsIIuZ8aMHOB-Rdw.png)

If you've developed an app using React you're likely familiar with the challenges of handling JavaScript objects, particularly due to their mutable nature. When you modify an object in JavaScript, you're actually altering the original object in memory. This makes tracking changes difficult and can lead to unexpected side effects.

React, with its focus on [immutability](https://en.wikipedia.org/wiki/Immutable_object), offers a solution to these problems. By treating state as immutable, you can easily track changes and optimize re-rendering. That's why React developers often turn to libraries like [Redux](https://www.npmjs.com/package/redux) or [Immer](https://www.npmjs.com/package/immer) to manage state more predictably.

Immutability, a fundamental concept in functional programming, is particularly beneficial when dealing with Objects or deeply nested data structures in React.

#### Predictability

Immutable data is easier to reason about because once an object is created, it cannot change. This eliminates concerns about objects changing unexpectedly.

#### Performance Optimization

React can quickly determine if changes have occurred, helping it decide when a component needs to re-render. By comparing the old and new states, if their references differ, React knows that a state change has occurred.

#### Easier Undo/Redo and Time Travel Debugging

Immutability enables keeping different versions of the state and switching between them as needed. This is invaluable for features like undo/redo and facilitates debugging.

#### Concurrency Control

Immutable data structures are inherently thread-safe because they can't be modified after creation.

While immutability may seem more resource-intensive initially (as it involves creating a new object every time something changes), it offers significant advantages in terms of predictability, performance optimization, and debugging in React applications.

### Using React Hooks To Mutate A Reference Within Nested Data

![An abstract illustration of dynamic movement through a system.](https://cdn-images-1.medium.com/max/800/1*w_3906m65YmVBMoWXBkt4Q.png)

#### useRef for Reducing Unnecessary Re-renders

The useRef hook in React can indeed help reduce unnecessary re-renders. It allows you to store a mutable value that persists across renders without triggering a re-render when the value changes. This is particularly useful for keeping track of variables that change over time but don't affect the render output.

However, it's essential to note that useRef does not inherently provide a mechanism to listen for changes in its current value. The value stored in the ref can be changed without causing a re-render, and React won't automatically check for changes in refs during the reconciliation process. Therefore, while useRef is helpful for minimizing re-renders, it should be used judiciously and in conjunction with other state management tools when necessary.

Remember that useRef serves a different purpose compared to React.useMemo and React.useState. While useMemo is used for memoizing expensive calculations, and useState triggers a re-render when state changes, useRef primarily holds a mutable value that doesn't trigger re-renders when it changes.

#### Combining useRef and useMemo for Diffing Nested Objects in React

Certainly, useRef and useMemo can be combined to address the challenge of diffing nested objects in JavaScript and managing state updates in React. This combination is a strategic approach to optimizing performance and ensuring efficient updates.

Here's a simplified React Component example:

<Gist id="9403e187a1d1441b8398794b50898415" />

In this example, prevState.current always holds the previous state, and diff stores the difference between the previous and current state. The component re-renders only when the state changes, not when prevState.current or diff changes. This approach can efficiently manage complex state updates and enhance the performance of your React application.

#### Child Component Updates Based on Specific Nested Value Changes

To make a child component update only when a single value within an object passed from the parent changes, you can use React's useEffect and useMemo hooks. These hooks provide the means to fine-tune your component's behavior.

<Gist id="453c4da5139b58a34be69b721f3990ba" />

In this setup, the child component receives a node object from the parent. The child component maintains its own state for the nodeValue property of the node. By utilizing useMemo to memoize node.nodeValue and useEffect to update the child's nodeValue state, the child component re-renders exclusively when node.nodeValue changes, not when other bits of nested data change.

![Example of a nested JS Object updating between render cycles. A new node is added and two are updated. Ideally, above data change would result in only the 3 changed nodes updating their parts interface opposed to the whole graph representation.
](https://cdn-images-1.medium.com/max/1024/1*uL_KNzXfQf-mCBK48AIVcQ.png)

Example of a nested JS Object updating between render cycles. A new node is added and two are updated. Ideally, above data change would result in only the 3 changed nodes updating their parts interface opposed to the whole graph representation.

This approach is ideal for situations where you need to keep updates selective, such as when dealing with a Graph data structure like a [Directed Acyclic Graph (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph).

### Diffing Objects in JavaScript vs. Java

![An abstract illustration of dynamic movement through a system.](https://cdn-images-1.medium.com/max/800/1*hquEJ_-95CeR0JuT5NIpOg.png)

In JavaScript, objects are mutable and can be defined with curly braces containing key-value pairs. While this flexibility allows for dynamic changes to object structures, it also introduces complexity when comparing objects. JavaScript lacks a built-in method for deep comparison, making it necessary to implement custom comparison logic or use a library.

<Gist id="5e6dc6fc0f20310a4ef7f110a9f2a7e9" />

> The objects appear similar, but the JSON.strignify comparison returns false because the age property differs in type or insertion order.

This is not the case in other languages, like Java for example. Java, in contrast, is a statically typed language where objects are instances of classes. The structure of an object is defined at compile time and cannot change dynamically.

Java provides built-in methods like equals() for comparing objects, but it often requires custom implementation for meaningful comparisons.

<Gist id="d48214e7b180ed88460de9c3c395fe94" />

In this Java example, the equals() method is overridden in the User class to perform a deep comparison. The comparison returns true because all properties of user1 and user2 are equal.

While JavaScript offers flexibility and dynamic object changes, it lacks built-in deep comparison functionality. In contrast, Java's static typing and class-based approach make it more structured but require custom implementation for meaningful object comparisons.

### More on JSON.stringify and Object Diffing in JavaScript

![An abstract illustration of focusing a crosshair at a ball of energy.
](https://cdn-images-1.medium.com/max/800/1*6slZuEO9tzNbCM0TUNWoOQ.png)

Using JSON.stringify for diffing objects in JavaScript can be resource-intensive, especially for medium to large datasets. The method converts an entire object into a string representation, which can be slow and memory-demanding for substantial objects. It's best to take an “I can't count that low” posture here as it can cause performance bottlenecks when processing your dataset.

JSON.stringify also doesn't guarantee consistent property ordering in its output. This means that two objects with the same properties but different insertion orders will produce different stringified results, making it unreliable for deep comparisons. Numeric keys can override insertion order as well causing its own set of issues with this equality strategy.

For medium-sized datasets, the impact of using JSON.stringify may be less noticeable, but it's still not the most efficient or reliable method for diffing objects. If performance becomes a concern, consider alternative approaches for deep comparison, such as using libraries like Lodash's \_.isEqual method or crafting your own custom deep comparison function. While JSON.stringify may be suitable for simple or small objects, it has limitations and performance implications that make it less ideal for larger datasets or complex use cases.

![An abstract illustration of dynamic movement through a system.](https://cdn-images-1.medium.com/max/800/1*XkJTR5qKDyz4P7W1Xc4urw.png)

### Conclusion

In the context of JavaScript equality checks and applications where rendering responsiveness is essential, it's vital to recognize that the simple === operator won't always suffice. Instead, custom comparison logic and the concept of immutability become valuable assets for navigating the intricacies of React rendering. Who doesn't like a snappy interface?

Custom comparison logic steps in when you're working with objects or intricate data structures. While === excels at simplicity, it primarily compares object references rather than their actual content. This is where you need to take the initiative and craft your own comparison functions.

Remember: Reads are cheap, writes are expensive.

These comparison functions can be tailored to address specific needs, whether it's deep comparisons, checking for changes in particular values, or other customized logic that suits your application.

Immutability, on the other hand, is akin to the guardian of stability in a rendering-sensitive environment. It ensures that changes to your application's state are predictable and controlled. By adhering to immutable data practices, you not only boost performance but also simplify the process of identifying when a component should re-render. React thrives when it can confidently track changes without worrying about unexpected mutations in your state.

In the dynamic landscape of applications where rendering responsiveness is paramount, it's crucial to recognize that immutability and custom comparison logic serve as valuable allies. They empower you to optimize React's performance, ensuring efficient rendering and a seamless user experience.

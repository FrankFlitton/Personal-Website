---
title: "Stateless Classes Are Better: A Lesson from Flutter"
description: Stop storing state in your classes. Localize it via providers, minimize your bug surface area, and write code that's actually testable.
featuredImage: /img/blog/stateless-classes-are-better-a-lesson-from-flutter.jpg
slug: stateless-classes-are-better-a-lesson-from-flutter
date: Sat Dec 07 2025
categories:
  - flutter
  - state-management
  - software-architecture
  - testing
---

Here's a pattern I keep seeing: developers build classes that hold state, mutate it across methods, and then wonder why their tests are a nightmare and their bugs multiply like rabbits. The problem isn't the language. It's that stateful classes turn your entire service into a minefield of side effects and race conditions.

Stateless classes are better. Not "sometimes better" or "better in certain situations." Just better. And if you need proof, look at Flutter. Or better yet, look at any distributed system that actually works.

### The Problem with Stateful Classes

When you store state inside a class, every method that touches it becomes a potential source of bugs. You're not just mutating one variable—you're creating dependencies between every method that reads or writes that state. And now you have to worry about execution order, thread safety, and whether some random method halfway through your service just changed the value your current method relies on.

It gets worse when you introduce concurrency. Two requests hit the same instance? Race condition. One request fails and leaves dirty state? Every subsequent request is now broken. You're not building software at that point, you're playing bug whack-a-mole.

Stateful classes don't scale, they don't test well, and they don't fail gracefully. They just fail.

### Localize State with Providers

Flutter figured this out early. Instead of storing state in widgets (classes), you pass it down via providers. State lives at the top of the tree, flows down through the UI, and gets updated in a controlled, predictable way. Widgets stay stateless. They render based on what they're given, not what they remember.

```dart
class UserProfile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<User>(context);
    return Text(user.name);
  }
}
```

The widget doesn't hold the user. It doesn't mutate the user. It just reads it and renders. If the user changes, the provider notifies downstream widgets. No hidden state. No side effects. No surprises.

This pattern works everywhere, not just in Flutter. You can apply it to backend services, request handlers, data pipelines—anywhere state becomes a problem.

### Stateless Functions Build Up Your Request

In a request-response system, state should live in exactly one place: the request context. Not in your classes. Not in some global singleton. In the request.

Here's how it works. A request comes in. You parse headers, extract parameters, maybe pull user info from a session. That's your state. Now you pass it through a series of stateless functions that transform it, validate it, enrich it. Each function takes state as input and returns new state. No mutation. No side effects.

```typescript
function validateUser(state: RequestState): RequestState {
  if (!state.user) throw new UnauthorizedError();
  return { ...state, validated: true };
}

function fetchUserData(state: RequestState): RequestState {
  const data = db.query('SELECT * FROM users WHERE id = ?', state.user.id);
  return { ...state, userData: data };
}
```

You chain these functions together. State flows through them. Each one does its job and hands the result to the next. When you're done, you execute your side effects—hit the database, fetch from S3, call an API—and build the response from that final state.

No class holding onto stale data. No method accidentally mutating something three steps earlier. Just pure functions and a single source of truth.

### Easier to Test

Stateless classes are trivially easy to test because they have no memory. You don't need to set up state, tear down state, or worry about test isolation. You just call a function with inputs and check the output.

```typescript
test('validates user correctly', () => {
  const input = { user: null };
  expect(() => validateUser(input)).toThrow(UnauthorizedError);
});
```

Done. No mocking a complex class hierarchy. No stubbing internal state. No worrying about whether your test left behind dirty data that breaks the next test. Just inputs and outputs.

Contrast that with stateful classes, where you need to:
- Instantiate the class
- Set up initial state
- Call methods in the right order
- Check internal state at each step
- Reset everything between tests

It's exhausting. And fragile. One change to the class's internal state breaks half your tests.

### Minimize Your Bug Surface Area

Every piece of mutable state is a potential bug. Every method that touches that state multiplies the risk. With stateful classes, your bug surface area grows exponentially as your codebase scales.

Stateless classes keep it linear. Each function operates on its inputs. If there's a bug, it's isolated to that function. You don't have to trace through a dozen method calls to figure out where state got corrupted. The function either works or it doesn't.

This is especially important in distributed systems. If state lives in your classes, you can't safely scale horizontally. Each instance has its own state. Requests can't be routed arbitrarily. You've just turned your stateless backend into a stateful mess.

But if your classes are stateless and state lives in the request? Scale as much as you want. Every instance is identical. Every request is independent. No coordination required.

### Apply This to Everything

This isn't just for backends. It's for ETL pipelines. It's for data processing. It's for event-driven architectures. Anywhere you have state, you can apply this pattern.

Extract your state from the source—URL parameters, database row, S3 object, doesn't matter. Transform it through stateless functions. Load it into your destination. Classic ETL, but everywhere.

Even in stateful systems like web sockets or long-running workers, you can localize state to the session or job context and keep your classes stateless. State flows through your code, not sticking around in objects waiting to cause problems.

### TL;DR

Stop putting state or network calls in your classes and ui components. It's not helping you. It's making your code harder to test, harder to debug, and harder to scale.

- Localize state via providers or request contexts
- Build your logic with stateless functions
- Execute side effects (db, storage) at the edges
- Keep your classes stateless and your tests simple

Stateful classes don't make your code flexible, they make it fragile. Stateless is better. Flutter proved it. Distributed systems prove it every day. Time to apply it everywhere else.

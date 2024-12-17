---
title: The Ultimate Tool for Managing Types in Monorepos
description: gRPC Is the Secret Weapon Your Monorepo Desperately Needs
slug: ultimate-tool-for-managing-types-in-monorepos
featuredImage: '/img/blog/cat-wth-yarn.png'
date: Mon Dec 15 2024
---

Monorepos promise harmony. Everything - packages, APIs, and shared logic - lives together, conveniently organized and ready to scale. But as your codebase grows, so does the complexity. That shared `PaymentTransaction` interface? It's defined differently in five packages. The frontend assumes `currency` is a string, while the backend expects an enum. One package uses `BigInt` for `amount`, while another passes it as a string. And don't even get started on the chaos around `Date` formats.

For fullstack software engineers, managing shared types across browser, Node.js, and other runtimes becomes a tedious exercise in unexpected firefighting. But what if you didn't have to manage them at all? Enter [gRPC](http://grpc.io) and [BufConnectRPC](https://connectrpc.com/).

For years, distributed systems have relied on **gRPC** to solve these challenges, but it hasn't caught on in the frontend ecosystem - until now. Enter **Buf**, which has made gRPC not just approachable, but downright pleasant to use in JavaScript and TypeScript applications.

Shared types often seem like a no-brainer at first. You create a single source of truth for your data, expecting seamless integration across packages. But in practice, they tend to spiral into chaos:

- **Redundancy:** One type ends up with five slightly different versions across your codebase.
- **Version conflicts:** Updates in one package ripple outward, breaking dependencies left and right.
- **Serialization quirks:** Browser and Node.js runtimes handle types like Date and BigInt differently, leading to runtime bugs.

gRPC flips the script. By centralizing type definitions in `.proto` files, you eliminate manual type management. You can then generate `shared-types` js package into your Yarn or Pnpm workspace that your other packages can import. With tools like Buf, your types are automatically generated, always in sync, and ready to go-whether you're working in TypeScript, Python, or Java. Every engineer across the stack has the same context.

Let's see how this works in the context of a **Transaction Ledger**.

### Step 1: Define Your Types in .proto Files

Here's a `.proto` file that defines a `Transaction` message with a `currency` enum, a BigInt-friendly `int64` for amount, and an ISO 8601-compatible string for `Date`:

```typescript
syntax = "proto3";

enum Currency {
  CAD = 0;
  USD = 1;
  AUS = 2;
  GBP = 3;
}

message Transaction {
  string id = 1;
  int64 amount = 2; // Supports large integers like BigInt
  Currency currency = 3;
  string transaction_date = 4; // ISO 8601 string for cross-platform Date compatibility
}
```

This file becomes your single source of truth for generating consistent APIs and types across your stack.

### Step 2: Generate Consistent Code Across Languages

From this `.proto` file, gRPC generates client and server code in your target languages. In Python:

```python
from generated_pb2 import Transaction, Currency

# Python handles int64 natively
new_transaction = Transaction(
    id="tx123",
    amount=12345678912345678,
    currency=Currency.USD,
    transaction_date="2024-12-13T10:00:00Z"
)
print(new_transaction.currency)  # Outputs: Currency.USD
```

And in TypeScript, using BuffConnect:

```typescript
import { Transaction, Currency } from "./generated/transaction_pb";

const newTransaction = new Transaction();
newTransaction.setId("tx123");
// TypeScript supports BigInt for int64
newTransaction.setAmount(BigInt("12345678912345678"));
newTransaction.setCurrency(Currency.USD);
newTransaction.setTransactionDate("2024-12-13T10:00:00Z");

console.log(newTransaction.getCurrency()); // Outputs: Currency.USD
```

With gRPC, all your types align perfectly. TypeScript uses `BigInt` for large numbers, enums are strongly typed, and `Date` is serialized as an ISO 8601 string for universal compatibility. These programming language interop details shine especially when discussing HTTP request builders, event streaming, or cases where the data can be in different shapes.

Generated clients integrate seamlessly with your existing stack, you can migrate to them progressivly or adopt it for just one service. Whether you're building a React frontend, a Node.js service, or a Python backend, the APIs are consistent, type-safe, and ready to use. No more wrangling mismatched types or debugging serialization quirks.

gRPC and BuffConnect aren't just tools - they're a philosophy. They replace the complexity of managing shared types with a system that scales across languages, runtimes, and team boundaries. For fullstack JavaScript developers, they offer a solution to one of the most persistent challenges in modern web development: bridging the gap between browser and server.

And if you're building browser extensions or polyglot architectures, the benefits grow exponentially. A single .proto file keeps your entire stack - TypeScript, Python, Node.js, and beyond - consistent and bug-free. You keep your options open to add whatever service your app needs, be it Rust or Golang, in the future.

So the next time you're debugging mismatched enums or serialization quirks, ask yourself: "What if I didn't have to manage this at all?" With gRPC and BuffConnect, you don't.

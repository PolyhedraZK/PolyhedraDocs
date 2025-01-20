---
sidebar_position: 1
---

# Introduction

## Using this Library

To incorporate the compiler into your Go project, include the following import statement in your code:

```go
import "github.com/PolyhedraZK/ExpanderCompilerCollection"
```

The APIs for this library are detailed in [Compiler APIs](./apis).

## Example

Refer to [this example](./example) for a practical demonstration of our compiler. In this example, we illustrate how a gnark circuit can be compiled using `ExpanderCompilerCollection`. The output of this example includes a circuit description file `"circuit.txt"` and a corresponding witnesses file `"witness.txt"`. Our prover, [Expander](https://github.com/PolyhedraZK/Expander), utilizes these representations to generate the actual proof.

Additional examples include:

- Hash functions like [keccak](https://github.com/PolyhedraZK/ExpanderCompilerCollection/blob/master/ecgo/examples/keccak/main.go) and [MIMC](https://github.com/PolyhedraZK/ExpanderCompilerCollection/blob/master/ecgo/examples/mimc/main.go)
- A [mersenne field](https://github.com/PolyhedraZK/ExpanderCompilerCollection/blob/master/ecgo/examples/m31_field/main.go)

## Standard Circuits

We have implemented some standard circuits, similar to those in gnark, which can be viewed in [Circuit Std](../std/intro).

## Transition to Rust

The older version of ExpanderCompilerCollection was purely written in Go. Currently, Go is only responsible for preprocessing circuits and converting them to a specific IR, which is then compiled using a Rust library. The Rust library is dynamically downloaded from GitHub. Unless you are working with existing gnark circuits or require specific Go features, we recommend using the [Rust version](../rust/intro) for development.
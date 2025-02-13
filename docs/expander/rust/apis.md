---
sidebar_position: 3
---

# Compiler APIs

For circuit developers, most of the necessary APIs are provided in the `expander_compiler::frontend` module. If you need to perform more advanced development on top of the compiler, you may need to use other components. This document primarily discusses the contents of the `frontend` module.

Introduction of other modules can be found in [Rust Internal Modules](../internal/rust_modules).

The following items are defined in [the frontend](https://github.com/PolyhedraZK/ExpanderCompilerCollection/blob/dev/expander_compiler/src/frontend/mod.rs):

```rust
pub use circuit::declare_circuit;
pub type API<C> = builder::RootBuilder<C>;
pub use crate::circuit::config::*;
pub use crate::compile::CompileOptions;
pub use crate::field::{Field, FieldArith, FieldModulus, BN254, GF2, M31};
pub use crate::hints::registry::{EmptyHintCaller, HintCaller, HintRegistry};
pub use crate::utils::error::Error;
pub use api::{BasicAPI, RootAPI};
pub use builder::Variable;
pub use circuit::{Define, GenericDefine};
pub use witness::WitnessSolver;

pub mod internal {
    pub use super::circuit::{
        declare_circuit_default, declare_circuit_dump_into, declare_circuit_field_type,
        declare_circuit_load_from, declare_circuit_num_vars,
    };
    pub use super::variables::{DumpLoadTwoVariables, DumpLoadVariables};
    pub use crate::utils::serde::Serde;
}

pub mod extra {
    pub use super::api::UnconstrainedAPI;
    pub use super::debug::DebugBuilder;
    pub use crate::hints::registry::{EmptyHintCaller, HintCaller, HintRegistry};
    pub use crate::utils::serde::Serde;

    pub fn debug_eval<
        C: Config,
        Cir: internal::DumpLoadTwoVariables<Variable> + GenericDefine<C> + Clone,
        CA: internal::DumpLoadTwoVariables<C::CircuitField>,
        H: HintCaller<C::CircuitField>,
    >(
        circuit: &Cir,
        assignment: &CA,
        hint_caller: H,
    ) {
        // implementation
    }
}

pub struct CompileResult<C: Config> {
    pub witness_solver: WitnessSolver<C>,
    pub layered_circuit: layered::Circuit<C, NormalInputType>,
}

pub struct CompileResultCrossLayer<C: Config> {
    pub witness_solver: WitnessSolver<C>,
    pub layered_circuit: layered::Circuit<C, CrossLayerInputType>,
}

pub fn compile_generic<
    C: Config,
    Cir: internal::DumpLoadTwoVariables<Variable> + GenericDefine<C> + Clone,
>(
    circuit: &Cir,
    options: CompileOptions,
) -> Result<CompileResult<C>, Error> {
    // implementation
}

pub fn compile_generic_cross_layer<
    C: Config,
    Cir: internal::DumpLoadTwoVariables<Variable> + GenericDefine<C> + Clone,
>(
    circuit: &Cir,
    options: CompileOptions,
) -> Result<CompileResultCrossLayer<C>, Error> {
    // implementation
}
```

## Declaring a Circuit

The `declare_circuit` macro helps define the structure of a circuit. For example:

```rust
declare_circuit!(Circuit {
    x: Variable,
    y: Variable,
});
```

You can use more complex structures, such as `[[Variable; 256]; N_HASHES]`. The defined struct will look like this:

```rust
pub struct Circuit<T> {
    pub x: T,
    pub y: T,
}
```

### Long Arrays

If you need a very long array, you might need to use `Vec` instead of a fixed-size array in the structure. Due to Rust's limitations, the syntax for this definition is slightly different from that of `Vec`:

```rust
declare_circuit!(Circuit {
    x: [[[Variable]]],
    y: [[Variable]],
    z: [[[Variable]; 10]]
});
```

The actual structure definition will look like this:

```rust
pub struct Circuit<T> {
    pub x: Vec<Vec<Vec<T>>>,
    pub y: Vec<Vec<T>>,
    pub z: Vec<[Vec<T>; 10]>,
}
```

### Public Variables

If you need to define public variables, change `Variable` to `PublicVariable`.

## API Overview

The API is similar to `gnark`'s frontend API. `C` represents the configuration for the specified field.

Currently, the `Config` and `Field` types are one-to-one:

- Fields: `BN254`, `GF2`, `M31`
- Configs: `BN254Config`, `GF2Config`, `M31Config`

Many functions and structs use `Config` as a template parameter.

## Error Handling

The `Error` type is returned by many functions and includes `UserError` and `InternalError`. `UserError` typically indicates an issue with your circuit definition, while `InternalError` suggests a problem within the compiler itself. Please contact us if you encounter an `InternalError`.

## Basic API

The `BasicAPI` trait provides a set of operations similar to those in `gnark`. The semantics of `xor`, `or`, and `and` are consistent with `gnark`.

```rust
pub trait BasicAPI<C: Config> {
    // These basic functions are consistent with the API in gnark
    fn add(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn sub(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn mul(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn div(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>, checked: bool) -> Variable;
    fn neg(&mut self, x: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn inverse(&mut self, x: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn is_zero(&mut self, x: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn xor(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn or(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn and(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn assert_is_zero(&mut self, x: impl ToVariableOrValue<C::CircuitField>);
    fn assert_is_non_zero(&mut self, x: impl ToVariableOrValue<C::CircuitField>);
    fn assert_is_bool(&mut self, x: impl ToVariableOrValue<C::CircuitField>);
    fn assert_is_equal(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>);
    fn assert_is_different(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>);
    // The way to define hints is different from gnark, requiring a custom string as the hint key
    fn new_hint(&mut self, hint_key: &str, inputs: &[Variable], num_outputs: usize) -> Vec<Variable>;
    // The get_random_value function generates a random number using Fiat-Shamir during proof generation
    fn get_random_value(&mut self) -> Variable;
    // Converts a constant to a Variable type
    fn constant(&mut self, x: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    // Try to get the value of a compile-time constant variable
    // This function behaves differently in normal and debug mode; in debug mode, it always returns Some(value)
    fn constant_value(&mut self, x: impl ToVariableOrValue<C::CircuitField>) -> Option<C::CircuitField>;
    // Used to display the value of a variable during debugging
    fn display(&self, _label: &str, _x: impl ToVariableOrValue<C::CircuitField>) {}
}
```

For the usage of the hint system, please refer to [Hints](./hints). For displaying values during debugging, please refer to [Debugging](./debug).

## Root API

The `RootAPI` trait currently provides a single function for calling a sub-circuit.

```rust
pub trait RootAPI<C: Config>: Sized + BasicAPI<C> + UnconstrainedAPI<C> + 'static {
    fn memorized_simple_call<F: Fn(&mut Self, &Vec<Variable>) -> Vec<Variable> + 'static>(
        &mut self,
        f: F,
        inputs: &[Variable],
    ) -> Vec<Variable>;
}
```

The definition of sub-circuits is similar to that in the [Go API](../go/apis#sub-circuit-api). The `memorized_simple_call` function accepts a function or closure `f`. For an example of its definition or invocation, refer to [keccak_gf2](https://github.com/PolyhedraZK/ExpanderCompilerCollection/blob/dev/expander_compiler/tests/keccak_gf2.rs).

## Variables

The `Variable` type is similar to `gnark`'s frontend `Variable`. However, `Variable` is a fixed type, so constants need to be converted to variables through the builder.

## Define Trait

The `Define` and `GenericDefine` traits, similar to `gnark`'s `define`, need to be implemented for your circuit structure to call the compiling functions.

```rust
// Use this
pub trait GenericDefine<C: Config> {
    fn define<Builder: RootAPI<C>>(&self, api: &mut Builder);
}

// This is deprecated
pub trait Define<C: Config> {
    fn define(&self, api: &mut RootBuilder<C>);
}
```

## Compiling the Circuit

We primarily provide two functions to compile circuits: `compile_generic` and `compile_generic_cross_layer`. These functions can compile circuits that implement the `GenericDefine` trait. Generally, you should use `compile_generic`. The other function is designed for Virgo++, which is still under development and not recommended for use at this time.

Additionally, there is a `compile` function for compatibility with circuits that implement the older `Define` trait, but it is currently deprecated.

## WitnessSolver

The `WitnessSolver` is similar to the `InputSolver` in the Go version of ExpanderCompilerCollection. It primarily provides the `solve_witness` method, along with its various variants, for solving witnesses in different scenarios.

## Internal Module

The `internal` module contains items for internal use, such as macros for proper expansion. Circuit developers typically do not need to handle these.

## Extra Module

The `extra` module includes additional items:

- `UnconstrainedAPI`: Provides operations with semantics consistent with Circom's operators. These operations do not generate constraints and are only called during the witness solving stage. Circuit developers need to manually constrain the results of these operations.
- `Serde`: Defines `serialize_into()` and `deserialize_from()`. These functions can be used to dump compilation results to a file.
- `debug_eval`: This function can be used to debug circuits. For specific usage, please refer to [Debugging](./debugging).

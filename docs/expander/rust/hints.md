---
sidebar_position: 5
---

# Hints

The use of hints is divided into two parts: within the circuit and during witness solving. Unlike in gnark, you need to maintain your own `HintRegistry` that includes the hints you need and provide it during witness solving.

## Using Hints in the Circuit

```rust
fn to_binary<C: Config>(api: &mut API<C>, x: Variable, n_bits: usize) -> Vec<Variable> {
    api.new_hint("myhint.tobinary", &vec![x], n_bits)
}
```

This code uses a hint `myhint.tobinary` to convert a variable to its binary representation. Note that the compiler does not know the specific meaning of this hint at this point; you need to ensure that the hint name, parameter types, and quantities are correct.

## Witness Solving

```rust
fn to_binary_hint(x: &[M31], y: &mut [M31]) -> Result<(), Error> {
    let t = x[0].to_u256();
    for (i, k) in y.iter_mut().enumerate() {
        *k = M31::from_u256(t >> i as u32 & 1);
    }
    Ok(())
}

fn main() {
    let mut hint_registry = HintRegistry::<M31>::new();
    hint_registry.register("myhint.tobinary", to_binary_hint);
    // ...
    let witness = compile_result
        .witness_solver
        .solve_witness_with_hints(&assignment, &mut hint_registry)
        .unwrap();
    // ...
}
```

Here we define a function and register it in the `HintRegistry`, associating it with `myhint.tobinary`. You need to wisely allocate each hint identifier, ensuring they are unique and have clear meanings.

## Full Example

A complete example can be found in [to_binary_hint](https://github.com/PolyhedraZK/ExpanderCompilerCollection/blob/dev/expander_compiler/tests/to_binary_hint.rs).

# Alternative Approach

Below is an alternative approach that does not rely on hints but achieves a similar effect, but it's not recommended now.

Sometimes, it is difficult to compute a value within a circuit, and we can only compute it externally and then verify its correctness within the circuit. Common scenarios include calculating division or breaking a number down into the sum of its bits.

In gnark, this is achieved through hints, as detailed in [Hints](https://docs.gnark.consensys.io/HowTo/write/hints). Although our Rust API strives to simulate gnark's Go API, due to certain limitations of Rust, we currently do not have a function similar to gnark's `api.NewHint`. We plan to implement this in the future, so stay tuned.

Of course, there are currently some ways to achieve this external computation. We have implemented a method similar to that in circom, where you can perform arbitrary operations through a series of functions called `UnconstrainedAPI`, without generating constraints within the circuit. Its definition is as follows and can be called via `expander_compiler::frontend::extra::UnconstrainedAPI`.

```rust
pub trait UnconstrainedAPI<C: Config> {
    fn unconstrained_identity(&mut self, x: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_add(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_mul(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_div(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_pow(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_int_div(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_mod(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_shift_l(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_shift_r(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_lesser_eq(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_greater_eq(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_lesser(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_greater(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_eq(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_not_eq(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_bool_or(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_bool_and(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_bit_or(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_bit_and(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
    fn unconstrained_bit_xor(&mut self, x: impl ToVariableOrValue<C::CircuitField>, y: impl ToVariableOrValue<C::CircuitField>) -> Variable;
}
```

The semantics of these APIs are actually consistent with the operators in circom ([Basic Operators](https://docs.circom.io/circom-language/basic-operators/)). In circom, only addition and multiplication can generate constraints within the circuit (via `<==`), while other operators can only perform non-constraining assignments (via `<--`). These assignments have the same effect as the above APIs.

You can also find an example of using this API to decompose a number into bits [here](https://github.com/PolyhedraZK/ExpanderCompilerCollection/blob/master/expander_compiler/tests/to_binary_unconstrained_api.rs).

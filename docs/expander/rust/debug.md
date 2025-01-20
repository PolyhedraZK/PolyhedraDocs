---
sidebar_position: 7
---

# Debugging

Currently, ExpanderCompilerCollection also supports debugging circuits. To use this feature, you need to make a few adjustments to your circuit definition:

At the beginning, in addition to `frontend`, you also need to include the contents of the `frontend::extra` module:
```rust
use expander_compiler::frontend::*;
use extra::*;
```

If you are using Sub-Circuit functions, you need to ensure their parameters are `RootAPI`, rather than the old `API`.
```rust
fn sub_circuit_fn<C: Config, B: RootAPI<C>>(api: &mut B, x: &Vec<Variable>) -> Vec<Variable>
```

Similarly, you need to ensure the circuit itself is defined using `GenericDefine`:
```rust
impl GenericDefine<GF2Config> for YourCircuit<Variable> {
    fn define<Builder: RootAPI<GF2Config>>(&self, api: &mut Builder) {
        // definition of your circuit
    }
}
```

Finally, for compilation (similarly, `compile_generic`):
```rust
let compile_result = compile_generic(&YourCircuit::default()).unwrap();
```

When you need to debug, modify your main function to include the following code:
```rust
let mut assignment = YourCircuit::<GF2>::default();
// assign values in the assignment
debug_eval(&YourCircuit::default(), &assignment, EmptyHintCaller::new());
```

We also have an API that is only available in debug mode:
```rust
fn display(&self, _label: &str, _x: impl ToVariableOrValue<C::CircuitField>) {}
```

Within `debug_eval`, you can use this API to display the value of a variable and print it for debugging purposes. These calls will be ignored during normal compilation.

For a complete example, please refer to [keccak_gf2.rs](https://github.com/PolyhedraZK/ExpanderCompilerCollection/blob/master/expander_compiler/tests/keccak_gf2.rs).
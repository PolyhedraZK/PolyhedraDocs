---
sidebar_position: 6
---

# Std
We're supporting some standard circuits in our std library, all of which will implement the following trait:

```rust
pub trait StdCircuit<C: Config>: Clone + Define<C> + DumpLoadTwoVariables<Variable> {
    type Params: Clone + Debug;
    type Assignment: Clone + DumpLoadTwoVariables<C::CircuitField>;

    fn new_circuit(params: &Self::Params) -> Self;

    fn new_assignment(params: &Self::Params, rng: impl RngCore) -> Self::Assignment;
}
```

- ```Params``` refers to the parameters used to define a circuit. For example, to build a Merkle Tree circuit, we need to know what's the depth of the tree, and which hash function to use.
- ```Assignment``` refers to the assignment of the private and public input, represented as field elements. In the Merkle Tree example, if we're checking the membership of a leaf, the assignment will consist of the root hash, the leaf hash, and the Merkle path.
- ```new_circuit``` will return a circuit according to ```params```. Note that there are no concrete values in the returned circuit, all variables are placeholders, faciliting the compilation of the circuit structure.
- ```new_assignment```, as the name suggests, returns a group of **correct** assignment. 

## Example usage
We create a ```circuit_test_helper``` in our std library, which can be referred to as an example.

```rust
use circuit_std_rs::StdCircuit;
use expander_compiler::frontend::*;
use extra::Serde;
use rand::thread_rng;

pub fn circuit_test_helper<Cfg, Cir>(params: &Cir::Params)
where
    Cfg: Config,
    Cir: StdCircuit<Cfg>,
{
    let mut rng = thread_rng();
    let compile_result: CompileResult<Cfg> = compile(&Cir::new_circuit(&params)).unwrap();
    let assignment = Cir::new_assignment(&params, &mut rng);
    let witness = compile_result
        .witness_solver
        .solve_witness(&assignment)
        .unwrap();
    let output = compile_result.layered_circuit.run(&witness);
    assert_eq!(output, vec![true]);
}
```

```Cfg``` here can be one of ```BN254Config, M31Config, GF2Config```, and all circuits in the std library can be used as ```Cir```.

## Supported Circuits
[LogUp](../std/logup.md). A circuit attesting to the correctness of table look up.

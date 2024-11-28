---
sidebar_position: 2
---

# Demo Programming Guide

This document describes the current interface of the zkCuda demo. The related code can be found in [zkcuda](https://github.com/PolyhedraZK/ExpanderCompilerCollection/tree/zkcuda). A complete example is available in [zkcuda_1.rs](https://github.com/PolyhedraZK/ExpanderCompilerCollection/blob/zkcuda/expander_compiler/tests/zkcuda_1.rs).

## Kernel Function Definition

An example of a kernel function is as follows:

```rust
fn add_2<C: Config>(api: &mut API<C>, inputs: &mut Vec<Vec<Variable>>) {
    let a = inputs[0][0];
    let b = inputs[0][1];
    let sum = api.add(a, b);
    inputs[1][0] = sum;
}
```

This function is similar to the ones used in `memorized_simple_call` in the standard compiler, but the input array is a two-dimensional array. The array `inputs` serves not only as input but also as output.

It is roughly equivalent to the following Cuda function:

```c
__global__ void add_2_kernel(int* input, int* output, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        int input_idx = idx * 2;
        output[idx] = input[input_idx] + input[input_idx + 1];
    }
}
```

### Compilation

Before using the kernel, it needs to be compiled. The example kernel above can be compiled as follows:

```rust
let kernel_add_2: Kernel<M31Config> = compile_with_spec(
    add_2,
    &[
        IOVecSpec {
            len: 2,
            is_input: true,
            is_output: false,
        },
        IOVecSpec {
            len: 1,
            is_input: false,
            is_output: true,
        },
    ],
)
.unwrap();
```

Here, some `IOVecSpec` are introduced. They indicate the length required for each input array in a zk thread, as well as whether they are inputs or outputs.

For instance, the first parameter has a length of 2, is an input, and is not an output. When calling this kernel, the user needs to provide an array of length 2 for this parameter. After the kernel runs, the user will not get any output from this parameter.

Note that this syntax is somewhat verbose, but it is only in the current demo version. We plan to use a more concise definition method in the future.

## Context

The context automatically maintains the existing proof and commits the input variables. It provides the following functions:

```rust
impl<C: Config, P: ProvingSystem<C>> Default for Context<C, P> {
    fn default() -> Self {
        // Implementation
    }
}

impl<C: Config, P: ProvingSystem<C>> Context<C, P> {
    pub fn copy_to_device(&mut self, host_memory: &[C::CircuitField]) -> DeviceMemoryHandle {
        // Implementation
    }

    pub fn copy_to_host(&self, device_memory_handle: DeviceMemoryHandle) -> Vec<C::CircuitField> {
        // Implementation
    }

    pub fn call_kernel(
        &mut self,
        kernel: &Kernel<C>,
        ios: &mut [Option<DeviceMemoryHandle>],
        parallel_count: usize,
        is_broadcast: &[bool],
    ) {
        // Implementation
    }

    pub fn to_proof(self) -> CombinedProof<C, P> {
        // Implementation
    }
}
```

The `call_kernel` function here is relatively long. In addition to the kernel itself, it requires a few other parameters. `parallel_count` specifies how many zk threads will run in parallel. `is_broadcast` determines how each parameter will be distributed. If a parameter's `is_broadcast` is `true`, each zk thread will receive the same input; otherwise, the input provided by the user will be divided into `parallel_count` parts, with each zk thread receiving one part.

For example, suppose a kernel requires input lengths of `2, 4, 4`, and `parallel_count = 8`, `is_broadcast = [false, true, false]`. In this case, the user needs to provide three inputs with lengths of `16, 4, 32`, respectively.

## Kernel API (ExpanderCompilerCollection)

The compiler APIs that can be used inside a kernel are the same as those used in regular circuits. You can learn more from [Rust APIs](../rust/apis).

## Complete Example

Here's an example of how to use this CUDA-like circuit frontend:

See [zkcuda_1.rs](https://github.com/PolyhedraZK/ExpanderCompilerCollection/blob/zkcuda/expander_compiler/tests/zkcuda_1.rs).
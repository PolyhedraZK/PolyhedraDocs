---
sidebar_position: 1
---

# GKR protocol in Expander

The GKR protocol is a well-known protocol to prove the satisfiability of layered arithmetic circuits. It reduces a claim about the output layer-by-layer, all the way to a claim about the input. It can be combined with a multi-linear polynomial commitment scheme to the circuit input, producing an argument system with linear proving time, linear verification time and sub-linear proof size. 

The GKR protocol has the advantages of no trusted setup and fast proving time. However, it also has the drawback of relatively large proof size and slow verification time. We make several optimizations in Expander including SIMD execution, batch verification, field pyramid optimization, memory efficiency, and etc.. We'll elaborate on some of them in the following.

## SIMD proving
Our SIMD variation is adapted from the [Libra](https://eprint.iacr.org/2019/317.pdf) paper. There, the sumcheck equation looks like the following

$$
V_{i+1}(r_z) = \sum_{x} (\mathsf{Add}(r_z, x) V_i(x) + \sum_y \mathsf{Mul}(r_z, x, y) V_i(x) V_i(y))
$$

where $\mathsf{Mul}, \mathsf{Add}$ are Multi-Linear 
Extensions(MLE) of the circuit description, and $V$ is the MLE of the gate values for each layer.

We now want to prove at once the satisfiability of multiple copies of the same circuit with different public input. To get a sense why this is helpful, think of the circuit evaluation problem. If we're evaluating the circuit on 8 different groups of inputs where the numbers are 32-bit integers, it would be beneficial to pack them into 256-bit integers and evaluate the circuit with SIMD instructions from modern processors. It turns out that this benefits not only the evaluation, but also the proving system, increasing average proving effiency, proof size, and verification time. We now elaborate.

### Sumcheck Equation for SIMD Proving
We introduce a group of SIMD variables, leading to the following new equation:

$$
V_{i+1}(r_z, r_{simd}) = \sum_{x, s} eq(r_{simd}, s)((\mathsf{Add}(r_z, x) V_i(x, s) + \\
\sum_y \mathsf{Mul}(r_z, x, y) V_i(x, s) V_i(y, s)))
$$

Where $eq$ is the MLE of the binary *equal* function, $\mathsf{Add}$ and $\mathsf{Mul}$ does not change since they are the same for each copy of the circuit. $V$ now takes an additional variable indexing which copy of the circuit it is in. For example, if we're proving 8 copies of the circuit, the variable $r_{simd}, s$ has a size of $\log_2(8) = 3$.

We can proceed with the technique described in the [Libra](https://eprint.iacr.org/2019/317.pdf) paper, but with the following change:

1. Fix the sumcheck variables in the order of $x \rightarrow s \rightarrow y$. 
    1. **Reduce $s$ after $x$** to make make best use of SIMD execution.
    2. **Reduce $s$ before $y$** to let the prover conclude the new claim $V_i(x, s)$ first before touching $y$.
2. Variable $s$ has a degree of 3 instead of 2 as $x$ and $y$ does.

### Verify a batched proof
To verify the sumcheck equation will have to evaluate $\mathsf{Add}$ and $\mathsf{Mul}$ by itself, leading to linear-size computation. However, recall that in a batched proof, $\mathsf{Add}$ and $\mathsf{Mul}$ is invariant across different copies of the circuit. The new verifier cost would be linear to the sum of $
\mathsf{batch\_size}$ and $\mathsf{circuit\_size}$ instead of their multiplication. 

### Memory Efficiency
We noticed that the allocation and deallocation of memory account for a considerable amount of time of execution. We pre-allocate the required space for those frequently used ones in the $\mathsf{scratch\_pad}$ before proving and verification.

### Field Pyramid
In a proving system, there is usually a base field to store the gate values of a circuit, and an extension field for security purposes such as random challenge. In our use case, due to the introduction of SIMD execution, we further introduce two fields, i.e. SIMD base field and SIMD challenge field, constituting a pyramid of fields.
Without comprimising the security, we tried to make the computation happen in the base field as much as possible and optimized the interaction between different fields in the pyramid. For example, for the GF2 pyramid, we have GF2, GF2ext128, GF2x8, GF2ext128x8, where 'x8' means a parallel factor of 8.

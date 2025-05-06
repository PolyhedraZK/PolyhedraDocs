---
sidebar_position: 2
---

# GKR Input Layer Chunks

## Background
In a typical GKR protocol, the prover commits the input, which is interpreted as a multi-linear polynomial, first, proceeds with several rounds of sumchecks, and finally open the polynomial at a random challenge. While this protocol is simple and well-known, it does not consider the case that many circuits may share partially or all of their inputs, leading to two major inefficiencies.

1. The same input is committed multiple times, adding the cost of committing a polynomial.
2. It is hard for the prover to justify that different circuits are using the private input, introducing extra cost.

We adopt a slightly different workflow in our protocol where the same input will only be committed once, which serves as the digest of that input across all circuits. 

## Example
We consider a simple case first where there are three circuits $A, B, C$. The input of $A$ has a length of $2N$, while the the input of $B$ and $C$ has a length of $N$. For simplicity, we assume $N$ is a power of 2, and $n = \log_2(N)$. The prover would like to prove the following claim:

*There exists some input $I_1, I_2$ of length $N, s.t. A(I_1, I_2) = 0, B(I_1) = 0$, and $C(I_2) = 0$*. To avoid extensive polynomial commitments and to ensure the consistency of inputs across different circuits, the prover would proceed as follows:

1. compute $\mathsf{com_{I_1}} = commit(I_1), \mathsf{com_{I_2}} = commit(I_2)$.
2. Use $\mathsf{com_{I_1}}, \mathsf{com_{I_2}}$ to initiate the transcript.
3. Produce the gkr proof (excluding the final opening) of circuits $A, B, C$.
4. At the end, the prover is required to open the input of $A, B, C$ at some random challenge $r_A, r_B, r_C$ respectively, where $|r_A| = n + 1, |r_B| = n, |r_C| = n$. To do so, the prover actually opens $I_1$ at two challenge points ${r_A}_{[:n]}$, and $r_B$. Similarly, it opens $I_2$ at ${r_A}_{[:n]}$, and $r_C$.

The verifier follows a similar workflow except that in the 4-th step, it constructs the opening of circuit A's input by itself, with the help of the opening of $I_1$ and $I_2$ at ${r_A}_{[:n]}$. The construction is simple as follows thanks to multi-linearity of the input.

$$
Open((I_1, I_2), r_A) = (1 - {r_A}_{[n]}) \cdot Open(I_1, {r_A}_{[:n]}) + {r_A}_{[n]}\cdot Open(I_2, {r_A}_{[:n]})
$$

## A more general definition
The input of a circuit can be chunked into arbitrary continuous pieces $P_1, P_2, ... P_m$, but with the following limitations:

1. The size $T_k=|P_k|, \forall k\in[m]$ must be a power of 2.
2. If a piece has a size of $T_k$, then its starting position must be a multiple of $T$.
3. $\cup_{k\in[m]} P_k = I$, where $I$ is the whole input.
4. $P_{k_1} \cap P_{k_2} = \emptyset, \forall k_1 \in [m], k_2 \in [m], k_1 \neq k_2$.

The prover would take the description of this chunking, along with the commitment of each chunk (and potentially some extra information facilitating the opening), and proceed with the similar steps as described in the previous example.

## Use the output of other circuits 
In the proving of a groups of circuits, it may also happen that the output of a circuit, either public or private, is used as the input of many following circuits. 

We can adopt a similar approach as described above by committing the output first and then use that as the signature of all following usages.

---
sidebar_position: 2
---

# GKR with Cross-Layer Relays

Inspired by the [Virgo++](https://eprint.iacr.org/2019/1482.pdf) paper, we generialize our Expander proving system to layered circuits with cross-layer relays. Compared to the traditional layered circuits, we allow gate values to flow directly from a front layer to a back layer, bybassing intermediate layers, and thus reducing the number of gates in a circuit. 

Note that this is a simplified version of [Virgo++](https://eprint.iacr.org/2019/1482.pdf), where arbitrary circuits are allowed. We make this simplification to achieve a better balance between the circuit size and the proving complexity.

## Sumcheck Equation
A traditional sumcheck equation for a circuit layer looks like
 the following:

$$
V_{i+1}(r_z) = \sum_{x,y} (\mathsf{Add}(r_z, x) V_i(x) + \mathsf{Mul}(r_z, x, y) V_i(x) V_i(y))
$$

where $\mathsf{Mul}, \mathsf{Add}, V$ are all multi-linear 
extensions of the underlying values. We introduce a scattering
 phase and a gathering phase to incorporate the additional 
 cross-layer relays.

### Scatter Phase
Note that now the input of a layer not only comes from the 
previous adjacent layer, but potentially all the previous 
layers. To make such a reduction, we modify the sumcheck 
equaion as follows:


$$
V_{i+1}(r_z) = \sum_{x,y} (\mathsf{Add}(r_z, x) V_i(x) + \mathsf{Mul}(r_z, x, y) V_i(x) V_i(y) \\
 + \sum_{l=0}^{i-1} \mathsf{Scat}_{(i+1, l)}(r_z, x)V_{(i+1, l)}(x) ）
$$

Here $\mathsf{Scat}_{(i+1, l)}$ describes the cross-layer 
connection between layer $i+1$ and layer $l$. 
$\mathsf{Scat}_{(i+1, l)}(a, b) = 1$ if and only if the 
$a$-th gate of layer $i+1$ is connected to the $b$-th gate of 
layer $l$. More precisely, the $b$-th gate of all the gates 
in layer $l$ that directly connects to layer $i+1$.

We have $a\in \{0, 1\}^{s_{i+1}}, b\in \{0, 1\}^{s_{(i+1, l)}}$, where $s_{i+1}$ is the logarithmic value of the size of layer $i+1$, and $s_{(i+1, l)}$ is the logarithmic value of the number of gates in layer $l$ that directly connects to layer $i+1$.

At the end of sumcheck, the prover sends some claims of 
$V_{(i+1, l)}, l\in[0, i-1]$ and $V_i$ to the verifier as 
requested.

### Gather Phase
In a following layer $j$, instead of having only one claim 
about $V_{j}$, the verifier may have multiple claims from the
 previous layer due to cross-layer relays, i.e. 
 $V_{(l, j)}, l\in [j+2, d]$, where $d$ is the total number 
 of layers. To proceed with the equation from the previous 
 section, the prover and the verifier need to perform a 
 gathering sumcheck to reduce all these claims to one. 

$$
    V_j(r_z) + \sum_{l=j+2}^d \alpha_l V_{(l, j)}(r_{z_l}) = \sum_{x} V_j(x)(1 + \sum_{l=j+2}^d \alpha_l \mathsf{Gath}_{l, j} (r_{z_l}, x))
$$

where $\mathsf{Gath}_{(l, j)}(p, q) = 1$ if and only if the 
$p$-th gate of the gates in layer $j$ that connects to layer 
$l$ is exactly the $q$-th gate of all gates in layer $j$. 
In the end of the sumcheck protocol, the prover and the 
verifier will have a single claim of $V_j$, and can proceed 
with the scattering phase.

## Complexity Analysis

The proving time is linear to the circuit size for the 
original GKR protocol. In our modified protocol, the proving 
time is still linear. To see this, we need to analyze the two 
phases we use.

* **Scattering**. In the scattering phase, the prover 
will additionally prepare the values of 
$\mathsf{Scat}_{(i+1, l)}$ and $V_{(i+1, l)}$ on all binary $x$, 
whose size is exactly the number of gates in layer $l$ that 
connects to layer $i+1$. As a result, the sizes of all the 
$\mathsf{Scat}$ sums up to the total number of cross-layer 
relays in the circuit.

* **Gathering**. Similary, in all the gathering phase, the 
prover needs to prepare the values of 
$(1 + \sum_{l=j+2}^d \alpha_l \mathsf{Gath}_{l, j} (r_{z_l}, x))$,
on all binary $x$, which is solely contributed by the relay 
gates.

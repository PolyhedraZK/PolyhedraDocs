---
sidebar_position: 2
---

# GKR with Cross-Layer Relays

Inspired by the [Virgo++](https://eprint.iacr.org/2019/1482.pdf) paper, we generialize our Expander proving system to layered circuits with cross-layer relays. Compared to the traditional layered circuits, we allow gate values to flow directly from a front layer to a back layer, bybassing intermediate layers, and thus reducing the number of gates in a circuit. 

Note that this is a simplified version of [Virgo++](https://eprint.iacr.org/2019/1482.pdf), where arbitrary circuits are allowed. We make this simplification to achieve a better balance between the circuit size and the proving complexity.

## Sumcheck Equation
A traditional sumcheck equation for a circuit layer looks like the following:

$$
V_{i+1}(r_z) = \sum_{x,y} (Add(r_z, x) V_i(x) + Mul(r_z, x, y) V_i(x) V_i(y))
$$

where $Mul, Add, V$ are all multi-linear extensions of the underlying values. 

### Scatter Phase
Now we extend the above sumcheck equation with cross-layer terms, i.e.

$$
V_{i+1}(r_z) = \sum_{x,y} (Add(r_z, x) V_i(x) + Mul(r_z, x, y) V_i(x) V_i(y) \\
 + \sum_{l=0}^{i-1} Scat_{(i+1, l)}(r_z, x)V_{(i+1, l)}(x) ）
$$

Here $Scat_{i+1, l}$ describes the cross-layer Scatection between layer $i+1$ and layer $l$.

$
Scat_{(i+1, l)}(a, b) = 1
$ if and only if the $a$-th gate in layer $i+1$ is Scatected to the $b$-th gate in layer $l$, where $a\in \{0, 1\}^{s_{i+1}}, b\in \{0, 1\}^{s_{(i+1, l)}}$. Here $s_{i+1}$ is the logarithmic value of the size of layer $i+1$, and $s_{(i+1, l)}$ is the logarithmic value of the number of gates in layer $l$ that directly Scatects to layer $i+1$.

At the end of sumcheck, the prover sends some claims of $V_{(i+1, l)}, l\in[0, i-1]$ and $V_i$ to the verifier as requested.

### Gather Phase
In layer $j$, instead of having only one claim about the $V_{j}$, the verifier may have multiple claims from the previous layer, i.e. $V_{(l, j)}, l\in [j+2, d]$, where $d$ is the number of layers. To proceed with the equation from the previous section, the prover and the verifier perform a gathering sumcheck to reduce all these claims to one. 

$$
    \sum_{l=j+2}^d \alpha_l V_{(l, j)}(r_{z_l}) = \sum_{x} \sum_{l=j+2}^d \alpha_l Gath_{l, j} (r_{z_l}, x) V_j(x)
$$

$Gath_{(l, j)}(p, q) = 1$ if and only if the $p$-th gate of all gates in layer $j$ that connects to layer $l$ is exactly the $q$-th gate in layer $j$. In the end of the sumcheck, the prover and the verifier will have a single claim of $V_j$.
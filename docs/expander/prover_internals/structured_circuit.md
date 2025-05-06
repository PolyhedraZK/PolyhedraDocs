---
sidebar_position: 3
---

# Background
In the GKR protocol, we usually don't commit to the structure of the circuit. As a result, the verifier will have to evaluate the multi-linear extension of the circuit structure by itself, and incurs a linear verification time. For example, given a layer consisting of only multiplication gates, the verifier will have to evaluate $\tilde{Mul}$ at some random point $rz, rx, ry$. $\tilde{Mul}$ is defined over the boolean hypercube where $\tilde{Mul}(z, x, y) = 1$ if and only if gate $z$ is the output of a multiplication gate and it is connected to gate $x$ and gate $y$. Therefore, to evaluate $\tilde{Mul}$, the verification will enumerate all the muliplication gates $(z, x, y)\in Mul$, and then compute

$$
\tilde{Mul}(rz, rx, ry) = \sum_{(z, x, y)\in Mul} \tilde{eq}(rz, z) \tilde{eq}(rx, x) \tilde{eq}(ry, y)
$$

where $\tilde{eq}$ is the multilinear extension of the $eq$ function, which evaluates to 1 on the boolean hypercube if and only if the two operands are the same. To compute this, the verifier usually evaluate $rz, rx, ry$ at the boolean hypercube, and then later aggregate the result. This amounts to a total computation linear to the input layer, output layer, and the number of gates. 

Interestingly, there are more we can do if the circuit has a nicer structure. Let's say the output layer has a size of $L$, and the input layer has a size of $2L$, where gate $i$ from the output is connected to gate $2i$ and $2i+1$ from the input layer. In this case, the verifier can evaluate $\tilde{Mul}$ with much less effort:

$$
\tilde{Mul}(rz, rx, ry) = \tilde{eq}(rz, rx_{[1:]}, ry_{[1:]})\cdot \tilde{eq}(rx_{[0]}, 0)\cdot \tilde{eq}(ry_{[0]}, 1) 
$$
We always assume little-endian. The total computation is logarithmic to the ouput size for computing the first $\tilde{eq}$.

This simple example illustrates why structured circuit is beneficial to the verification.

# Verify Matrix Multiplication
For simplicity, we assume there are three matrices $A, B, C \in \mathbb{F}^{n\times n}$. To verify $A\times B = C$, we usually sample a vector $r$, and compute $(rA)B = rC$.  The verification cost would be $O(n^2)$, plausibly removing an $O(n)$ factor from directly computing the result. For $A', B', C'$ where $A'\times B' \neq C'$, based on the random sampling of $r$, the probability of $(rA')B' = rC'$ is less than $\frac{1}{|\mathbb{F}|}$. In case this does not suffice, we can sample multiple $r$, and only pass the verfication if all of them match. 

Assuming we can do random sampling in circuit (be careful about base field v.s. extension field though), the problem will be reduced to vector-matrix multiplication, which can be in turn reduced to multiple inner products of vectors, and we'll start here:

### GKR Verifier for Inner Product
We assume there are $2n$ inputs, standing for the two vectors of length $n$, and there is a single output, which is the result of inner product. In this case, the verifier can compute 

$$
\tilde{Mul}(rx, ry) = \tilde{eq}(rx_{[:-1]}, ry_{[:-1]})\cdot \tilde{eq}(rx_{[-1]}, 0)\cdot \tilde{eq}(ry_{[-1]}, 1)
$$

with $O(\log(n))$ efforts. There is no $rz$ here since there is only a single output.

### GKR Verifier for Vector-Matrix Multiplication
We assume there are $n * (2n)$ input, and $n$ output, standing for $n$ inner product. Note that this representation will have some redundancy of the random vector $r$.

$$
\tilde{Mul}(rz, rx, ry) = \tilde{eq}(rz, rx_{[\log(n):]}, ry_{[\log(n):]})\cdot \tilde{eq}(rx_{[:\log(n)-1]}, ry_{[:\log(n)-1]})\cdot \tilde{eq}(rx_{[\log(n)-1]}, 0)\cdot \tilde{eq}(ry_{[\log(n)-1]}, 1)
$$

The verification time is $O(\log(n))$.

### Problem
There is pretty much (~2x) redundancy which will lower the performance of the prover.
---
sidebar_position: 1
---

# Develop, Optimize, and Deploy your Expander-Accelerated zkApp

## Introduction

Polyhedra's zkCUDA provides a robust development environment for creating high-performance GKR native circuits. With zkCUDA, you can harness the power of the Expander GKR prover and hardware parallelism to accelerate proof generation without sacrificing the expressiveness of GKR circuits. The language will be familiar to CUDA users, featuring similar syntax and semantics, and is implemented in Rust.

zkCUDA enables you to:

1. Easily develop high-performance GKR native circuits.
2. Efficiently leverage the power of distributed hardware and highly parallel systems like GPUs or MPI-enabled clusters.

## Benefits of Expander-Accelerated GKR Circuits

The Expander protocol offers significantly higher throughput and lower memory usage (both in capacity and bandwidth) compared to existing provers. This performance advantage stems from fundamental algorithmic differences between Expander and other protocols. The Expander algorithm itself eliminates a $O(\log{N})$ factor present in other protocols, while the circuit size in zkCUDA is more compact.

zkCUDA is specifically designed for highly parallelizable computation, representing another approach to describing log-space uniformity of circuits. Rather than processing unstructured computation, the zkCUDA compiler restructures your computation to be more prover-friendly. Combined with an algorithm that's $O(\log{N})$ faster, the result is a much faster and more efficient proof system.

<div align="center">
  <img src="https://raw.githubusercontent.com/PolyhedraZK/ExpanderDocs/refs/heads/main/docs/cuda/fig1.1.svg" alt="Figure 1.1" height="300" />
  <p>Figure 1.1: Expander Execution Diagram</p>
</div>

## zkCUDA: A General-Purpose GPU-like Computing Framework for GKR Circuits

The pursuit of log-space uniformity in GKR circuits is an ongoing challenge that requires a succinct circuit description. While data-parallel circuits are a common approach to achieve this goal, they often lack the flexibility needed for complex applications and struggle to express intricate computations effectively.

zkCUDA introduces a novel approach by combining different data-parallel circuits to create more complex and expressive circuits. At its core, zkCUDA relies on two main abstractions:

1. zkSM (zk Streaming Multiprocessor): A data-parallel circuit that runs multiple times on the same physical computing unit (similar to a CPU core).
2. Device Memory: Arrays committed using an Expander-compatible polynomial commitment scheme.

By utilizing device memory across different zkSMs, we can achieve more sophisticated and expressive circuits.

## Document Structure

1. Introduction: A general overview of the zkCUDA framework.
2. Programming Guide: Instructions to help you write your own circuits in zkCUDA.
3. Performance Guide: Tips to optimize your circuits for peak performance.
4. API Reference: Comprehensive documentation of the zkCUDA framework's API.

## Programming Model

The zkCUDA programming model closely resembles CUDA due to the nature of GKR circuits. Key concepts include:

1. zk Streaming Multiprocessors (zkSMs): Each zkSM is a parallel instance of the same circuit, capable of running up to 16 zk threads concurrently. Multiple zkSMs can be executed in parallel.
2. zk Threads: The smallest unit of execution, a zk thread runs within a zkSM, with its execution independent of other threads in the same zkSM.
3. Device Memory: Memory directly accessible by zkSMs.
4. Host Memory: Memory directly accessible by your CPU.
5. Kernel: A function describing the circuit computation.

## Mapping Basic Concepts from CUDA to Cryptographic Primitives

1. Memory Copy:

  a.  Host to Device: This operation copies data from host memory to device memory using polynomial commitment. Each memory copy generates a commitment to the data array.

  b.  Device to Host: This operation copies data from device memory to host memory by opening the polynomial commitment (single or batched) and outputting the polynomial evaluation to the host.

2. zkSM: A concept describing log-space uniformity of the circuit. Data parallelism is achieved by running multiple instances of the same circuit concurrently.

3. Kernel Function: Implemented as a circuit described by a variant of the gnark frontend in Rust.

4. Lookup Tables: A powerful optimization tool functioning like global random access memory in CUDA. While slower, it enables random access to any memory address. We provide a built-in dict type for flexible use. Users must populate the dict with data on the host, then perform a host-to-device memory copy to transfer the data to the device.
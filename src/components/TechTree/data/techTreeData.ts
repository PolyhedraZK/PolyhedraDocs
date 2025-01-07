  import { TechData } from '../types'

export const techTreeData: Record<string, TechData[]> = {
  "Ancient Era": [
    {
      id: "expander",
      name: "Expander",
      description: "Core ZK System",
      developmentCost: "High",
      unlocks: [
        "Basic Proof Generation",
        "Verification"
      ],
      prerequisites: [],
      level: 0,
      position: 0,
      era: "Ancient Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "circuit-compiler",
      name: "Circuit Compiler",
      description: "Development Tools",
      developmentCost: "High",
      unlocks: ["Basic Circuit Creation"],
      prerequisites: [],
      level: 0,
      position: 1,
      era: "Ancient Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "expchain-testnet",
      name: "EXPchain Testnet",
      description: "Consensus Protocol",
      developmentCost: "High",
      unlocks: [
        "Node Operations",
        "Consensus"
      ],
      prerequisites: [],
      level: 0,
      position: 2,
      era: "Ancient Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "zkbridge",
      name: "zkBridge",
      description: "Cross chain bridge",
      developmentCost: "High",
      unlocks: [
        "Bridge",
        "Consensus proof"
      ],
      prerequisites: [],
      level: 0,
      position: 3,
      era: "Ancient Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    }
  ],
  "2025 Q1, Expansion Era": [
    {
      id: "virgo++",
      name: "Virgo++",
      description: "Prover Enhancement",
      developmentCost: "Medium",
      unlocks: ["Faster Prover 1"],
      prerequisites: ["expander", "circuit-compiler"],
      level: 2,
      position: 0,
      era: "2025 Q1, Expansion Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "optimized-verifier",
      name: "Optimized Verifier",
      description: "Verifier Enhancement",
      developmentCost: "Small",
      unlocks: ["Smaller proof size"],
      prerequisites: ["expander", "circuit-compiler"],
      level: 2,
      position: 1,
      era: "2025 Q1, Expansion Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "zkcuda",
      name: "zkCuda",
      description: "Circuit Language",
      developmentCost: "High",
      unlocks: ["Log Space Uniform Circuits"],
      prerequisites: ["expander", "circuit-compiler"],
      level: 2,
      position: 2,
      era: "2025 Q1, Expansion Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "zkpytorch",
      name: "zkPyTorch",
      description: "zkML development framework",
      developmentCost: "High",
      unlocks: ["Basic zkML"],
      prerequisites: ["zkcuda", "optimized-verifier"],
      level: 2,
      position: 3,
      era: "2025 Q1, Expansion Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "poi",
      name: "Proof of Intelligence (POI)",
      description: "EXPchain with ML capability",
      developmentCost: "Medium",
      unlocks: ["On-Chain zkML"],
      prerequisites: ["zkpytorch", "expchain-testnet"],
      level: 2,
      position: 4,
      era: "2025 Q1, Expansion Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "on-chain-app",
      name: "On-Chain App",
      description: "To be announced",
      developmentCost: "High",
      unlocks: ["Interesting App"],
      prerequisites: ["expchain-testnet"],
      level: 2,
      position: 5,
      era: "2025 Q1, Expansion Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "expos",
      name: "ExPoS",
      description: "Omni-Chain Staking",
      developmentCost: "High",
      unlocks: ["Staking"],
      prerequisites: ["expchain-testnet", "zkbridge"],
      level: 2,
      position: 6,
      era: "2025 Q1, Expansion Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "scale-dev-ecosystem",
      name: "Scale Developer Ecosystem",
      description: "Have a friendly developer toolchain to expand ecosystem",
      developmentCost: "Medium",
      unlocks: ["Leading Ecosystem Projects"],
      prerequisites: ["poi", "expos", "on-chain-app"],
      level: 2,
      position: 7,
      era: "2025 Q1, Expansion Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    }
  ],
  "2025 Q2, Enhancement Era": [
    {
      id: "gpu-expander",
      name: "GPU Expander",
      description: "Expander with GPU support",
      developmentCost: "High",
      unlocks: ["Faster Prover 2"],
      prerequisites: ["virgo++", "zkcuda"],
      level: 4,
      position: 0,
      era: "2025 Q2, Enhancement Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "log-space-uniform-verifier",
      name: "Log Space Uniform Verifier",
      description: "Verifier Enhancement",
      developmentCost: "Medium",
      unlocks: ["Faster Verifier"],
      prerequisites: ["zkcuda"],
      level: 4,
      position: 1,
      era: "2025 Q2, Enhancement Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "data-market",
      name: "Data Market",
      description: "Trade data/model without trust any party",
      developmentCost: "High",
      unlocks: ["Trustless Data Trading"],
      prerequisites: ["poi"],
      level: 4,
      position: 2,
      era: "2025 Q2, Enhancement Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "zkml-showcase-app",
      name: "zkML Showcase App",
      description: "Killer App",
      developmentCost: "Medium",
      unlocks: ["zkML Real Use"],
      prerequisites: ["poi"],
      level: 4,
      position: 3,
      era: "2025 Q2, Enhancement Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "proof-of-consensus",
      name: "Proof of Consensus for Ethereum full consensus",
      description: "Prove the full consensus of Ethereum",
      developmentCost: "High",
      unlocks: ["Trustless Ethereum zkBridge", "zkLightClient for Ethereum"],
      prerequisites: ["expander", "zkcuda"],
      level: 4,
      position: 4,
      era: "2025 Q2, Enhancement Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    }
  ],
  "2025 Q3, Innovation Era": [
    {
      id: "multi-gpu-expander",
      name: "Multi-GPU Multi-Machine Expander",
      description: "Distributed Expander",
      developmentCost: "Medium",
      unlocks: ["Faster Prover 3"],
      prerequisites: ["gpu-expander"],
      level: 6,
      position: 0,
      era: "2025 Q3, Innovation Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "zk-friendly-quantization",
      name: "ZK-Friendly Quantization",
      description: "Quest for faster zkML",
      developmentCost: "High",
      unlocks: ["Faster zkML 1"],
      prerequisites: ["poi"],
      level: 6,
      position: 1,
      era: "2025 Q3, Innovation Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "scale-dev-ecosystem-2",
      name: "Scale Developer Ecosystem 2",
      description: "Aggressively Expand Ecosystem",
      developmentCost: "Medium",
      unlocks: ["More Ecosystem Projects"],
      prerequisites: ["scale-dev-ecosystem"],
      level: 6,
      position: 2,
      era: "2025 Q3, Innovation Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "single-slot-finality",
      name: "Single Slot Finality (SSF) for EXPchain",
      description: "Reach consensus in one slot",
      developmentCost: "High",
      unlocks: ["Faster Ethereum and EXPchain"],
      prerequisites: ["proof-of-consensus"],
      level: 6,
      position: 3,
      era: "2025 Q3, Innovation Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "zkbridge-ssf",
      name: "zkBridge SSF Support",
      description: "Integrate new consensus algorithm",
      developmentCost: "Medium",
      unlocks: ["Faster zkBridge"],
      prerequisites: ["single-slot-finality"],
      level: 6,
      position: 4,
      era: "2025 Q3, Innovation Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    }
  ],
  "2025 Q4-2026 Q1, Future Era": [
    {
      id: "larger-model-integration",
      name: "Larger model Integration",
      description: "zkML for larger model",
      developmentCost: "Medium",
      unlocks: ["Real world zkML for LLM"],
      prerequisites: ["zk-friendly-quantization"],
      level: 8,
      position: 0,
      era: "2025 Q4-2026 Q1, Future Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    },
    {
      id: "full-decentralization",
      name: "Full Decentralization of EXPchain",
      description: "More Validators for EXPchain",
      developmentCost: "High",
      unlocks: ["Scalable Blockchain"],
      prerequisites: ["single-slot-finality"],
      level: 8,
      position: 1,
      era: "2025 Q4-2026 Q1, Future Era",
      iconSrc: "https://raw.githubusercontent.com/PolyhedraZK/VisualAsset/refs/heads/main/EXPchain/EXPchain%20Symbol_Black%20on%20White.svg"
    }
  ]
}

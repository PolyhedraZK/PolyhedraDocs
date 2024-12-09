# Litepaper

## Scaling Trust in the Age of Artificial Intelligence

![Image1](https://global.discourse-cdn.com/flex031/uploads/jupyter/original/2X/9/9b21328f0f7ea64ba0876ce81c6a36248003571c.png)

> **Figure 1:** EXPchain establishes foundations for the future of decentralized, privacy-conscious, and accountable AI systems.

## Abstract

[EXPchain](https://expchain.ai/) is a decentralized blockchain protocol designed for scalable, verifiable, and privacy-preserving AI applications. Established as the “Everything Chain for AI”, EXPchain integrates zero-knowledge machine learning (zkML) and a novel Proof of Intelligence (PoI) framework, addressing the growing need for trust and accountability in artificial intelligence systems. Key innovations include the [Expander](https://expander.polyhedra.network/) proof system, a high-performance zk prover, and zkPyTorch, a developer-friendly toolkit for integrating zkML into traditional AI workflows. Together, these tools enhance computational efficiency, enabling practical AI verification while safeguarding sensitive data and intellectual property.

Built on a zk-native blockchain infrastructure, EXPchain supports seamless AI workflows through advanced features like zkBridge for cross-chain interoperability, EXProllup scalability, and zkML watermarking for large language models (LLMs). The platform prioritizes transparency, security, and scalability, fostering trust in critical industries such as finance, healthcare, and software development. Through its modular architecture and commitment to ethical AI, EXPchain sets the foundations for the future of decentralized, privacy-conscious, and accountable AI systems.

## 1. Introduction

### 1.1 The Importance of Trust in AI

Artificial intelligence will make increasingly critical decisions across industries, influencing everyday interactions such as unlocking phones with facial recognition, applying for loans, or receiving AI-powered medical diagnoses. While these advancements offer immense potential, they also present critical challenges. How can we ensure AI systems operate fairly, accurately, and securely? Can privacy controls effectively safeguard sensitive data without compromising transparency or accountability? These challenges require proof of established trust in AI systems, and protection of sensitive information on all sides.

Governments and institutions globally are working to regulate AI, visible in initiatives like the European Commission’s AI Act and NIST’s AI Risk Management Framework. Despite these efforts, traditional approaches often fall short as they require exposing proprietary models or sensitive data, resulting in trade-offs between security, privacy, and trust. Building from [foundational work](https://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)<sup>[1]</sup> on zero-knowledge proofs (ZKPs), zero-knowledge machine learning<sup>[2,35]</sup> (zkML) provides a breakthrough solution by enabling mathematical verification of AI systems while preserving data and model privacy.

Polyhedra Network proposes an interoperable solution optimized for zkML technology in EXPchain, applying years of advanced [research and implementation](https://www.polyhedra.network/research)<sup>[3, 13, 15-18, 21-24, 26, 27, 29-34]</sup> to enable the creation of applications that verify AI behavior and compliance without revealing proprietary information. This blockchain infrastructure ensures scalable, fast, and secure verification of AI behavior and compliance across diverse use cases.

### 1.2 AI-Blockchain Convergence

The global AI market is projected to contribute up to [$15.7 trillion](https://www.pwc.com/hu/en/pressroom/2017/ai.html)<sup>[4]</sup> to the global economy by 2030, while blockchain's potential value is estimated at [$3.1 trillion](https://medium.com/consensys-media/gartner-blockchain-will-deliver-3-1-trillion-dollars-in-value-by-2030-d32b79c4c560)<sup>[5]</sup> over the same period. The cost of AI failures due to errors, biases, or flawed implementations is equally staggering.

In 2022 it was estimated that the cost of poor software quality in the US had grown to at least [$2.41 trillion](https://www.it-cisq.org/the-cost-of-poor-quality-software-in-the-us-a-2022-report/)<sup>[6]</sup>, with AI failures further expanding the [categories of risk](https://www.raconteur.net/technology/cost-ai-failures)<sup>[7]</sup> with incorrect outputs, data breaches and cyber attacks. Beyond financial losses, these errors often result in [harm to individuals](https://medium.com/@experiential.ai/the-extreme-costs-of-faulty-ai-and-the-vital-role-humans-play-dba1fc0971ed)<sup>[8]</sup>, whether through wrongful imprisonment, misdiagnosed medical conditions, or biased decision-making. From data inputs to model outputs, ensuring every element of AI-driven transactions are verifiable and accountable is no longer optional, it's essential to navigate these risks while unlocking AI’s full potential.

The convergence of AI and blockchain marks a paradigm shift in decentralized technology. While ZKPs like [Groth16](https://eprint.iacr.org/2016/260.pdf)<sup>[9]</sup> and [Plonk](https://eprint.iacr.org/2019/953)<sup>[10]</sup> have advanced scalability, practical deployment for complex AI systems remains challenging. Innovations such as the Expander proof system and [zkPyTorch](https://blog.polyhedra.network/scaling-trust-in-the-age-of-artificial-intelligence/)<sup>[11]</sup> build on these foundations, significantly enhancing computational efficiency to enable real-time AI verification. These developments redefine the [current value chain](https://www.fastcompany.com/91194971/decoding-the-ai-stack-and-how-to-succeed-in-the-ai-value-chain)<sup>[12]</sup>, centered on training, inference, and verification, laying a foundation for secure, scalable AI workflows.

### 1.3 Our Vision

Polyhedra Network envisions a future where trust in AI and blockchain systems is inherent. We recognize this is not a small objective, however by lowering technical barriers for developers and leveraging powerful zk tools in EXPchain, we aim to establish a trusted ecosystem where developers can build privacy-preserving applications without needing specialized cryptographic expertise, making AI universally accessible, verifiable, and accountable.

![Image2](https://global.discourse-cdn.com/flex031/uploads/jupyter/original/2X/9/9b21328f0f7ea64ba0876ce81c6a36248003571c.png)

> **Figure 2:** We anticipate a future where all AI is verifiable and personalized inference occurs without compromising on data privacy.

## 2. Core Innovations

### 2.1 Expander: The World’s Fastest ZK Prover

Expander sets a new benchmark in performance for zkML, achieving [unprecedented efficiency and scalability](https://blog.polyhedra.network/scaling-trust-in-the-age-of-artificial-intelligence/):

- 2.2 seconds/image for VGG-16 (15.2M parameters) on a single-thread CPU
- 150 seconds/token for Llama-3 (8B parameters) on a single-thread CPU
- Amortized, we can prove 0.8 million parameters per second, 4 orders of magnitude faster than any number previously reported.

Polyhedra anticipates this to improve significantly over the next 12-24 months. We are actively building [hardware accelerations for our scheme](https://github.com/PolyhedraZK/blogs/blob/main/blogs/sumcheck_cuda.md)<sup>[14]</sup> and developing a [distributed prover infrastructure](https://eprint.iacr.org/2023/1271)<sup>[15, 16]</sup> where multiple nodes can collaboratively work on the same proofs. Through these innovations, we are moving steadily toward our goal of real-time proving, where proof generation matches inference speed, effectively eliminating latency in the user experience. These performance leaps enable the practical verification of AI models and computations with significantly reduced costs and latency to support a wide range of applications, from privacy-preserving inference to compliance-driven model audits.

### 2.2 ExPoS: Expanded Proof of Stake for unified consensus

Expanded Proof of Stake (ExPoS) forms the consensus backbone of ExpChain, leveraging [zkBridge technology](https://dl.acm.org/doi/pdf/10.1145/3548606.3560652)<sup>[16]</sup> to unify and connect staking mechanisms across all blockchains into a cohesive network.

By utilizing zero-knowledge proofs, ExPoS secures and transparently manages staking, allowing for omnichain staking and expanded use of liquid assets, anticipating a future where high throughput and seamless interoperability are crucial not just for AI applications but for all decentralized workflows. This consensus model provides users with boundless security, greater flexibility and seamless integration, regardless of underlying blockchain architecture.

### 2.3 zkPyTorch: Developer-Friendly Integration

zkPyTorch bridges the gap between traditional AI development workflows and zero-knowledge machine learning (zkML) by automating the conversion of PyTorch operations into zk circuits. This integration allows developers to use familiar tools while significantly reducing the time and complexity of deploying zk-enabled AI applications, providing:

- [Automated circuit generation](https://blog.polyhedra.network/scaling-trust-in-the-age-of-artificial-intelligence/)<sup>[11]</sup> and optimization for common AI tasks.
- Reducing development time from months to days.
- Compatibility with evolving machine learning models for future-proof deployments.
- Reduction in proof generation times by 99.99%.

## 3. Technology Stack

### 3.1 Zero-Knowledge Machine Learning (zkML)

zkML enables [cryptographic verification of AI models](https://blog.polyhedra.network/scaling-trust-in-the-age-of-artificial-intelligence/)<sup>[11]</sup> to achieve secure accuracy across the entire machine learning lifecycle:

- Verifiable inference: Prove AI outputs without exposing models or data.
- Model audits: Verify performance against test sets for fairness and compliance.
- Training verification: Ensure adherence to protocols without revealing sensitive inputs.

![Image3](https://global.discourse-cdn.com/flex031/uploads/jupyter/original/2X/9/9b21328f0f7ea64ba0876ce81c6a36248003571c.png)

> **Figure 3:** zkML plays a critical role in building trust in AI systems and the humans that interact with them.

This technology makes it possible to build systems that are both secure and ethically aligned, with transparent AI-driven decisions that reinforce trust between developers, users, and stakeholders. zkML enables applications such as watermarking for LLMs, model audits for compliance verification critical for financial institutions, and secure multiparty computations in privacy-sensitive industries.

### 3.2 zkNative Blockchain for AI

Our blockchain infrastructure is purpose-built for AI applications, offering:

- Single-slot finality for faster confirmations.
- Native zk support enabling scalability via EXP appchains and EXProllups
- Seamless integration of AI and blockchain workflows for real-world applications.

This technology allows developers to build systems that are both secure and ethically aligned, with transparent AI-driven decisions that reinforce trust between developers, users, and stakeholders. zkML can enable applications such as watermarking for LLMs, model audits for compliance verification critical for financial institutions, and secure multiparty computations in privacy-sensitive industries.

### 3.3 Proof of Intelligence (PoI)

Proof of Intelligence (PoI) creates an immutable chain of trust for AI models, verifying their origin, authenticity, and ethical compliance. This framework protects intellectual property and ensures transparent accountability, cryptographically linking each AI model’s provenance and performance to a verifiable on-chain record, offering unprecedented transparency in AI-driven ecosystems.

### 3.4 zkBridge

Polyhedra’s native [zkBridge](https://dl.acm.org/doi/pdf/10.1145/3548606.3560652)<sup>[16]</sup> support empowers developers to create secure, seamless cross-chain AI applications, ensuring that on-chain assets and data can be utilized across multiple blockchain ecosystems with minimal trust requirements. Leveraging ZKPs, zkBridge facilitates efficient, transparent, trust-minimized communication between chains, enhancing scalability and reducing vulnerabilities in decentralized workflows.

### 3.5 zkML Watermark for LLM Verification

EXPchain’s zkML Watermark allows verification of [Large Language Models](https://arxiv.org/pdf/2312.04828)<sup>[23]</sup> (LLMs) like Llama-3 8B, representing a milestone in AI transparency. Issuing a tamper-proof certificate that ensures any LLM processed through EXPchain is exactly as claimed, verified through zkML, ensures model authenticity while preserving intellectual property, reducing fraud and enabling responsible AI use. Utilizing this technology, organizations can validate LLMs on an open, secure platform.

### 3.6 Optimized Proof Systems

Expander is the product of six-years unstopping research and development, merging the speed and efficiency. This powerful combination aligns with Vitalik Buterin’s vision for the [ZK Endgame](https://vitalik.eth.limo/general/2021/12/06/endgame.html)<sup>[25]</sup>, where centralized block production is reinforced by decentralized validation. By significantly reducing proving time and computational costs, Expander makes zero-knowledge solutions more practical and affordable, unlocking their potential for cost-sensitive industries.

### 3.7 Single Slot Finality (SSF) for accelerating consensus finality

Single Slot Finality (SSF) addresses scalability limits in traditional consensus mechanisms by introducing advanced ZKPs for enhanced signature schemes. This innovative approach enables batch verification of signatures, reducing confirmation times and improving efficiency across the finality process. By leveraging ZKPs, SSF achieves faster and more secure transaction finality, supporting the high demands of applications.

Additionally, SSF significantly reduces opportunities for Maximal Extractable Value (MEV) by minimizing the window of time during which transactions can be reordered or manipulated. The shortened finality time creates a more predictable and secure environment for users, preventing malicious actors from exploiting timing gaps for front-running, sandwich attacks, or other forms of economic exploitation within decentralized systems.

### 3.8 zkLogin for Account Abstraction

zkLogin simplifies the process of creating and authenticating accounts using widely recognized OAuth credentials, such as Google or Apple, without exposing credentials on-chain. Combining familiar login methods with advanced privacy measures, zkLogin enhances the accessibility of dApps built on EXPchain while maintaining security.

Users log in with their existing credentials, generating a JSON Web Token (JWT), which is used to create an on-chain abstract account (AA). A ZKP is then generated to verify the user’s ownership of their credentials without exposing sensitive information on-chain. This approach safeguards user privacy, minimizes identity fraud, and helps businesses meet regulatory requirements while providing users with secure and simplified access.

Leveraging ZKPs for account management, zkLogin enables enhanced smart contract functionality, gas fee bundling, custom transaction workflows, and ongoing transaction authorization without requiring repeated logins. It’s designed for cross-chain interoperability and capable of handling high transaction volumes efficiently, improving user experience across diverse applications, including enterprise systems, finance, social platforms, and gaming.

## 4. Building the future of Intelligence

**_POC applications with immediate use-cases include:_**

### 4.1 Finance

Cryptographically secure systems have the potential to redefine trust in finance. Using zkML, we can enhance transparent verification for transactions, secure and private verification of credit scores during loan approvals, and algorithmic trading without revealing confidential data, promoting fairness and compliance simultaneously.

### 4.2 Healthcare

ZKPs have become instrumental in enhancing the security and privacy of AI-powered diagnostics within the healthcare sector. By employing techniques akin to those discussed by [Ganescu and Passerat-Palmbach](https://arxiv.org/abs/2402.06414)<sup>[28]</sup>, [Zero-Knowledge Machine Learning (zkML)](https://dl.acm.org/doi/pdf/10.1145/3372297.3417278)<sup>[29, 25]</sup> ensures that patient data remains confidential while enabling cryptographic verification of diagnostic models, fostering trust in sensitive medical applications.

### 4.3 Data and Compute Marketplaces

EXPchain fosters trustless collaboration by enabling secure sharing of computational resources and datasets. Developers and organizations can confidently participate in AI innovation, leveraging zkML to verify contributions and outcomes without exposing proprietary assets or sensitive information.

### 4.4 Supply Chain Transparency

In industries like food safety, pharmaceuticals, and luxury goods, trust in the supply chain is essential. Verifying every step in the supply chain, zero-knowledge proof reinforces authenticity and ethical sourcing without exposing sensitive logistics data.

### 4.5 AI-Driven Entertainment, Content and Memecoins

From gaming to memecoins and content creation, zkML ensures fairness, transparency, and authentication of digital assets in AI-driven experiences. Verifiable computations enable creators to authenticate digital assets and personalize user experiences without compromising privacy or ownership.

**_POC applications with mid-term use-cases include:_**

### 4.6 Smart Cities

For AI-driven decisions to work validly within urban infrastructure, they must be fair, ethical, and accountable. EXPchain’s infrastructure fosters transparency in public resource allocation, traffic optimization, and energy management, allowing smart cities to operate with trust and integrity.

### 4.7 Privacy-Preserving Personalization

AI-powered personalization, from recommendation systems to wearable devices, often involves sensitive user data. Applications built on EXPchain can deliver personalization while safeguarding user privacy, so smart home devices or fitness trackers can balance tailored experiences with robust privacy policies.

### 4.8 Fraud-Resistant Advertising

Digital advertising often suffers from fraud, including fake impressions and clicks. Building with zkML can ensure metrics reported by AI systems are accurate and trustworthy, protecting advertisers and driving more efficient campaigns.

### 4.9 AI Agents

Privacy-preserving AI agents allow users to interact securely with intelligent systems. Built on zkML, these agents ensure ethical decision-making and verifiable operations, creating opportunities in decentralized AI marketplaces.

**_POC applications with longer-term use-cases include:_**

### 4.10 Robotics

Verifiable inputs and outputs powered by zkML solve the black-box problem in robotics, ensuring that autonomous systems operate predictably and responsibly. EXPchain empowers developers to build robots capable of proving the fairness and safety of their actions.

### 4.11 Decentralized Science (DeSci)

EXPchain accelerates innovation in decentralized scientific research by providing tools for sharing verifiable datasets and models securely, underwriting contributions and fraud prevention. Implementing zkML can ensure the integrity of published findings and funding while fostering collaboration across diverse research communities.

### 4.12 Education and EdTech

As education pathways expand online, zkML can provide verifiable, unbiased assessments and secure certification systems. Decentralized education platforms can leverage zkML to protect student data and ensure the credibility of online learning and credentials.

### 4.13 Environmental Impact Monitoring

AI models are widely used for environmental predictions and impact monitoring, such as carbon footprint tracking or climate modeling. Integrating zkML can ensure these models remain transparent and accountable, building trust in sustainability initiatives and environmental audits.

## 5. Ecosystem Growth

### 5.1 Developer and User Onboarding

EXPchain ensures that developers without cryptographic expertise can build for the future of AI and blockchain. We’re creating infrastructure that acts as building blocks for other systems, with intuitive interfaces and streamlined workflows that empower developers to utilize ZK technology without barriers. The integration of zkPyTorch and our modular infrastructure simplifies adoption for developers, reducing technical barriers and fostering innovation.

### 5.2 ZKJ Token for Governance Involvement

Staking the native token, ZKJ, allows users to vote on network governance proposals and leverage their community involvement.

## 6. Looking Ahead: Scaling AI

Polyhedra Network is dedicated to pushing the boundaries of zkML and blockchain technology. EXPchain’s future roadmap includes:

- Distributed proof systems for real-time verification.
- zk-friendly quantization for efficient AI model deployment.
- Multi-GPU and multi-machine support to scale performance for large AI models.

These advancements position zkML at the forefront of verifiable AI, shaping a future where trust is integral to every interaction.

![Table1](https://global.discourse-cdn.com/flex031/uploads/jupyter/original/2X/9/9b21328f0f7ea64ba0876ce81c6a36248003571c.png)

> **Table 1:** Two-year roadmap for EXPchain

## 7. Conclusion

Through EXPchain, Polyhedra Network is laying the foundations for the future of verifiable AI. Integrating zero-knowledge proofs and advanced verification protocols, EXPchain is establishing the "Everything Chain for AI”, unlocking opportunities for developers and businesses worldwide. We are building a future where AI systems are not just smarter but more secure, transparent, and accessible for all.

## Footnote

Over the past six years, Polyhedra’s founding team has remained dedicated to pioneering research at the intersection of blockchain and artificial intelligence. The insights and advancements outlined in this paper are the result of our relentless pursuit to create an endgame solution that will redefine how blockchain and AI merge into mainstream consciousness.

Our work bridges cutting-edge innovation with real-world applications, making these transformative technologies more accessible to developers while unlocking unprecedented possibilities for trust, scalability, and seamless integration across industries. We introduce EXPchain with the genuine belief it provides a step toward reshaping the future of intelligence.

## References

[1] [The Knowledge Complexity of Interactive Proof Systems](https://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)

[2] [Zero Knowledge Proofs for Decision Tree Predictions and Accuracy](https://dl.acm.org/doi/pdf/10.1145/3372297.3417278)

[3] [Polyhedra Research - Zero knowledge, infinite innovation](https://www.polyhedra.network/research)

[4] [PwC's Global Artificial Intelligence Study - AI to drive GDP gains of $15.7 trillion with productivity, personalisation improvements](https://www.pwc.com/hu/en/pressroom/2017/ai.html)

[5] [Gartner: Blockchain Will Deliver $3.1 Trillion Dollars in Value by 2030](https://medium.com/consensys-media/gartner-blockchain-will-deliver-3-1-trillion-dollars-in-value-by-2030-d32b79c4c560)

[6] [The cost of poor software quality in the US: a 2022 report](https://www.it-cisq.org/the-cost-of-poor-quality-software-in-the-us-a-2022-report/)

[7] [Are firms ready for the cost of AI failures?](https://www.raconteur.net/technology/cost-ai-failures)

[8] [The Extreme Costs of Faulty AI and the Vital Role Humans Play](https://medium.com/@experiential.ai/the-extreme-costs-of-faulty-ai-and-the-vital-role-humans-play-dba1fc0971ed)

[9] [On the Size of Pairing-based Non-interactive Arguments](https://eprint.iacr.org/2016/260.pdf)

[10] [PLONK: Permutations over Lagrange-bases for Oecumenical Noninteractive arguments of Knowledge](https://eprint.iacr.org/2019/953)

[11] [Scaling Trust in the Age of Artificial Intelligence](https://blog.polyhedra.network/scaling-trust-in-the-age-of-artificial-intelligence/)

[12] [Decoding the AI stack and how to succeed in the AI value chain](https://www.fastcompany.com/91194971/decoding-the-ai-stack-and-how-to-succeed-in-the-ai-value-chain)

[13] [Ligero++: A New Optimized Sublinear IOP (CCS 2020)](https://dl.acm.org/doi/10.1145/3372297.3417893)

[14] [Accelerating Ethereum's Verge: Harnessing GPU Power for Zero-Knowledge Proofs](https://github.com/PolyhedraZK/blogs/blob/main/blogs/sumcheck_cuda.md)

[15] [Pianist: Scalable zkRollups via Fully Distributed Zero-Knowledge Proofs (S&P 2023)](https://eprint.iacr.org/2023/1271)

[16] [zkBridge: Trustless Cross-chain Bridges Made Practical (CCS 2023)](https://dl.acm.org/doi/pdf/10.1145/3548606.3560652)

[17] [Orion: Zero Knowledge Proof with Linear Prover Time (CRYPTO 2022)](https://eprint.iacr.org/2022/1010.pdf)

[18] [HyperPlonk: Plonk with Linear-Time Prover and High-Degree Custom Gates (Eurocrypt 2023)](https://eprint.iacr.org/2022/1355)

[19] [Poseidon2: A Faster Version of the Poseidon Hash Function](https://eprint.iacr.org/2023/323)

[20] [Hadamard Product Argument from Lagrange-Based Univariate Polynomials (ACISP 2024)](https://eprint.iacr.org/2024/613)

[21] [Doubly Efficient Interactive Proofs for General Arithmetic Circuits with Linear Prover Time (CCS 2021)](https://eprint.iacr.org/2020/1247)

[22] [Transparent Polynomial Delegation and Its Applications to Zero Knowledge Proof (S&P 2020)](https://eprint.iacr.org/2019/1482.pdf)

[23] [Human-Readable Fingerprint for Large Language Models (NeurIPS 2024)](https://arxiv.org/pdf/2312.04828)

[24] [Libra: Succinct Zero-Knowledge Proofs with Optimal Prover Computation (CRYPTO 2019)](https://eprint.iacr.org/2019/317.pdf)

[25] [ZK Endgame](https://vitalik.eth.limo/general/2021/12/06/endgame.html)

[26] [Gemini: Elastic SNARKs for Diverse Environments (Eurocrypt 2022)](https://eprint.iacr.org/2022/420)

[27] [Marlin: Preprocessing zkSNARKs with Universal and Updatable SRS (Eurocrypt 2020)](https://eprint.iacr.org/2019/1047)

[28] [Trust the Process: Zero-Knowledge Machine Learning to Enhance Trust in Generative AI Interactions](https://arxiv.org/abs/2402.06414)

[29] [Zero Knowledge Proofs for Decision Tree Predictions and Accuracy (CCS 2020)](https://dl.acm.org/doi/pdf/10.1145/3372297.3417278)

[30] [VERI-ZEXE: Decentralized Private Computation with Universal Setup (USENIX Security 2023)](https://eprint.iacr.org/2022/802)

[31] [Polynomial Commitment with a One-to-Many Prover and Applications (USENIX Security 2022)](https://www.usenix.org/system/files/sec22summer_zhang-jiaheng.pdf)

[32] [Ghostor: Toward a Secure Data-Sharing System from Decentralized Trust (NSDI 2020)](https://www.usenix.org/system/files/nsdi20-paper-hu-yuncong.pdf)

[33] [Correlation Intractability and SNARGs from Sub-exponential DDH (CRYPTO 2023)](https://eprint.iacr.org/2022/1486.pdf)

[34] [Ceno: Non-uniform, Segment and Parallel Zero-knowledge Virtual Machine (Journal of Cryptology 2024)](https://eprint.iacr.org/2024/387)

[35] [zkCNN: Zero Knowledge Proofs for Convolutional Neural Network Predictions and Accuracy (CCS 2021)](https://eprint.iacr.org/2021/673)

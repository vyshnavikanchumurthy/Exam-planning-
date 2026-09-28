import { SemesterSubject } from '../types/exam';

export const CS_ENGINEERING_SUBJECTS: SemesterSubject[] = [
  {
    id: 'cs-dbms',
    code: 'CS-304',
    name: 'Database Management Systems & SQL',
    category: 'Computer Science & Engineering',
    examDate: '2026-10-15',
    totalMarks: 100,
    durationMinutes: 180,
    targetScore: 94,
    syllabusSnippet: 'Relational Model, Relational Algebra, SQL, Normalization (1NF to BCNF, 4NF), Transaction Processing, Concurrency Control (2PL, Timestamp), Crash Recovery (ARIES, WAL), B+ Trees & Indexing.',
    pyqSnippet: 'BCNF vs 3NF decomposition, Conflict Serializability with Precedence Graphs, Strict 2PL cascading rollback prevention, B+ Tree insertion of order 4, Complex nested SQL group by having queries.',
    analysis: {
      summary: 'DBMS semester examinations heavily weigh Normalization proofs, Transaction Concurrency (precedence graph drawing and 2PL protocols), and Indexing B+ trees. Evaluators allocate up to 60% of marks for structured step-by-step algorithms, precedence graphs, and tabular decompositions.',
      highYieldTopics: [
        {
          title: 'Relational Normalization & Functional Dependencies',
          moduleOrUnit: 'Unit 3: Relational Database Design',
          estimatedWeightagePercent: 28,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 9,
          whyHighYield: 'Guaranteed 16-mark essay/analytical problem: finding minimal cover, candidate keys from closure, and decomposing a relation into BCNF/3NF with lossless join and dependency preservation verification.',
          mustMasterConcepts: [
            'Attribute Closure algorithm: X+ computation to determine superkeys and candidate keys',
            'BCNF condition (for every X -> Y, X must be a superkey) vs 3NF condition (X is superkey OR Y is prime attribute)',
            'Lossless Join decomposition check (R1 ∩ R2 -> R1 or R1 ∩ R2 -> R2) and Dependency Preservation testing'
          ]
        },
        {
          title: 'Transaction Concurrency Control & Serializability',
          moduleOrUnit: 'Unit 4: Transaction Processing',
          estimatedWeightagePercent: 25,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 8,
          whyHighYield: 'Testing conflict serializability via Precedence Graph cycle detection, Two-Phase Locking (Basic, Conservative, Strict, Rigorous 2PL), and Thomas Write Rule.',
          mustMasterConcepts: [
            'Precedence Graph construction (Ti -> Tj on conflicting operations: W-R, R-W, W-W on same data item)',
            'Strict 2PL mechanism: Exclusive locks held until transaction commits, preventing cascading aborts',
            'Deadlock prevention protocols: Wait-Die (non-preemptive) vs Wound-Wait (preemptive) schemes'
          ]
        },
        {
          title: 'B+ Tree Indexing & File Organization',
          moduleOrUnit: 'Unit 5: Storage & Indexing',
          estimatedWeightagePercent: 18,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Medium',
          recommendedHours: 6,
          whyHighYield: 'Examiners frequently ask for step-by-step tree insertion of 8-10 keys showing node split, root propagation, and leaf node linked list connections.',
          mustMasterConcepts: [
            'Order p of B+ tree: maximum pointers and keys per internal and leaf node (ceil(p/2) minimum)',
            'Leaf node splitting and copying key to parent vs internal node splitting and pushing key to parent',
            'Clustered (primary) vs Unclustered (secondary) index access cost differences'
          ]
        },
        {
          title: 'Advanced SQL, Relational Algebra & Views',
          moduleOrUnit: 'Unit 2: Query Languages',
          estimatedWeightagePercent: 16,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Easy',
          recommendedHours: 5,
          whyHighYield: 'Compulsory Section A and B questions testing correlated subqueries, GROUP BY HAVING, OUTER JOINs, and Division operator in Relational Algebra.',
          mustMasterConcepts: [
            'Relational Algebra operators: Selection (sigma), Projection (pi), Cartesian product (x), Natural Join, Division (÷)',
            'Correlated subquery execution logic (inner query evaluated for every outer tuple)',
            'View updatability constraints (single base table without aggregation/GROUP BY)'
          ]
        },
        {
          title: 'Crash Recovery, ARIES & Write-Ahead Logging (WAL)',
          moduleOrUnit: 'Unit 6: System Recovery',
          estimatedWeightagePercent: 13,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Medium',
          recommendedHours: 4,
          whyHighYield: 'Essay question on ACID durability, Write-Ahead Logging protocol, and the 3 phases of ARIES (Analysis, Redo, Undo).',
          mustMasterConcepts: [
            'WAL rule: log record flushed to disk before corresponding database page is written to disk',
            'Checkpointing mechanism (Fuzzy checkpoints and Transaction Table / Dirty Page Table restoration)',
            'ARIES 3-Phase recovery: Analysis (identify losers/winners), Redo (repeating history), Undo (rolling back losers)'
          ]
        }
      ],
      importantQuestions: [
        {
          id: 'dbms-q1',
          questionText: 'Given the relation schema R(A, B, C, D, E) with Functional Dependencies: F = { A -> BC, CD -> E, B -> D, E -> A }. (a) Find all candidate keys of R. (b) Determine the highest normal form of R. (c) Decompose R into 3NF such that the decomposition is both lossless join and dependency preserving.',
          type: 'Long / Essay (12-20m)',
          expectedMarks: 16,
          frequencyPastYears: 'Repeated 4 out of 5 consecutive semester exams (2021, 2022, 2023, 2024)',
          coreKeywordsRequired: ['Attribute Closure', 'Candidate Key', 'Prime Attribute', 'Lossless Join', 'Dependency Preservation', '3NF Synthesis Algorithm'],
          markingSchemeSteps: [
            'Step 1: Compute closures A+, B+, CD+, E+ to establish candidate keys: A, B (via B->D->CD->E->A), and E (4 Marks)',
            'Step 2: Test each FD against 3NF/BCNF criteria to pinpoint violations (e.g. B -> D violates BCNF and 3NF because B is not superkey and D is non-prime) (4 Marks)',
            'Step 3: Execute Bernstein 3NF synthesis algorithm using minimal cover to decompose R into R1, R2, R3 (5 Marks)',
            'Step 4: Formal verification of Lossless Join (confirming a relation contains a candidate key) and dependency preservation (3 Marks)'
          ],
          modelAnswerOutline: '1. Attribute closures: A+ = {A,B,C,D,E} -> A is key. B+ = {B,D} (not key). (CD)+ = {A,B,C,D,E} -> CD is key. E+ = {A,B,C,D,E} -> E is key. (BC)+ = {A,B,C,D,E} -> BC is key. 2. Candidate keys: {A}, {BC}, {CD}, {E}. Prime attributes: {A, B, C, D, E}. 3. Since every attribute is prime, R is already in 3NF! However, B -> D violates BCNF since B is not a superkey. 4. Decompose into BCNF: R1(B,D) and R2(A,B,C,E).',
          commonStudentMistakes: 'Overlooking that an attribute is prime if it belongs to ANY candidate key (not just the primary key), causing students to erroneously state a relation is not in 3NF.'
        },
        {
          id: 'dbms-q2',
          questionText: 'Consider a schedule S of three transactions T1, T2, T3: S = r1(X); r2(Z); r1(Z); r3(X); r3(Y); w1(X); w3(Y); r2(Y); w2(Z); w2(Y). (a) Draw the Precedence (Serialization) Graph for schedule S. (b) Determine if S is Conflict Serializable. If yes, state all valid equivalent serial schedules. (c) Explain how Strict 2-Phase Locking guarantees conflict serializability and prevents cascading aborts.',
          type: 'Long / Essay (12-20m)',
          expectedMarks: 14,
          frequencyPastYears: 'Appeared in 2020, 2022, 2023, 2024 university examinations',
          coreKeywordsRequired: ['Precedence Graph', 'Conflict Serializable', 'Topological Sort', 'Strict 2PL', 'Cascading Abort'],
          markingSchemeSteps: [
            'List all conflicting pairs: (r1(X), w1(X) - same txn), (r1(X), w3(X) - read before write), (w1(X), r3(X)), etc. (3 Marks)',
            'Draw precedence graph vertices {T1, T2, T3} and directed edges showing conflict order (4 Marks)',
            'Identify if cycles exist. If acyclic, perform topological sort to state valid serial order <T1, T3, T2> (3 Marks)',
            'Theoretical explanation and code/trace of Strict 2PL holding exclusive locks until COMMIT (4 Marks)'
          ],
          modelAnswerOutline: 'Draw three circles labelled T1, T2, T3. Trace conflicts: r1(Z) before w2(Z) gives T1->T2. r3(X) before w1(X) gives T3->T1. w3(Y) before r2(Y) gives T3->T2. Graph edges: T3 -> T1 -> T2 and T3 -> T2. Graph has NO cycle. Therefore, S is conflict serializable. Unique topological sort order is: T3 -> T1 -> T2.',
          commonStudentMistakes: 'Adding edges for operations on different data items (e.g. comparing an operation on X with an operation on Y) or between operations in the same transaction.'
        },
        {
          id: 'dbms-q3',
          questionText: 'Construct a B+ Tree of order 4 (max 3 keys and 4 child pointers per node) for the following sequence of key insertions: 10, 20, 30, 40, 50, 60, 70, 80, 90. Show the tree structure after every node split, clearly highlighting key promotion and leaf node pointer linkages.',
          type: 'Medium Answer (6-10m)',
          expectedMarks: 10,
          frequencyPastYears: 'Featured 3 times in past 4 years',
          coreKeywordsRequired: ['Order p = 4', 'Node Split', 'Key Promotion', 'Leaf Node Linked List', 'B+ Invariant'],
          markingSchemeSteps: [
            'Inserting 10, 20, 30: single leaf root (2 Marks)',
            'Inserting 40: overflow occurs (10, 20, 30, 40). Split into leaf [10, 20] and [30, 40] with 30 promoted to parent (3 Marks)',
            'Subsequent insertions 50, 60, 70 with second split and root creation (3 Marks)',
            'Final balanced B+ tree diagram showing all internal keys, leaf keys, and bottom sibling horizontal pointers (2 Marks)'
          ],
          modelAnswerOutline: 'Draw tree at overflow points. Note rule: leaf split COPIES the middle key up to the parent while retaining it in the right leaf; internal node split PUSHES the middle key up without retaining it in children.',
          commonStudentMistakes: 'Dropping the promoted key from the leaf node (treating B+ tree like a standard B-tree) or omitting horizontal sibling pointers between leaf nodes.'
        },
        {
          id: 'dbms-q4',
          questionText: 'Explain the 3 phases of the ARIES recovery algorithm (Analysis, Redo, Undo). How does Write-Ahead Logging (WAL) and the Dirty Page Table ensure both atomicity and durability?',
          type: 'Medium Answer (6-10m)',
          expectedMarks: 8,
          frequencyPastYears: 'Appeared in 2021, 2023, 2024',
          coreKeywordsRequired: ['Analysis Phase', 'Redo Phase (Repeating History)', 'Undo Phase', 'WAL Protocol', 'Log Sequence Number (LSN)'],
          markingSchemeSteps: [
            'Definition and purpose of Log Sequence Number (LSN) and pageLSN (2 Marks)',
            'Step-by-step description of Analysis, Redo, and Undo phases (4 Marks)',
            'Explanation of Compensation Log Records (CLRs) preventing crash during recovery (2 Marks)'
          ],
          modelAnswerOutline: '1. Analysis: scans forward from checkpoint, reconstructs Dirty Page Table (DPT) and Transaction Table. Identifies active (loser) transactions. 2. Redo: scans forward from lowest recLSN in DPT, re-executes all logged operations (repeats history) including uncommitted ones. 3. Undo: scans backward, rolls back all loser transactions and writes Compensation Log Records (CLRs).',
          commonStudentMistakes: 'Claiming that Redo only executes committed transactions; ARIES repeats ALL history during Redo, and only later undoes uncommitted losers during Undo.'
        }
      ],
      keyFormulasAndDiagrams: [
        {
          title: 'BCNF vs 3NF Formal Invariant',
          detail: 'For every functional dependency X -> Y in F+:\n- BCNF requires X to be a Superkey.\n- 3NF allows X to be a Superkey OR Y is a Prime Attribute (member of candidate key).',
          priority: 'Critical'
        },
        {
          title: 'Conflict Operations Matrix',
          detail: 'Two operations Oi(X) and Oj(X) conflict iff: (1) belong to different transactions (i != j), (2) access the same item X, and (3) at least one is a Write(X). Conflicting pairs: Read-Write, Write-Read, Write-Write.',
          priority: 'Critical'
        },
        {
          title: 'Strict 2-Phase Locking (Strict 2PL) Protocol',
          detail: 'Growing Phase: Acquire locks (Shared/Exclusive). No release allowed.\nShrinking Phase: All Exclusive (X) locks held until COMMIT / ABORT. Eliminates cascading rollbacks.',
          priority: 'Critical'
        },
        {
          title: 'B+ Tree Node Capacity Equations',
          detail: 'For order p: Max keys = p - 1, Min keys in non-root leaf = ceil((p-1)/2). Max pointers = p, Min pointers in non-root internal = ceil(p/2).',
          priority: 'Important'
        }
      ],
      examTimeAllocationStrategy: {
        readingTimeMinutes: 15,
        sections: [
          {
            sectionName: 'Section A: SQL & Relational Algebra (5 Qs x 4m)',
            marks: 20,
            allocatedMinutes: 30,
            tip: 'Write clean SQL with proper indentation and correct SELECT-FROM-WHERE-GROUP BY-HAVING order.'
          },
          {
            sectionName: 'Section B: Normalization & Precedence Graphs (3 Qs x 12m)',
            marks: 36,
            allocatedMinutes: 65,
            tip: 'Draw precedence graph with large clearly spaced nodes. Write out closure sets row by row.'
          },
          {
            sectionName: 'Section C: B+ Tree Insertion & ARIES Recovery (2 Qs x 22m)',
            marks: 44,
            allocatedMinutes: 60,
            tip: 'Draw B+ tree neatly with horizontal leaf link arrows. Outline the 3 ARIES recovery passes clearly.'
          }
        ],
        revisionBufferMinutes: 10,
        strategyNotes: 'Verify candidate keys closure sets. Double check that precedence graph arrows point from earlier transaction to later conflicting transaction.'
      },
      flashcards: [
        {
          front: 'What is the condition for a decomposition to be Lossless Join?',
          back: 'Decomposition of R into R1 and R2 is lossless join iff (R1 ∩ R2) -> R1 OR (R1 ∩ R2) -> R2 (i.e. common attributes must be a superkey of at least one relation).',
          category: 'Normalization',
          difficulty: 'Easy'
        },
        {
          front: 'Difference between Strict 2PL and Rigorous 2PL?',
          back: 'Strict 2PL: Holds all EXCLUSIVE locks until transaction end (Shared locks can be released earlier).\nRigorous 2PL: Holds BOTH Shared and Exclusive locks until transaction end.',
          category: 'Concurrency',
          difficulty: 'Medium'
        },
        {
          front: 'What is a Phantom Read in SQL transaction isolation?',
          back: 'Occurs when Transaction 1 executes a query with a range condition (e.g. salary > 50k), Transaction 2 inserts a new row satisfying the predicate and commits, and Transaction 1 re-reads the range and sees the new "phantom" row.',
          category: 'SQL Standards',
          difficulty: 'Medium'
        },
        {
          front: 'Why does Write-Ahead Logging (WAL) require log records to be flushed before dirty pages?',
          back: 'To preserve Atomicity and Durability: if a crash occurs, the database engine must have the undo/redo log on disk to either undo uncommitted writes or redo committed writes that were not yet saved to data files.',
          category: 'Crash Recovery',
          difficulty: 'Hard'
        }
      ]
    }
  },
  {
    id: 'cs-cn',
    code: 'CS-306',
    name: 'Computer Networks & Internet Protocols',
    category: 'Computer Science & Engineering',
    examDate: '2026-10-20',
    totalMarks: 100,
    durationMinutes: 180,
    targetScore: 92,
    syllabusSnippet: 'OSI vs TCP/IP, Data Link Layer (Framing, CRC, Sliding Window), MAC (CSMA/CD, CSMA/CA, Ethernet), Network Layer (IPv4/IPv6, CIDR Subnetting, Routing: Distance Vector, Link State OSPF, BGP), Transport Layer (TCP Flow & Congestion Control, UDP), Application Layer (DNS, HTTP/HTTPS).',
    pyqSnippet: 'CIDR Subnetting numerical, TCP AIMD Congestion Control curve, Go-Back-N vs Selective Repeat efficiency, Link State (Dijkstra) routing trace, CRC-16 polynomial division.',
    analysis: {
      summary: 'Computer Networks semester exams place immense weight on Subnetting numericals (VLSM/CIDR), TCP Congestion Control state transitions, CRC polynomial calculations, and Sliding Window efficiency derivations. Numerical accuracy and packet flow diagrams secure over 65% of the total paper marks.',
      highYieldTopics: [
        {
          title: 'IP Addressing, CIDR & Variable Length Subnetting (VLSM)',
          moduleOrUnit: 'Unit 3: Network Layer',
          estimatedWeightagePercent: 28,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 9,
          whyHighYield: 'Mandatory 15-mark numerical problem on allocating subnets for multiple departments (e.g. Sales 60 hosts, IT 120 hosts, HR 25 hosts) from a given /24 block, finding network address, broadcast address, and subnet mask.',
          mustMasterConcepts: [
            'Subnet host capacity formula: 2^(32 - prefix) - 2 usable IP addresses',
            'Subnet mask bitwise ANDing to determine routing prefix and interface matching',
            'CIDR aggregation / Supernetting rules to condense routing tables'
          ]
        },
        {
          title: 'TCP Flow & Congestion Control Mechanisms',
          moduleOrUnit: 'Unit 4: Transport Layer',
          estimatedWeightagePercent: 24,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 8,
          whyHighYield: 'Graph tracing of TCP Congestion Window (cwnd) across rounds through Slow Start (exponential), Congestion Avoidance (AIMD linear), Fast Retransmit (3 duplicate ACKs), and Timeout (cwnd drops to 1 MSS).',
          mustMasterConcepts: [
            'Slow Start threshold (ssthresh) update: ssthresh = max(cwnd/2, 2 MSS)',
            'Reaction to Timeout (severe congestion) vs 3 Duplicate ACKs (mild congestion / Fast Recovery)',
            'TCP Sliding Window flow control with Receiver Window (rwnd) advertising: Effective Window = min(cwnd, rwnd)'
          ]
        },
        {
          title: 'Error Detection (CRC) & Sliding Window Protocols',
          moduleOrUnit: 'Unit 2: Data Link Layer',
          estimatedWeightagePercent: 20,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Medium',
          recommendedHours: 7,
          whyHighYield: 'CRC binary polynomial long division numerical plus efficiency derivation comparison between Stop-and-Wait, Go-Back-N, and Selective Repeat.',
          mustMasterConcepts: [
            'Cyclic Redundancy Check (CRC) modulo-2 binary division without carry/borrow (XOR)',
            'Maximum window size condition: GBN Sender window <= 2^k - 1; Selective Repeat Sender = Receiver <= 2^(k-1)',
            'Protocol efficiency formula: eta = N / (1 + 2*a) where a = Propagation_Delay / Transmission_Delay'
          ]
        },
        {
          title: 'Routing Protocols: Distance Vector vs Link State (OSPF)',
          moduleOrUnit: 'Unit 3: Routing Architecture',
          estimatedWeightagePercent: 16,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Medium',
          recommendedHours: 5,
          whyHighYield: 'Detailed comparison of Bellman-Ford count-to-infinity problem and solutions (Split Horizon, Poison Reverse) versus Link State Dijkstra advertisement.',
          mustMasterConcepts: [
            'Count-to-Infinity scenario trace when link fails in Distance Vector routing',
            'Split Horizon rule: do not advertise a route back on the interface from which it was learned',
            'Open Shortest Path First (OSPF) Link State Advertisements (LSA) flooding and shortest path tree computation'
          ]
        },
        {
          title: 'Medium Access Control (CSMA/CD & Ethernet)',
          moduleOrUnit: 'Unit 2: MAC Sublayer',
          estimatedWeightagePercent: 12,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Easy',
          recommendedHours: 4,
          whyHighYield: 'Compulsory derivation for minimum frame size in CSMA/CD: Length_min = 2 * Propagation_Delay * Bandwidth.',
          mustMasterConcepts: [
            'CSMA/CD minimum frame size condition to detect collisions before transmission finishes',
            'Binary Exponential Backoff algorithm: picking slot k from [0, 2^i - 1] after i collisions',
            'CSMA/CD (Wired) vs CSMA/CA with RTS/CTS (Wireless hidden node mitigation)'
          ]
        }
      ],
      importantQuestions: [
        {
          id: 'cn-q1',
          questionText: 'An organization is granted the IPv4 block 192.168.10.0/24. The network administrator needs to create 4 subnets for departments: Department A (100 hosts), Department B (50 hosts), Department C (25 hosts), and Department D (12 hosts). (a) Design a VLSM addressing scheme. For each subnet, specify the Subnet Mask in CIDR and dotted decimal format, Network Address, First Usable Host IP, Last Usable Host IP, and Broadcast Address. (b) How many IP addresses remain unallocated?',
          type: 'Long / Essay (12-20m)',
          expectedMarks: 16,
          frequencyPastYears: 'Repeated 4 out of last 5 years in Section C',
          coreKeywordsRequired: ['VLSM', 'Subnet Mask', 'Network Address', 'Broadcast Address', 'CIDR Prefix', 'Host Bits'],
          markingSchemeSteps: [
            'Sort departments in descending order of host requirements: A(100) -> B(50) -> C(25) -> D(12) (2 Marks)',
            'Subnet A calculation: needs 100 hosts -> 7 host bits (2^7 - 2 = 126), prefix /25 (Mask: 255.255.255.128) (4 Marks)',
            'Subnet B calculation: needs 50 hosts -> 6 host bits, prefix /26 (Mask: 255.255.255.192) (3 Marks)',
            'Subnet C calculation: needs 25 hosts -> 5 host bits, prefix /27 (Mask: 255.255.255.224) (3 Marks)',
            'Subnet D calculation: needs 12 hosts -> 4 host bits, prefix /28 (Mask: 255.255.255.240) (2 Marks)',
            'Summary table and count of remaining unallocated IPs (2 Marks)'
          ],
          modelAnswerOutline: '1. Order: A(100), B(50), C(25), D(12). 2. Subnet A: 192.168.10.0/25. Range: .1 to .126. Broadcast: .127. 3. Subnet B: 192.168.10.128/26. Range: .129 to .190. Broadcast: .191. 4. Subnet C: 192.168.10.192/27. Range: .193 to .222. Broadcast: .223. 5. Subnet D: 192.168.10.224/28. Range: .225 to .238. Broadcast: .239. Unallocated block: 192.168.10.240 to .255 (16 IP addresses).',
          commonStudentMistakes: 'Subnetting in arbitrary order rather than descending host size, which fragments the contiguous address space and produces invalid overlapping subnets.'
        },
        {
          id: 'cn-q2',
          questionText: 'Trace the TCP Congestion Window (cwnd) behavior for 14 transmission rounds under TCP Reno. The slow start threshold (ssthresh) is initially set to 16 MSS. During round 8, a timeout occurs. During round 12, three duplicate ACKs are received. Plot the cwnd graph over time and state the value of cwnd and ssthresh at each round.',
          type: 'Long / Essay (12-20m)',
          expectedMarks: 14,
          frequencyPastYears: 'Featured in 2021, 2023, 2024 university examinations',
          coreKeywordsRequired: ['Slow Start (Exponential)', 'Congestion Avoidance (Linear AIMD)', 'ssthresh', 'Timeout Penalty', 'Fast Retransmit & Fast Recovery (Duplicate ACKs)'],
          markingSchemeSteps: [
            'Rounds 1-5 Slow start trace: cwnd doubles (1, 2, 4, 8, 16) until reaching initial ssthresh=16 (3 Marks)',
            'Rounds 5-8 Congestion avoidance: cwnd increases linearly by +1 MSS per round (17, 18, 19) (3 Marks)',
            'Round 8 Timeout: ssthresh drops to cwnd/2 = 19/2 = 9 MSS. cwnd resets to 1 MSS (3 Marks)',
            'Rounds 9-12 Recovery: Slow start to 9, then linear. Duplicate ACKs at round 12: ssthresh = cwnd/2, cwnd = ssthresh + 3 (Fast Recovery) (3 Marks)',
            'Clear labeled hand-drawn Cartesian graph showing rounds vs cwnd MSS (2 Marks)'
          ],
          modelAnswerOutline: 'Tabulate columns: Round, cwnd, ssthresh, Phase. 1: cwnd=1, 2: cwnd=2, 3: cwnd=4, 4: cwnd=8, 5: cwnd=16 (hits ssthresh). 6: cwnd=17, 7: cwnd=18, 8: cwnd=19 (Timeout!). Post-Timeout: ssthresh=9, cwnd=1. 9: cwnd=2, 10: cwnd=4, 11: cwnd=8, 12: cwnd=9 (hits ssthresh). 3 Dup ACKs at 12: ssthresh=4, cwnd=ssthresh=4 (or 7 in Fast Recovery). Draw sawtooth curve.',
          commonStudentMistakes: 'Resetting cwnd to 1 upon receiving 3 duplicate ACKs; only a Timeout resets cwnd to 1, whereas 3 duplicate ACKs trigger Fast Retransmit with ssthresh = cwnd/2.'
        },
        {
          id: 'cn-q3',
          questionText: 'A bit stream 1101011011 is transmitted using the standard CRC generator polynomial G(x) = x^4 + x + 1. (a) Generate the transmitted codeword (frame). (b) Suppose the 3rd bit from the left is inverted during transmission. Show how the receiver detects the transmission error using polynomial division.',
          type: 'Numerical / Problem Solving',
          expectedMarks: 10,
          frequencyPastYears: 'Appeared in 4 of last 5 examinations',
          coreKeywordsRequired: ['Modulo-2 Division (XOR)', 'Generator Polynomial', 'Appended Zeros', 'CRC Remainder', 'Syndrome Check'],
          markingSchemeSteps: [
            'Convert generator polynomial to binary: x^4 + x + 1 = 10011 (2 Marks)',
            'Append 4 zeros to data bit stream: 1101011011 0000 (2 Marks)',
            'Step-by-step modulo-2 division showing remainder CRC bits (3 Marks)',
            'Receiver side verification: divide received inverted bitstream by 10011 and show non-zero remainder error detection (3 Marks)'
          ],
          modelAnswerOutline: 'Generator G = 10011 (degree 4). Data + 4 zeros = 11010110110000. Perform long division using XOR instead of subtraction. Remainder R = 1110. Codeword sent = 11010110111110. Invert 3rd bit -> received = 11110110111110. Divide by 10011. Final remainder is non-zero, indicating corrupt frame; receiver discards frame.',
          commonStudentMistakes: 'Using standard binary arithmetic subtraction with borrows instead of bitwise XOR (where 1 XOR 1 = 0, 1 XOR 0 = 1).'
        },
        {
          id: 'cn-q4',
          questionText: 'Derive the maximum throughput efficiency for (a) Stop-and-Wait, (b) Go-Back-N, and (c) Selective Repeat sliding window protocols. If bandwidth is 1 Gbps, one-way propagation delay is 25 ms, and packet size is 1 KB, calculate the minimum sender window size required to achieve 100% channel utilization.',
          type: 'Derivation / Proof',
          expectedMarks: 10,
          frequencyPastYears: 'Featured in 2020, 2022, 2023 papers',
          coreKeywordsRequired: ['Transmission Time (Tt)', 'Propagation Time (Tp)', 'Parameter a = Tp/Tt', 'Window Size W', 'Channel Utilization'],
          markingSchemeSteps: [
            'Deriving eta = Tt / (Tt + 2*Tp) = 1 / (1 + 2*a) for Stop-and-Wait (2 Marks)',
            'Deriving eta = min(1, W / (1 + 2*a)) for Go-Back-N and Selective Repeat (2 Marks)',
            'Calculating Tt = (1000 * 8) / 10^9 = 8 microseconds (2 Marks)',
            'Calculating a = 25 ms / 0.008 ms = 3125 (2 Marks)',
            'Solving for W >= 1 + 2*a = 1 + 2(3125) = 6251 packets (2 Marks)'
          ],
          modelAnswerOutline: 'Tt = Length / Bandwidth = 8000 / 10^9 = 8 us. Tp = 25 ms = 25,000 us. a = Tp / Tt = 3125. Utilization eta = W / (1 + 2a). For 100% utilization, W >= 1 + 2a = 1 + 2(3125) = 6251 packets. Minimum window size = 6251 packets (approx 6.25 MB in flight).',
          commonStudentMistakes: 'Forgetting to convert Kilobytes to bits (1 KB = 8000 bits or 8192 bits) or confusing one-way delay with Round Trip Time (RTT = 2 * Tp).'
        }
      ],
      keyFormulasAndDiagrams: [
        {
          title: 'Sliding Window Channel Efficiency',
          detail: 'Efficiency eta = W / (1 + 2*a) where a = Propagation_Delay / Transmission_Delay, Tt = L / B. For 100% utilization: W >= 1 + 2*a.',
          priority: 'Critical'
        },
        {
          title: 'CSMA/CD Minimum Frame Size Invariant',
          detail: 'L_min = 2 * Tp * Bandwidth. Frame transmission time must be at least one Round Trip Time (2 * Tp) to detect collisions before sending finishes.',
          priority: 'Critical'
        },
        {
          title: 'TCP Congestion Window Dynamics (AIMD)',
          detail: 'Slow Start: cwnd = cwnd + 1 MSS per ACK (exponential doubling per RTT).\nCongestion Avoidance: cwnd = cwnd + (1/cwnd) per ACK (linear +1 MSS per RTT).\nTimeout: ssthresh = max(cwnd/2, 2 MSS), cwnd = 1 MSS.\n3 Dup ACKs: ssthresh = cwnd/2, cwnd = ssthresh + 3 MSS.',
          priority: 'Critical'
        },
        {
          title: 'IPv4 Header Structure',
          detail: '20 bytes minimum header: Version (4b), IHL (4b), ToS (8b), Total Length (16b), Identification (16b), Flags (3b: DF, MF), Fragment Offset (13b), TTL (8b), Protocol (8b), Header Checksum (16b), Source IP (32b), Dest IP (32b).',
          priority: 'Important'
        }
      ],
      examTimeAllocationStrategy: {
        readingTimeMinutes: 15,
        sections: [
          {
            sectionName: 'Section A: Protocol Definitions & Header Formats (5 Qs x 4m)',
            marks: 20,
            allocatedMinutes: 25,
            tip: 'Sketch clean IPv4 or TCP 32-bit word header diagram.'
          },
          {
            sectionName: 'Section B: CRC Division & Routing Traces (3 Qs x 12m)',
            marks: 36,
            allocatedMinutes: 65,
            tip: 'Show modulo-2 XOR long division step by step. Align binary digits vertically.'
          },
          {
            sectionName: 'Section C: VLSM Subnetting & TCP CWND Graph (2 Qs x 22m)',
            marks: 44,
            allocatedMinutes: 65,
            tip: 'Format subnetting output in a clear ruled 5-column table. Draw TCP sawtooth curve clearly.'
          }
        ],
        revisionBufferMinutes: 10,
        strategyNotes: 'Verify binary subnet mask conversions and double check that host count subtracts 2 (network address and broadcast address).'
      },
      flashcards: [
        {
          front: 'What is the minimum frame size requirement in CSMA/CD?',
          back: 'Transmission Time (Tt) >= 2 * Propagation Time (Tp)\nTherefore: Frame_Length >= 2 * Tp * Bandwidth\nThis ensures a transmitting station detects a collision before it finishes sending its frame.',
          category: 'Data Link Layer',
          difficulty: 'Medium'
        },
        {
          front: 'Difference between Go-Back-N and Selective Repeat window limits?',
          back: 'For k-bit sequence numbers:\n- Go-Back-N: Sender window <= 2^k - 1, Receiver window = 1\n- Selective Repeat: Sender window = Receiver window <= 2^(k - 1)',
          category: 'Sliding Window',
          difficulty: 'Medium'
        },
        {
          front: 'What is the Count-to-Infinity problem in Distance Vector routing?',
          back: 'When a link breaks, neighboring routers slowly increment routing metric step by step up to infinity (usually capped at 16 in RIP) because they exchange stale routing loops. Solved via Split Horizon and Poison Reverse.',
          category: 'Routing',
          difficulty: 'Hard'
        },
        {
          front: 'What are the 3 flags in the IPv4 header and what do they mean?',
          back: 'Bit 0: Reserved (must be 0)\nBit 1: DF (Don\'t Fragment - drop packet if it exceeds MTU)\nBit 2: MF (More Fragments - 1 if more fragments follow, 0 for last fragment)',
          category: 'Network Layer',
          difficulty: 'Easy'
        }
      ]
    }
  },
  {
    id: 'cs-coa',
    code: 'CS-308',
    name: 'Computer Organization & Architecture',
    category: 'Computer Science & Engineering',
    examDate: '2026-10-24',
    totalMarks: 100,
    durationMinutes: 180,
    targetScore: 90,
    syllabusSnippet: 'Functional Blocks, Booths Multiplication Algorithm, IEEE 754 Floating Point Representation, Instruction Pipeline (Hazards: Structural, Data, Control), Cache Memory Mapping (Direct, Set-Associative, Fully Associative), Virtual Memory & Paging, Interrupts & DMA, RISC vs CISC.',
    pyqSnippet: 'Booths Multiplication numerical with negative numbers, IEEE 754 Single Precision 32-bit conversion, Cache hit ratio & Average Memory Access Time (AMAT), 5-stage RISC pipeline hazard stalling and forwarding, DMA controller cycle stealing.',
    analysis: {
      summary: 'COA semester exams award maximum marks for exact mathematical traces: Booth\'s algorithm table, IEEE 754 floating-point bit conversion, Cache address partitioning, and Pipeline space-time timing diagrams. Evaluators verify step-by-step register states.',
      highYieldTopics: [
        {
          title: 'Cache Memory Mapping & AMAT Calculation',
          moduleOrUnit: 'Unit 4: Memory Hierarchy',
          estimatedWeightagePercent: 28,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 9,
          whyHighYield: 'Guaranteed 16-mark problem requiring address breakdown (Tag, Set/Index, Byte Offset) for Direct Mapped and N-way Set Associative caches, calculating tag directory overhead, and computing AMAT for multi-level caches (L1, L2, Main Memory).',
          mustMasterConcepts: [
            'Address partitioning: Byte Offset = log2(Block_Size), Set Index = log2(Number_of_Sets), Tag = Address_Bits - Index - Offset',
            'Number of Sets = Total_Cache_Lines / N (where N is associativity)',
            'Average Memory Access Time (AMAT) = Hit_Time + Miss_Rate * Miss_Penalty (extended to L1 & L2)'
          ]
        },
        {
          title: 'Instruction Pipelining & Hazard Resolution',
          moduleOrUnit: 'Unit 3: Processing Unit & Pipelining',
          estimatedWeightagePercent: 25,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 8,
          whyHighYield: 'Drawing space-time diagrams for a 5-stage pipeline (IF, ID, EX, MEM, WB), identifying RAW data dependencies, calculating speedup over non-pipelined execution, and demonstrating operand forwarding.',
          mustMasterConcepts: [
            'Pipeline Speedup formula: S_k = (n * k) / (k + n - 1 + stalls) where k = stages, n = instructions',
            'Read-After-Write (RAW) data hazard resolution via Hardware Forwarding (Bypassing) from EX/MEM and MEM/WB registers',
            'Branch penalties in Control Hazards and Dynamic Branch Prediction (1-bit and 2-bit saturating counters)'
          ]
        },
        {
          title: 'Computer Arithmetic: Booths Algorithm & IEEE 754',
          moduleOrUnit: 'Unit 2: ALU & Arithmetic',
          estimatedWeightagePercent: 22,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Medium',
          recommendedHours: 7,
          whyHighYield: 'Mandatory numerical: multiplying signed 2s complement integers using Booths Algorithm table and converting decimal numbers to IEEE 754 32-bit single-precision floating point format.',
          mustMasterConcepts: [
            'Booths multiplier step: inspect (Q0, Q-1); 10 -> A = A - M, 01 -> A = A + M, 00/11 -> no operation; followed by Arithmetic Shift Right (ASR [A, Q, Q-1])',
            'IEEE 754 32-bit layout: 1 bit Sign, 8 bits Biased Exponent (bias = 127), 23 bits Mantissa (normalized 1.M)',
            'Restoring vs Non-restoring division step comparison'
          ]
        },
        {
          title: 'I/O Organization, Interrupts & DMA Controllers',
          moduleOrUnit: 'Unit 5: Input / Output Subsystems',
          estimatedWeightagePercent: 14,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Easy',
          recommendedHours: 4,
          whyHighYield: 'Comparison of Programmed I/O, Interrupt-Driven I/O, and Direct Memory Access (DMA) with burst transfer vs cycle stealing calculations.',
          mustMasterConcepts: [
            'DMA controller components (Address Register, Word Count Register, Control Register, Bus Request/Grant BR/BG)',
            'DMA Burst mode (holds bus until entire block transfers) vs Cycle Stealing mode (interleaves with CPU bus cycles)',
            'Vectored interrupts: CPU receives vector address from interrupting device on the data bus'
          ]
        },
        {
          title: 'Instruction Set Architectures & Addressing Modes',
          moduleOrUnit: 'Unit 1: Machine Instructions',
          estimatedWeightagePercent: 11,
          recurrenceProbability: 'Moderate (50-74%)',
          difficulty: 'Easy',
          recommendedHours: 4,
          whyHighYield: 'Explaining effective address calculation for Immediate, Direct, Indirect, Register Indirect, Indexed, and PC-Relative modes.',
          mustMasterConcepts: [
            'Effective Address calculation rules for each addressing mode',
            'RISC (fixed instruction length, load-store architecture) vs CISC (variable length, complex microcode instructions)',
            'Hardwired control unit (faster, fixed logic gates) vs Microprogrammed control unit (flexible, control ROM)'
          ]
        }
      ],
      importantQuestions: [
        {
          id: 'coa-q1',
          questionText: 'A 32-bit byte-addressable computer system has a 64 KB 4-way set-associative cache with a block size of 32 bytes. (a) Determine the number of bits in the Tag, Set Index, and Word (Byte) Offset fields. (b) Calculate the total cache memory size including tag directory overhead (assume 1 valid bit and 1 dirty bit per line). (c) Given CPU executes instructions with 80% L1 hit rate (L1 latency = 1 ns), 90% L2 local hit rate (L2 latency = 8 ns), and main memory latency of 100 ns. Calculate the Average Memory Access Time (AMAT).',
          type: 'Long / Essay (12-20m)',
          expectedMarks: 16,
          frequencyPastYears: 'Repeated 4 out of last 5 years',
          coreKeywordsRequired: ['Set Associative', 'Byte Offset', 'Tag Bits', 'Cache Overhead', 'AMAT Formula', 'Local Miss Rate'],
          markingSchemeSteps: [
            'Block size = 32 bytes -> Offset bits = log2(32) = 5 bits (2 Marks)',
            'Total cache lines = 64 KB / 32 B = 2048 lines. Sets = 2048 / 4 = 512 sets -> Index bits = log2(512) = 9 bits (3 Marks)',
            'Tag bits = 32 - 9 - 5 = 18 bits (3 Marks)',
            'Tag overhead per line = 18 (tag) + 1 (valid) + 1 (dirty) = 20 bits. Total tag directory = 2048 * 20 bits = 40,960 bits = 5.12 KB (4 Marks)',
            'AMAT calculation: AMAT = L1_hit + (1 - L1_hit) * [ L2_hit_latency + (1 - L2_hit) * Mem_latency ] = 1 + 0.20 * [ 8 + 0.10 * 100 ] = 4.6 ns (4 Marks)'
          ],
          modelAnswerOutline: '1. Partitioning: Address = 32 bits. Offset = log2(32) = 5 bits. Sets = (64*1024) / (4 * 32) = 512 sets -> Index = 9 bits. Tag = 32 - 9 - 5 = 18 bits. 2. Overhead: Each line stores 18 tag bits + 1 valid bit + 1 dirty bit = 20 overhead bits. Total lines = 2048 lines. Total tag RAM = 2048 * 20 = 40,960 bits. Total Cache Size = 64 KB data + 5.12 KB overhead = 69.12 KB. 3. AMAT = 1 ns + 0.20 * (8 ns + 0.10 * 100 ns) = 1 + 0.20 * (18) = 1 + 3.6 = 4.6 ns.',
          commonStudentMistakes: 'Dividing total cache capacity by block size without accounting for the set associativity factor when finding the number of sets.'
        },
        {
          id: 'coa-q2',
          questionText: 'Multiply the signed 2s complement binary numbers (+11) and (-13) using Booth\'s Multiplication Algorithm. Show the complete step-by-step register states of A, Q, Q-1, and Count for every cycle.',
          type: 'Numerical / Problem Solving',
          expectedMarks: 12,
          frequencyPastYears: 'Compulsory numerical in every alternate exam cycle',
          coreKeywordsRequired: ['Booths Algorithm', 'Arithmetic Shift Right (ASR)', '2s Complement Addition', 'Multiplicand M', 'Multiplier Q'],
          markingSchemeSteps: [
            'Represent Multiplicand M = +11 as 01011 (5 bits), -M = 10101 in 2s complement (2 Marks)',
            'Represent Multiplier Q = -13 as 10011 (5 bits). Initialize A = 00000, Q-1 = 0, Count = 5 (2 Marks)',
            'Trace all 5 cycles showing operation based on (Q0, Q-1) followed by Arithmetic Shift Right (6 Marks)',
            'Final 10-bit signed product [A, Q] verified as -143 (2 Marks)'
          ],
          modelAnswerOutline: 'M = 01011, -M = 10101. Initial: A=00000, Q=10011, Q-1=0, Count=5.\n- Step 1: Q0=1, Q-1=0 -> A = A - M = 10101. ASR [A, Q, Q-1] -> A=11010, Q=11001, Q-1=1.\n- Step 2: Q0=1, Q-1=1 -> No op. ASR -> A=11101, Q=01100, Q-1=1.\n- Step 3: Q0=0, Q-1=1 -> A = A + M = 11101 + 01011 = 01000. ASR -> A=00100, Q=00110, Q-1=0.\n- Step 4: Q0=0, Q-1=0 -> No op. ASR -> A=00010, Q=00011, Q-1=0.\n- Step 5: Q0=1, Q-1=0 -> A = A - M = 00010 + 10101 = 10111. ASR -> A=11011, Q=10001, Q-1=1.\nFinal product [A, Q] = 1101110001 = -143 in decimal (verified: 11 * -13 = -143).',
          commonStudentMistakes: 'Performing a logical shift right (shifting in 0) instead of an ARITHMETIC shift right (which duplicates the sign bit of A).'
        },
        {
          id: 'coa-q3',
          questionText: 'Convert the decimal number -118.625 into IEEE 754 32-bit Single Precision Floating Point representation. Give the final answer in hexadecimal format.',
          type: 'Numerical / Problem Solving',
          expectedMarks: 8,
          frequencyPastYears: 'Appeared in 2021, 2022, 2024',
          coreKeywordsRequired: ['Sign Bit', 'Biased Exponent (127)', 'Normalized Mantissa', 'Hexadecimal Conversion'],
          markingSchemeSteps: [
            'Convert integer part: 118 = 1110110 in binary (2 Marks)',
            'Convert fractional part: 0.625 = 0.101 in binary -> 118.625 = 1110110.101 (2 Marks)',
            'Normalize: 1.110110101 * 2^6. Exponent = 6 + 127 = 133 = 10000101 in binary (2 Marks)',
            'Assemble Sign (1), Exponent (10000101), Mantissa (11011010100000000000000) and convert to Hex: 0xC2ED4000 (2 Marks)'
          ],
          modelAnswerOutline: '1. Negative number -> Sign bit S = 1. 2. 118 = 64+32+16+4+2 = 1110110_2. 0.625 = 0.5 + 0.125 = .101_2. Full binary = 1110110.101. 3. Normalize: 1.110110101 * 2^6. 4. Biased exponent E = 6 + 127 = 133 = 10000101_2. 5. Mantissa = 11011010100000000000000 (23 bits). 6. Bitstring: 1 10000101 11011010100000000000000. Group in 4s: 1100 0010 1110 1101 0100 0000 0000 0000 -> Hex = 0xC2ED4000.',
          commonStudentMistakes: 'Adding the implicit leading 1 into the 23-bit mantissa field (the leading 1 is hidden in normalized IEEE 754).'
        },
        {
          id: 'coa-q4',
          questionText: 'Consider a 5-stage RISC processor (IF, ID, EX, MEM, WB). Each stage takes 1 clock cycle. (a) Calculate the speedup of this pipeline for 100 instructions compared to non-pipelined execution assuming ideal conditions. (b) Explain the Read-After-Write (RAW) data hazard that occurs in the instruction pair: "ADD R1, R2, R3" followed immediately by "SUB R4, R1, R5". How does Operand Forwarding resolve this without stalling?',
          type: 'Medium Answer (6-10m)',
          expectedMarks: 10,
          frequencyPastYears: 'Repeated 3 times in past 4 years',
          coreKeywordsRequired: ['5-Stage Pipeline', 'Speedup Ratio', 'RAW Data Dependency', 'Operand Forwarding', 'Space-Time Diagram'],
          markingSchemeSteps: [
            'Non-pipelined cycles: 100 * 5 = 500 cycles. Pipelined cycles: 5 + (100 - 1) = 104 cycles (2 Marks)',
            'Speedup = 500 / 104 = 4.81 (approaching ideal k = 5) (2 Marks)',
            'Explaining RAW hazard: ADD produces R1 in cycle 5 (WB), but SUB needs R1 in cycle 3 (ID/EX), causing 2 stall cycles without forwarding (3 Marks)',
            'Diagram showing hardware forwarding path directly from EX/MEM ALU output buffer to EX input multiplexer (3 Marks)'
          ],
          modelAnswerOutline: 'Speedup = (n * k) / (k + n - 1) = (100 * 5) / (5 + 99) = 500 / 104 = 4.807x. In standard execution, ADD writes to R1 during WB (cycle 5). SUB reads R1 during ID (cycle 3) -> stale value read (RAW hazard). Hardware forwarding detects that destination of ADD matches source of SUB, routing the calculated ALU output from the EX/MEM pipeline register directly to the ALU input for SUB in cycle 4 with 0 stall cycles.',
          commonStudentMistakes: 'Believing operand forwarding can eliminate all hazards; load-use data hazards still require 1 stall cycle even with forwarding.'
        }
      ],
      keyFormulasAndDiagrams: [
        {
          title: 'Cache Address Partitioning Formulas',
          detail: 'Offset = log2(Block_Size_Bytes)\nSet_Index = log2(Total_Cache_Bytes / (N * Block_Size_Bytes))\nTag = Address_Bits - Set_Index - Offset',
          priority: 'Critical'
        },
        {
          title: 'Booths Multiplication Decision Rule',
          detail: 'Examine (Q0, Q-1):\n- 10: Subtract Multiplicand (A = A - M)\n- 01: Add Multiplicand (A = A + M)\n- 00 / 11: No operation\nAlways follow with Arithmetic Shift Right (ASR [A, Q, Q-1])',
          priority: 'Critical'
        },
        {
          title: 'Average Memory Access Time (AMAT)',
          detail: 'AMAT = Hit_Time_L1 + Miss_Rate_L1 * [ Hit_Time_L2 + Miss_Rate_L2 * Main_Memory_Latency ]',
          priority: 'Critical'
        },
        {
          title: 'Pipelining Speedup & Efficiency',
          detail: 'Speedup S_k = (n * k) / (k + n - 1 + Stalls)\nThroughput = n / [ (k + n - 1 + Stalls) * Clock_Cycle_Time ]',
          priority: 'Important'
        }
      ],
      examTimeAllocationStrategy: {
        readingTimeMinutes: 15,
        sections: [
          {
            sectionName: 'Section A: IEEE 754 & Addressing Modes (5 Qs x 4m)',
            marks: 20,
            allocatedMinutes: 25,
            tip: 'Perform binary normalization carefully. Keep hexadecimal groups clean.'
          },
          {
            sectionName: 'Section B: Booths Algorithm & Pipeline Timing (3 Qs x 12m)',
            marks: 36,
            allocatedMinutes: 65,
            tip: 'Construct clear ruled table for Booths 5 cycles. Show register bits column by column.'
          },
          {
            sectionName: 'Section C: Cache Architecture & AMAT Numerical (2 Qs x 22m)',
            marks: 44,
            allocatedMinutes: 65,
            tip: 'Show formula for tag bit count and AMAT hierarchy before plugging in numerical values.'
          }
        ],
        revisionBufferMinutes: 10,
        strategyNotes: 'Verify sign bits in Booths multiplication and check that L2 miss rate in AMAT formula is local miss rate.'
      },
      flashcards: [
        {
          front: 'What is the difference between Direct Mapped and 4-Way Set Associative cache?',
          back: 'Direct Mapped: Each memory block maps to exactly ONE specific cache line (Set = block_addr mod lines). High conflict misses.\n4-Way Set Associative: Each memory block can reside in any of the 4 lines within its designated set. Significantly lower conflict misses.',
          category: 'Memory Hierarchy',
          difficulty: 'Easy'
        },
        {
          front: 'What is a RAW hazard and can Operand Forwarding eliminate it completely?',
          back: 'RAW (Read-After-Write) occurs when instruction j tries to read a register before instruction i writes it. Forwarding eliminates stalls for ALU-to-ALU dependencies, but CANNOT eliminate the 1-cycle stall in a Load-Use dependency.',
          category: 'Pipelining',
          difficulty: 'Medium'
        },
        {
          front: 'Why is Booths algorithm superior to standard unsigned shift-and-add multiplication?',
          back: 'Booths algorithm handles signed negative numbers in 2s complement naturally without sign magnitude conversion, and skips shifts across strings of consecutive 1s, reducing the average number of arithmetic operations.',
          category: 'ALU Arithmetic',
          difficulty: 'Medium'
        },
        {
          front: 'What is the difference between DMA Cycle Stealing and Burst Mode?',
          back: 'Cycle Stealing: DMA takes control of the system bus for 1 memory cycle per transfer, interleaving with CPU execution.\nBurst Mode: DMA locks and holds the bus for the entire block transfer, completely pausing CPU access to RAM until finished.',
          category: 'I/O Subsystems',
          difficulty: 'Hard'
        }
      ]
    }
  },
  {
    id: 'cs-toc',
    code: 'CS-310',
    name: 'Theory of Computation & Automata Theory',
    category: 'Computer Science & Engineering',
    examDate: '2026-10-28',
    totalMarks: 100,
    durationMinutes: 180,
    targetScore: 92,
    syllabusSnippet: 'Deterministic & Non-deterministic Finite Automata (DFA/NFA), Regular Expressions, Pumping Lemma for Regular Languages, Context-Free Grammars (CFG), Pushdown Automata (PDA), Chomsky Normal Form (CNF), CYK Algorithm, Turing Machines, Halting Problem & Undecidability, Chomsky Hierarchy.',
    pyqSnippet: 'NFA to DFA subset construction, Pumping lemma proof for L = {0^n 1^n}, PDA design for balanced parentheses, Converting CFG to Chomsky Normal Form (CNF), Turing machine for L = {a^n b^n c^n}, Halting problem proof by diagonalization.',
    analysis: {
      summary: 'Automata Theory (TOC) exams are strictly mathematical and proof-driven. Over 70% of marks come from state transition tables, formal Pumping Lemma contradiction proofs, and Turing Machine state diagrams. Evaluators require formal 5-tuple and 7-tuple specifications.',
      highYieldTopics: [
        {
          title: 'Finite Automata (NFA to DFA) & State Minimization',
          moduleOrUnit: 'Unit 1: Regular Languages & Finite Automata',
          estimatedWeightagePercent: 26,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Medium',
          recommendedHours: 8,
          whyHighYield: 'Standard 16-mark problem requiring NFA to DFA conversion via Subset Construction (epsilon-closure), followed by DFA state minimization using the Myhill-Nerode Table-Filling (Equivalence Partitioning) algorithm.',
          mustMasterConcepts: [
            'Epsilon-closure computation and subset construction transition table',
            'Myhill-Nerode table-filling method: mark pairs (p, q) where one is accepting and other is non-accepting',
            'Conversion of Regular Expression to DFA via Arden\'s Theorem: R = Q + RP -> R = QP*'
          ]
        },
        {
          title: 'Pumping Lemma Proofs (Regular & Context-Free)',
          moduleOrUnit: 'Unit 2: Non-Regularity Proofs',
          estimatedWeightagePercent: 24,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 9,
          whyHighYield: 'Mandatory 10-mark formal proof showing that languages such as L = {0^n 1^n | n >= 0}, L = {a^p | p is prime}, or L = {w w | w in {0,1}*} are NOT regular using the adversary argument.',
          mustMasterConcepts: [
            '3 conditions of Pumping Lemma: s = x y z such that |y| > 0, |x y| <= p, and for all i >= 0, x y^i z in L',
            'Selecting the string s = 0^p 1^p that depends on pumping length p',
            'Showing that pumping y (for i=0 or i=2) produces a contradiction in 0/1 counts'
          ]
        },
        {
          title: 'Pushdown Automata (PDA) & Context-Free Grammars',
          moduleOrUnit: 'Unit 3: Context-Free Languages',
          estimatedWeightagePercent: 22,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 8,
          whyHighYield: 'Designing a Pushdown Automaton (PDA) by final state or empty stack for languages like L = {w c w^R} or balanced parentheses, plus converting a CFG into Chomsky Normal Form (CNF).',
          mustMasterConcepts: [
            '7-tuple specification of PDA: (Q, Sigma, Gamma, delta, q0, Z0, F)',
            'Chomsky Normal Form (CNF) 4-step conversion: eliminate epsilon-productions, eliminate unit productions (A -> B), eliminate useless symbols, convert to A -> BC or A -> a',
            'Deterministic PDA (DPDA) vs Non-Deterministic PDA (NPDA) language expressiveness (DPDA is strictly weaker)'
          ]
        },
        {
          title: 'Turing Machines (TM) Design & Computation',
          moduleOrUnit: 'Unit 4: Turing Machines & Computability',
          estimatedWeightagePercent: 16,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Challenging',
          recommendedHours: 6,
          whyHighYield: 'Designing the state transition diagram and transition table of a standard Turing Machine for L = {a^n b^n c^n | n >= 1} or unary arithmetic (multiplication / subtraction).',
          mustMasterConcepts: [
            'Turing Machine 7-tuple: (Q, Sigma, Gamma, delta, q0, B, F) where delta: Q x Gamma -> Q x Gamma x {L, R}',
            'Instantaneous Description (ID) sequence tracing input acceptance step-by-step',
            'Turing Recognizable (Recursively Enumerable) vs Turing Decidable (Recursive) languages'
          ]
        },
        {
          title: 'Decidability, Halting Problem & Chomsky Hierarchy',
          moduleOrUnit: 'Unit 5: Undecidability & Complexity',
          estimatedWeightagePercent: 12,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Medium',
          recommendedHours: 4,
          whyHighYield: 'Proof of undecidability of the Halting Problem via Cantors Diagonalization / contradiction, Post Correspondence Problem (PCP), and Chomsky Hierarchy classification.',
          mustMasterConcepts: [
            'Halting Problem formal proof: constructing Turing machine H and inverted machine D(D) to prove contradiction',
            'Post Correspondence Problem (PCP) and Modified PCP undecidability',
            'Chomsky Hierarchy: Type 3 (Regular) < Type 2 (Context-Free) < Type 1 (Context-Sensitive) < Type 0 (Unrestricted)'
          ]
        }
      ],
      importantQuestions: [
        {
          id: 'toc-q1',
          questionText: 'State the Pumping Lemma for Regular Languages. Using it, prove by contradiction that the language L = { 0^n 1^n | n >= 0 } is not regular.',
          type: 'Long / Essay (12-20m)',
          expectedMarks: 12,
          frequencyPastYears: 'Appeared in almost every semester exam (2020, 2021, 2022, 2023, 2024)',
          coreKeywordsRequired: ['Pumping Length p', 'Decomposition s = xyz', '|xy| <= p', '|y| > 0', 'Pumping Condition xy^i z in L', 'Contradiction'],
          markingSchemeSteps: [
            'Formal statement of Pumping Lemma with all 3 conditions (3 Marks)',
            'Assume L is regular -> exists pumping length p (1 Mark)',
            'Choose string s = 0^p 1^p in L, noting |s| = 2p >= p (2 Marks)',
            'Analyze decomposition s = xyz where |xy| <= p forces y to consist exclusively of 0s (y = 0^k where k >= 1) (3 Marks)',
            'Pump with i = 2 or i = 0 to show xy^2 z = 0^(p+k) 1^p has unequal 0s and 1s, violating L -> Contradiction! (3 Marks)'
          ],
          modelAnswerOutline: '1. State theorem: If L is regular, exists p such that any s in L with |s|>=p can be written s=xyz with |xy|<=p, |y|>0, and xy^i z in L for all i>=0. 2. Assume L is regular. Let p be pumping length. 3. Select string s = 0^p 1^p. Clearly s in L and |s| = 2p >= p. 4. Since |xy| <= p, x and y must consist solely of 0s. Let x = 0^r, y = 0^k (k >= 1), z = 0^(p - r - k) 1^p. 5. Consider i = 2: xy^2 z = 0^(p+k) 1^p. Since k >= 1, the number of 0s is p + k != p (number of 1s). Thus xy^2 z is NOT in L, contradicting the Pumping Lemma. Hence, L is not regular.',
          commonStudentMistakes: 'Choosing a fixed string (e.g. 0^5 1^5) instead of an arbitrary string parameterized by the pumping length p.'
        },
        {
          id: 'toc-q2',
          questionText: 'Convert the following Context-Free Grammar G into Chomsky Normal Form (CNF):\nS -> a A b | B A\nA -> b B | epsilon\nB -> S A | a',
          type: 'Medium Answer (6-10m)',
          expectedMarks: 10,
          frequencyPastYears: 'Repeated 4 out of last 5 years',
          coreKeywordsRequired: ['Chomsky Normal Form', 'Epsilon Elimination', 'Unit Production Elimination', 'Useless Symbol Removal', 'CNF Production Format (A -> BC or A -> a)'],
          markingSchemeSteps: [
            'Step 1: Eliminate epsilon productions (nullable variable A -> epsilon) (3 Marks)',
            'Step 2: Eliminate unit productions (if any) (2 Marks)',
            'Step 3: Eliminate useless / unreachable symbols (2 Marks)',
            'Step 4: Introduce terminal variables and decompose productions with > 2 variables into pairs (3 Marks)'
          ],
          modelAnswerOutline: '1. Nullable variable is A. Eliminate A -> epsilon: S -> aAb | ab | BA | B; B -> SA | S | a. 2. Eliminate unit productions: S -> B (replace with B productions: SA | S | a) and B -> S. 3. Eliminate cycles and clean productions. 4. Introduce Xa -> a, Xb -> b. Replace: S -> Xa C1 where C1 -> A Xb, S -> Xa Xb. All productions conform to A -> BC or A -> a.',
          commonStudentMistakes: 'Forgetting to substitute epsilon into ALL occurrences of the nullable variable, especially when a production contains multiple instances of it.'
        },
        {
          id: 'toc-q3',
          questionText: 'Design a Turing Machine that accepts the language L = { a^n b^n c^n | n >= 1 }. Provide the complete state transition diagram, transition table, and trace the instantaneous description (ID) sequence for the input string "aabbcc".',
          type: 'Long / Essay (12-20m)',
          expectedMarks: 16,
          frequencyPastYears: 'Featured in 2021, 2023, 2024 university examinations',
          coreKeywordsRequired: ['Turing Machine', 'Tape Alphabet {a, b, c, X, Y, Z, B}', 'Transition Function delta', 'Instantaneous Description (ID)', 'Halting State'],
          markingSchemeSteps: [
            'Clear algorithmic logic: replace an \'a\' with X, scan right to replace first \'b\' with Y, scan right to replace first \'c\' with Z, return left (4 Marks)',
            'Complete state transition table showing delta(q, symbol) -> (next_q, write_symbol, Direction) (5 Marks)',
            'Neat state transition diagram with states q0 to q4, q_accept, q_reject (4 Marks)',
            'Step-by-step Instantaneous Description trace for "aabbcc" terminating in accept state (3 Marks)'
          ],
          modelAnswerOutline: 'q0: Read \'a\', write X, move R -> q1. q1: Skip \'a\'s and \'Y\'s. Read \'b\', write Y, move R -> q2. q2: Skip \'b\'s and \'Z\'s. Read \'c\', write Z, move L -> q3. q3: Scan left over \'a\', \'b\', \'Z\', \'Y\' until \'X\' is found. Move R -> q0. Repeat cycle. When q0 reads \'Y\', transition to q4 to verify only Ys and Zs remain, then reach q_accept.',
          commonStudentMistakes: 'Forgetting to handle the verification phase where all original \'a\'s, \'b\'s, and \'c\'s have been successfully crossed out, allowing stray extra letters to pass.'
        }
      ],
      keyFormulasAndDiagrams: [
        {
          title: 'Pumping Lemma for Regular Languages Invariant',
          detail: 'For any regular language L with pumping length p, every string s in L with |s| >= p can be split into s = xyz such that:\n1. |y| > 0\n2. |xy| <= p\n3. For all i >= 0, x y^i z in L',
          priority: 'Critical'
        },
        {
          title: 'Chomsky Hierarchy Classification',
          detail: 'Type 0: Unrestricted Grammar -> Turing Machine\nType 1: Context-Sensitive Grammar (alpha -> beta, |alpha| <= |beta|) -> Linear Bounded Automaton\nType 2: Context-Free Grammar (A -> alpha) -> Pushdown Automaton\nType 3: Regular Grammar (A -> aB or A -> a) -> Finite Automaton',
          priority: 'Critical'
        },
        {
          title: 'Chomsky Normal Form (CNF) Format',
          detail: 'Every production must be of the form:\nA -> B C  (where B, C in Non-terminals - {Start})\nOR\nA -> a    (where a in Terminals)\n(S -> epsilon allowed if epsilon in L)',
          priority: 'Critical'
        }
      ],
      examTimeAllocationStrategy: {
        readingTimeMinutes: 15,
        sections: [
          {
            sectionName: 'Section A: Automata Definitions & Language Closure (5 Qs x 4m)',
            marks: 20,
            allocatedMinutes: 25,
            tip: 'State closure properties and draw crisp 3-state DFAs.'
          },
          {
            sectionName: 'Section B: Pumping Lemma Proof & CNF Conversion (3 Qs x 12m)',
            marks: 36,
            allocatedMinutes: 65,
            tip: 'Write Pumping Lemma proof in standard 5-step academic mathematical format.'
          },
          {
            sectionName: 'Section C: Turing Machine & PDA Design (2 Qs x 22m)',
            marks: 44,
            allocatedMinutes: 65,
            tip: 'Draw large state bubbles with clearly labeled transition arrows: (Read, Write, Direction).'
          }
        ],
        revisionBufferMinutes: 10,
        strategyNotes: 'Verify all DFA states have outgoing transitions for every alphabet symbol. Check that stack alphabet symbols are popped cleanly in PDA.'
      },
      flashcards: [
        {
          front: 'What are the 3 conditions of the Pumping Lemma for Regular Languages?',
          back: '1. |y| > 0 (y is non-empty)\n2. |xy| <= p (the pumpable part occurs within the first p characters)\n3. For all i >= 0, xy^i z in L (pumping y any number of times produces a string in L)',
          category: 'Regular Languages',
          difficulty: 'Easy'
        },
        {
          front: 'Is the set of Context-Free Languages closed under Intersection and Complement?',
          back: 'NO! CFLs are NOT closed under intersection or complementation. (They are closed under Union, Concatenation, and Kleene Star).',
          category: 'Closure Properties',
          difficulty: 'Medium'
        },
        {
          front: 'What does the Halting Problem prove?',
          back: 'It proves that there cannot exist a general algorithm (Turing Machine) that can determine for ANY arbitrary program and input whether the program will eventually halt or run forever. (Proved via diagonal contradiction).',
          category: 'Decidability',
          difficulty: 'Hard'
        }
      ]
    }
  }
];

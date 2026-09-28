import { SemesterSubject } from '../types/exam';
import { CS_ENGINEERING_SUBJECTS } from './csSubjects';

export const DEFAULT_SUBJECTS: SemesterSubject[] = [
  ...CS_ENGINEERING_SUBJECTS,
  {
    id: 'cs-os',
    code: 'CS-302',
    name: 'Operating Systems & Systems Programming',
    category: 'Computer Science & Engineering',
    examDate: '2026-10-18',
    totalMarks: 100,
    durationMinutes: 180,
    targetScore: 92,
    syllabusSnippet: 'Processes, Threads, CPU Scheduling, Synchronization, Deadlocks, Memory Management, Virtual Memory, File Systems, I/O Subsystems.',
    pyqSnippet: 'Bankers Algorithm (Repeated 4/5 yrs), Paging vs Segmentation, Peterson Algorithm, Page Replacement (LRU/FIFO/Belady), Semaphore implementation.',
    analysis: {
      summary: 'Operating Systems exams follow a rigorous 70/30 weightage: 70% is driven by Process Synchronization (Deadlocks/Semaphores), Virtual Memory (Page tables, TLB, Page replacement algorithms), and CPU Scheduling. Evaluators penalize vague text; full marks require clean ASCII/box architecture diagrams, formula definitions, and step-by-step matrix traces.',
      highYieldTopics: [
        {
          title: 'Virtual Memory & Page Replacement',
          moduleOrUnit: 'Unit 4: Memory Management',
          estimatedWeightagePercent: 28,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 9,
          whyHighYield: 'Guaranteed 16-mark numerical question on Page Fault computation (FIFO, LRU, Optimal) plus TLB effective access time (EAT) derivation.',
          mustMasterConcepts: [
            'Effective Access Time (EAT) formula: EAT = (1 - p) * ma + p * page_fault_service_time',
            'Beladys Anomaly condition and FIFO page fault proof',
            'Two-level Hierarchical Paging address translation mechanism'
          ]
        },
        {
          title: 'Process Synchronization & Classical IPC Problems',
          moduleOrUnit: 'Unit 2: Process Concurrency',
          estimatedWeightagePercent: 24,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 8,
          whyHighYield: 'Every semester question paper features either Dining Philosophers, Producer-Consumer with bounded buffer, or Readers-Writers synchronization problem.',
          mustMasterConcepts: [
            'Counting vs Binary Semaphores (wait/signal atomic primitives)',
            'Petersons Solution: 3 correctness criteria (Mutual Exclusion, Progress, Bounded Waiting)',
            'Monitor constructs and condition variables (wait/signal)'
          ]
        },
        {
          title: 'Deadlock Characterization & Bankers Algorithm',
          moduleOrUnit: 'Unit 3: Deadlocks',
          estimatedWeightagePercent: 20,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Medium',
          recommendedHours: 6,
          whyHighYield: 'Standard 12 to 16-mark computational problem testing safety state, Need matrix computation, and request-resource algorithm.',
          mustMasterConcepts: [
            '4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait',
            'Need Matrix equation: Need[i][j] = Max[i][j] - Allocation[i][j]',
            'Resource Allocation Graph (RAG) cycle detection rules'
          ]
        },
        {
          title: 'CPU Scheduling Algorithms & Gantt Charts',
          moduleOrUnit: 'Unit 1: Process Management',
          estimatedWeightagePercent: 16,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Easy',
          recommendedHours: 5,
          whyHighYield: 'Reliable 10-mark scoring question. High accuracy guarantees 100% of awarded marks with minimal subjective evaluator bias.',
          mustMasterConcepts: [
            'Turnaround Time = Completion Time - Arrival Time',
            'Waiting Time = Turnaround Time - Burst Time',
            'Preemptive Shortest Remaining Time First (SRTF) and Round Robin context switch penalties'
          ]
        },
        {
          title: 'File System Implementation & Disk Scheduling',
          moduleOrUnit: 'Unit 5: Storage Architecture',
          estimatedWeightagePercent: 12,
          recurrenceProbability: 'Moderate (50-74%)',
          difficulty: 'Medium',
          recommendedHours: 4,
          whyHighYield: 'Common Part B question comparing FCFS, SSTF, SCAN, and C-SCAN head movement metrics.',
          mustMasterConcepts: [
            'Indexed allocation vs Inode structures (Direct, Single indirect, Double indirect blocks)',
            'Disk arm head movement calculation across track requests',
            'RAID levels (RAID 0, 1, 5 striping and parity)'
          ]
        }
      ],
      importantQuestions: [
        {
          id: 'os-q1',
          questionText: 'Explain the Bankers Algorithm for Deadlock Avoidance. A system has 5 processes (P0-P4) and 3 resource types (A:10, B:5, C:7). Given current Allocation and Max matrices, determine if the system is currently in a safe state. If process P1 makes a request (1, 0, 2), can it be granted immediately?',
          type: 'Long / Essay (12-20m)',
          expectedMarks: 16,
          frequencyPastYears: 'Featured in 4 out of last 5 semester exams (2021, 2022, 2023, 2024)',
          coreKeywordsRequired: ['Safe State', 'Need Matrix Formula', 'Work & Finish Arrays', 'Resource Request Algorithm', 'Safe Sequence'],
          markingSchemeSteps: [
            'Step 1: Compute Need Matrix Need = Max - Allocation (3 Marks)',
            'Step 2: Initialize Work = Available, Finish[i] = false. Step-by-step trace showing Work update (Work = Work + Allocation) (6 Marks)',
            'Step 3: State final safe sequence <P1, P3, P4, P0, P2> and conclude safety (3 Marks)',
            'Step 4: Evaluate Request <= Need and Request <= Available for P1, simulate hypothetical state and re-verify safety (4 Marks)'
          ],
          modelAnswerOutline: '1. State formula: Need[i][j] = Max[i][j] - Allocation[i][j]. 2. Present clean tabular matrix of Need. 3. Show step-by-step execution: "Process P1 finishes: Work becomes [X, Y, Z]". 4. List exact safe sequence in angle brackets. 5. Show P1 request check: 1<=1, 0<=2, 2<=2 (granted), updated Available becomes [2, 3, 0], re-run safety check.',
          commonStudentMistakes: 'Students often fail to add the Allocated resources back into the Available vector when a process completes, causing incorrect safety determination and lost marks.'
        },
        {
          id: 'os-q2',
          questionText: 'Compare Paging and Segmentation memory management schemes across 6 distinct parameters. Also explain how the Translation Lookaside Buffer (TLB) speeds up virtual address translation with a neat diagram.',
          type: 'Medium Answer (6-10m)',
          expectedMarks: 10,
          frequencyPastYears: 'Appeared 5 times in past 6 exams',
          coreKeywordsRequired: ['Internal Fragmentation', 'External Fragmentation', 'TLB Hit Ratio', 'Page Table Base Register (PTBR)', 'Effective Access Time'],
          markingSchemeSteps: [
            'Parametric comparison table: Unit size, Fragmentation type, Hardware overhead, Programmer visibility, Protection, Sharing (5 Marks)',
            'Architecture diagram of TLB + Page Table address translation (3 Marks)',
            'Effective Access Time (EAT) calculation formula (2 Marks)'
          ],
          modelAnswerOutline: 'Use a structured table with 6 rows. Below table, draw CPU -> Virtual Address (Page #, Offset) -> TLB check. If hit, get Frame #; if miss, query Page Table in RAM, update TLB. Write equation: EAT = h * (t_tlb + t_ram) + (1 - h) * (t_tlb + 2 * t_ram).',
          commonStudentMistakes: 'Writing free-form paragraphs instead of a structured comparison table; forgetting that a TLB miss requires TWO memory lookups.'
        },
        {
          id: 'os-q3',
          questionText: 'Define the Critical Section Problem. Present Petersons Algorithm for two-process mutual exclusion and formally prove how it satisfies Mutual Exclusion, Progress, and Bounded Waiting.',
          type: 'Derivation / Proof',
          expectedMarks: 10,
          frequencyPastYears: 'Repeated in 2020, 2022, 2023 semester papers',
          coreKeywordsRequired: ['Mutual Exclusion', 'Progress', 'Bounded Waiting', 'flag[i]', 'turn variable', 'Race Condition'],
          markingSchemeSteps: [
            'Definition of 3 critical conditions (3 Marks)',
            'Clean C/pseudo-code entry and exit sections (3 Marks)',
            'Formal mathematical/logical proof of mutual exclusion through contradiction (4 Marks)'
          ],
          modelAnswerOutline: 'Define: Entry section, Critical section, Exit section. Write code: "flag[i] = true; turn = j; while(flag[j] && turn == j); /* CS */ flag[i] = false;". Prove mutual exclusion: suppose both in CS -> flag[0]=true and flag[1]=true, but turn cannot be both 0 and 1 simultaneously.',
          commonStudentMistakes: 'Overlooking the bounded waiting criterion or writing pseudo-code without explaining how turn prevents deadlocks.'
        },
        {
          id: 'os-q4',
          questionText: 'Given the page reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1 with 3 page frames, calculate the number of page faults using (a) FIFO, (b) LRU, and (c) Optimal Page Replacement.',
          type: 'Numerical / Problem Solving',
          expectedMarks: 12,
          frequencyPastYears: 'Compulsory numerical question in every second semester exam',
          coreKeywordsRequired: ['Page Hit', 'Page Fault Ratio', 'FIFO Queue', 'Stack Algorithm', 'Lookahead Oracle'],
          markingSchemeSteps: [
            'Complete step-by-step frame state table for FIFO with total page faults (4 Marks)',
            'Complete step-by-step frame state table for LRU with total page faults (4 Marks)',
            'Complete frame state table for Optimal Replacement with total page faults (4 Marks)'
          ],
          modelAnswerOutline: 'Draw three clear grids (3 rows x 20 columns). Clearly mark each column with "Hit" or "Fault (F)". Provide summary line: "Total Faults: FIFO = 15, LRU = 12, Optimal = 9. Fault Rate = X%".',
          commonStudentMistakes: 'Neglecting to count initial cold/compulsory misses into total fault count.'
        },
        {
          id: 'os-q5',
          questionText: 'What is a Race Condition? Explain how counting semaphores solve the Producer-Consumer problem using pseudocode, clearly showing the role of mutex, empty, and full semaphores.',
          type: 'Medium Answer (6-10m)',
          expectedMarks: 8,
          frequencyPastYears: 'Repeated 3 times in past 4 years',
          coreKeywordsRequired: ['Atomic Operation', 'Semaphore wait/signal (P/V)', 'Mutex', 'Buffer Overflow / Underflow'],
          markingSchemeSteps: [
            'Definition and example of race condition (2 Marks)',
            'Semaphore initialization: mutex=1, empty=N, full=0 (2 Marks)',
            'Producer code and Consumer code with correct wait/signal order (4 Marks)'
          ],
          modelAnswerOutline: 'Show code with comments. Highlight crucial point: wait(empty) MUST precede wait(mutex) to prevent deadlocks when the buffer is full.',
          commonStudentMistakes: 'Reversing wait(mutex) and wait(empty), which introduces a fatal deadlock condition.'
        },
        {
          id: 'os-q6',
          questionText: 'Explain the Inode data structure in Unix file systems. If a block size is 4KB and block pointers are 4 bytes, calculate the maximum file size supported by an Inode with 12 direct, 1 single indirect, 1 double indirect, and 1 triple indirect pointers.',
          type: 'Numerical / Problem Solving',
          expectedMarks: 10,
          frequencyPastYears: 'Appeared in 2022 and 2024 university examinations',
          coreKeywordsRequired: ['Inode Structure', 'Direct Blocks', 'Single Indirect', 'Double Indirect', 'Triple Indirect'],
          markingSchemeSteps: [
            'Inode component diagram showing direct and indirect pointers (3 Marks)',
            'Calculating pointers per block: 4096 / 4 = 1024 pointers (2 Marks)',
            'Calculating capacity for each indirect tier and summing total maximum file size in Terabytes (5 Marks)'
          ],
          modelAnswerOutline: '1. Direct: 12 * 4KB = 48KB. 2. Single indirect: 1024 * 4KB = 4MB. 3. Double indirect: 1024^2 * 4KB = 4GB. 4. Triple indirect: 1024^3 * 4KB = 4TB. Total max file size ≈ 4.004 TB.',
          commonStudentMistakes: 'Forgetting to convert bytes to KB/MB/GB/TB or miscalculating block pointers per disk block.'
        }
      ],
      keyFormulasAndDiagrams: [
        {
          title: 'Effective Memory Access Time (EAT) with TLB',
          detail: 'EAT = Hit_Ratio * (t_tlb + t_mem) + (1 - Hit_Ratio) * (t_tlb + 2 * t_mem)',
          priority: 'Critical'
        },
        {
          title: 'Need Matrix Equation (Bankers Algorithm)',
          detail: 'Need[i][j] = Max[i][j] - Allocation[i][j] (where Allocation[i][j] <= Max[i][j])',
          priority: 'Critical'
        },
        {
          title: 'Process State Transition Diagram',
          detail: 'Five-state lifecycle: New -> [admitted] -> Ready <-> [scheduler dispatch / interrupt] -> Running -> [exit] -> Terminated. Waiting loop on I/O.',
          priority: 'Critical'
        },
        {
          title: 'Turnaround Time & Waiting Time Metrics',
          detail: 'TAT = Completion_Time - Arrival_Time; WT = TAT - Burst_Time',
          priority: 'Important'
        },
        {
          title: 'Petersons Algorithm Invariant Code Structure',
          detail: 'flag[i] = true; turn = j; while(flag[j] && turn == j); /* Critical Section */ flag[i] = false;',
          priority: 'Important'
        }
      ],
      examTimeAllocationStrategy: {
        readingTimeMinutes: 15,
        sections: [
          {
            sectionName: 'Section A: Compulsory Short Questions (5 Qs x 4m)',
            marks: 20,
            allocatedMinutes: 30,
            tip: 'Target 6 minutes per question. Write precise definitions and standard formula lines without preamble.'
          },
          {
            sectionName: 'Section B: Medium Analytical & Comparison (4 Qs x 10m)',
            marks: 40,
            allocatedMinutes: 65,
            tip: 'Spend ~16 mins per question. Dedicate 4 mins to ruled comparative tables or architecture schematics.'
          },
          {
            sectionName: 'Section C: Comprehensive Derivation & Bankers Numerical (2 Qs x 20m)',
            marks: 40,
            allocatedMinutes: 60,
            tip: 'Spend 30 mins each. Start on fresh page. Write out matrix calculations row by row to prevent arithmetic slip-ups.'
          }
        ],
        revisionBufferMinutes: 15,
        strategyNotes: 'First 15 mins: verify which optional questions in Part B & C you can solve with zero hesitation. Last 15 mins: re-verify CPU scheduling Gantt chart sums and page fault totals.'
      },
      flashcards: [
        {
          front: 'What are the 4 Coffman conditions for Deadlock?',
          back: '1. Mutual Exclusion (non-shareable resources)\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\n(All 4 must hold simultaneously for a deadlock to exist)',
          category: 'Core Definition',
          difficulty: 'Easy'
        },
        {
          front: 'What causes Beladys Anomaly and in which algorithm does it occur?',
          back: 'Occurs in FIFO page replacement where adding more page frames causes MORE page faults due to non-stack queue behavior.',
          category: 'Exam Trap',
          difficulty: 'Medium'
        },
        {
          front: 'Formula for Effective Access Time (EAT) with TLB?',
          back: 'EAT = h * (t_tlb + t_mem) + (1 - h) * (t_tlb + 2 * t_mem)\nwhere h = TLB hit ratio',
          category: 'Formula',
          difficulty: 'Medium'
        },
        {
          front: 'Difference between Hard and Soft Page Fault?',
          back: 'Hard: Page not in physical RAM, must fetch from disk (slow millisecond latency).\nSoft: Page in memory but not mapped in process page table (fast microsecond latency).',
          category: 'Distinction',
          difficulty: 'Medium'
        },
        {
          front: 'How does Banker\'s Algorithm determine if a state is Safe?',
          back: 'Finds an ordering of processes P0..Pn such that for each Pi, its remaining Need <= Work (current available resources). If all processes can terminate, state is Safe.',
          category: 'Algorithm',
          difficulty: 'Hard'
        }
      ]
    }
  },
  {
    id: 'cs-dsa',
    code: 'CS-201',
    name: 'Data Structures & Algorithms',
    category: 'Computer Science',
    examDate: '2026-10-22',
    totalMarks: 100,
    durationMinutes: 180,
    targetScore: 95,
    syllabusSnippet: 'Asymptotic Analysis, Stacks, Queues, Linked Lists, Trees, AVL & Red-Black Trees, Graphs, Dijkstra, MST, Dynamic Programming, Greedy, Hashing.',
    pyqSnippet: 'AVL Tree Rotations, Dijkstra Algorithm trace, QuickSort vs MergeSort recurrence, 0/1 Knapsack DP table, Bellman-Ford negative cycle.',
    analysis: {
      summary: 'DSA semester examinations focus heavily on rigorous proof of complexities, tree rebalancing rotations, graph traversal traces, and Dynamic Programming tables. Over 60% of marks are awarded for dry-run tables, recursion trees, and edge case complexity analysis.',
      highYieldTopics: [
        {
          title: 'Dynamic Programming & Memoization',
          moduleOrUnit: 'Unit 4: Advanced Algorithm Paradigms',
          estimatedWeightagePercent: 26,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 10,
          whyHighYield: 'Standard 15-mark essay question on 0/1 Knapsack, Longest Common Subsequence (LCS), or Matrix Chain Multiplication with state transition formula.',
          mustMasterConcepts: [
            'Optimal substructure and overlapping subproblems characterization',
            'State recurrence formula formulation (e.g. DP[i][j])',
            'Backtracking along DP matrix to reconstruct solution path'
          ]
        },
        {
          title: 'Balanced Search Trees (AVL & B-Trees)',
          moduleOrUnit: 'Unit 3: Hierarchical Structures',
          estimatedWeightagePercent: 22,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Medium',
          recommendedHours: 7,
          whyHighYield: 'Evaluators love step-by-step tree insertion questions showing balance factors and single/double rotations (LL, RR, LR, RL).',
          mustMasterConcepts: [
            'Balance Factor definition: Height(Left) - Height(Right) in {-1, 0, +1}',
            'Double rotation decomposition: LR = Left on child + Right on parent',
            'B-Tree node splitting and root elevation rules'
          ]
        },
        {
          title: 'Graph Shortest Paths & Minimum Spanning Trees',
          moduleOrUnit: 'Unit 5: Graph Theory & Algorithms',
          estimatedWeightagePercent: 20,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Medium',
          recommendedHours: 7,
          whyHighYield: 'Traced execution of Dijkstras Algorithm, Bellman-Ford, Kruskals with Disjoint Set Union (DSU), or Prims MST.',
          mustMasterConcepts: [
            'Dijkstras greedy relaxation: if dist[u] + w < dist[v] then dist[v] = dist[u] + w',
            'Kruskals edge sorting + Union-Find cycle check (Rank & Path Compression)',
            'Bellman-Ford relaxation for |V|-1 iterations and negative cycle detection'
          ]
        },
        {
          title: 'Divide & Conquer Recurrences & Sorting Bounds',
          moduleOrUnit: 'Unit 1: Foundations & Analysis',
          estimatedWeightagePercent: 18,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Easy',
          recommendedHours: 5,
          whyHighYield: 'Master Theorem proofs and step-by-step QuickSort / MergeSort tree execution.',
          mustMasterConcepts: [
            'Master Theorem 3 cases for T(n) = aT(n/b) + f(n)',
            'QuickSort worst-case degenerate tree T(n) = T(n-1) + O(n)',
            'Lower bound of comparison-based sorting: Omega(n log n) via decision trees'
          ]
        },
        {
          title: 'Hashing Techniques & Collision Resolution',
          moduleOrUnit: 'Unit 2: Linear Data Structures',
          estimatedWeightagePercent: 14,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Easy',
          recommendedHours: 4,
          whyHighYield: 'Short and medium questions comparing Linear Probing, Quadratic Probing, and Double Hashing clustering effects.',
          mustMasterConcepts: [
            'Load Factor alpha = n / m and its effect on average search time',
            'Primary clustering vs Secondary clustering definitions',
            'Double Hashing probe sequence: h(k, i) = (h1(k) + i * h2(k)) mod m'
          ]
        }
      ],
      importantQuestions: [
        {
          id: 'dsa-q1',
          questionText: 'Insert the following sequence of keys into an initially empty AVL Tree: 14, 17, 11, 7, 53, 4, 13, 12, 8, 60. Show the balance factors for each node after every insertion and specify the exact type of rotation performed whenever an imbalance occurs.',
          type: 'Long / Essay (12-20m)',
          expectedMarks: 16,
          frequencyPastYears: 'Featured in almost every semester exam (Winter 2021, 2022, 2023, 2024)',
          coreKeywordsRequired: ['Balance Factor (-1, 0, 1)', 'LL Rotation', 'RR Rotation', 'LR Rotation', 'RL Rotation'],
          markingSchemeSteps: [
            'Correct tree drawing and balance factor calculation for initial insertions (4 Marks)',
            'Identifying first imbalance and executing correct rotation (4 Marks)',
            'Subsequent insertions with detailed intermediate tree sketches (5 Marks)',
            'Final balanced AVL tree with all correct balance factors labeled (3 Marks)'
          ],
          modelAnswerOutline: 'Draw the tree after each key is inserted. Write: "Inserting 4 causes imbalance at node 11 with BF=+2 (Left-Left condition) -> perform Right Rotation (LL) at node 11". Label balance factor next to every single node: e.g. "14 (BF: 0)".',
          commonStudentMistakes: 'Not drawing intermediate trees after rotation or failing to label balance factors on the final tree nodes.'
        },
        {
          id: 'dsa-q2',
          questionText: 'Find the Longest Common Subsequence (LCS) between strings X = "ABCBDAB" and Y = "BDCABA". (a) State the dynamic programming recurrence relation, (b) construct the complete DP table with directional arrow pointers, and (c) backtrack to find all optimal LCS strings and their lengths.',
          type: 'Numerical / Problem Solving',
          expectedMarks: 12,
          frequencyPastYears: 'Appeared in 4 of last 5 examinations',
          coreKeywordsRequired: ['Optimal Substructure', 'LCS Recurrence Relation', 'DP Table', 'Backtracking Arrows'],
          markingSchemeSteps: [
            'Formal mathematical statement of DP recurrence (3 Marks)',
            'Constructing full 8x7 DP table with lengths and arrow pointers (5 Marks)',
            'Reconstructing optimal subsequence string and length (4 Marks)'
          ],
          modelAnswerOutline: 'State recurrence: if X[i]==Y[j] then c[i,j]=c[i-1,j-1]+1; else max(c[i-1,j], c[i,j-1]). Draw table with strings on headers. Backtrack from bottom-right corner following diagonal arrows. Optimal strings: "BCBA", "BDAB", length = 4.',
          commonStudentMistakes: 'Forgetting to include directional arrows (diagonal, up, left) in the table cells, which evaluators require for marking step points.'
        },
        {
          id: 'dsa-q3',
          questionText: 'Trace Dijkstras Algorithm on the given weighted directed graph with 6 vertices starting from source vertex A. Show the distance table updates at every step. Can Dijkstras algorithm handle negative edge weights? Justify your answer with a counterexample.',
          type: 'Medium Answer (6-10m)',
          expectedMarks: 10,
          frequencyPastYears: 'Appeared in 2021, 2023, 2024',
          coreKeywordsRequired: ['Greedy Choice', 'Relaxation Step', 'Priority Queue / Min-Heap', 'Negative Edge Invalidation'],
          markingSchemeSteps: [
            'Table tracking visited set and distance vector across all iterations (5 Marks)',
            'Final shortest path tree and distance array (2 Marks)',
            'Theoretical proof / counterexample explaining why negative edges fail with greedy selection (3 Marks)'
          ],
          modelAnswerOutline: 'Show a clean table: Columns = Vertices A to F, Rows = Steps 1 to 6. At step k, circle the extracted minimum vertex. For negative edge explanation, draw a 3-vertex triangle: A->B cost 2, A->C cost 5, C->B cost -4. Dijkstra finalizes B with distance 2 too early, missing the shorter path A->C->B with cost 1.',
          commonStudentMistakes: 'Saying negative cycles fail without explaining that Dijkstra fails on ANY negative edge even without cycles.'
        },
        {
          id: 'dsa-q4',
          questionText: 'State Master Theorem for divide-and-conquer recurrences. Using it, find the asymptotic time complexity of: (a) T(n) = 4T(n/2) + n, (b) T(n) = 2T(n/2) + n log n, (c) T(n) = 8T(n/2) + n^3.',
          type: 'Derivation / Proof',
          expectedMarks: 8,
          frequencyPastYears: 'Compulsory Section A question',
          coreKeywordsRequired: ['Master Theorem', 'log_b(a)', 'Polynomially Smaller / Larger', 'Extended Master Theorem'],
          markingSchemeSteps: [
            'Stating all 3 standard cases of Master Theorem with conditions (3 Marks)',
            'Solving part (a) showing a=4, b=2, log2(4)=2, f(n)=O(n^1) -> Case 1: Theta(n^2) (2 Marks)',
            'Solving part (b) showing f(n)=Theta(n log n) -> Extended Case 2: Theta(n log^2 n) (2 Marks)',
            'Solving part (c) showing a=8, b=2, log2(8)=3, f(n)=Theta(n^3) -> Case 2: Theta(n^3 log n) (1 Mark)'
          ],
          modelAnswerOutline: 'State Master Theorem clearly. For each sub-question, write down: a, b, log_b(a), compare with f(n), identify exact case number, and box the final Theta answer.',
          commonStudentMistakes: 'Confusing standard Master Theorem Case 2 with the extended case involving logarithmic factors.'
        }
      ],
      keyFormulasAndDiagrams: [
        {
          title: 'Master Theorem Equation',
          detail: 'T(n) = aT(n/b) + f(n). Compare f(n) to n^(log_b(a)). Case 1: Theta(n^(log_b(a))); Case 2: Theta(n^(log_b(a)) * log^(k+1)(n)); Case 3: Theta(f(n)).',
          priority: 'Critical'
        },
        {
          title: 'AVL Balance Factor Equation',
          detail: 'BF(node) = Height(node.left) - Height(node.right) where valid values are {-1, 0, +1}',
          priority: 'Critical'
        },
        {
          title: '0/1 Knapsack DP State Recurrence',
          detail: 'DP[i][w] = if wt[i-1] <= w then max(val[i-1] + DP[i-1][w-wt[i-1]], DP[i-1][w]) else DP[i-1][w]',
          priority: 'Critical'
        },
        {
          title: 'Dijkstra Relaxation Invariant',
          detail: 'if (dist[u] + weight(u, v) < dist[v]) { dist[v] = dist[u] + weight(u, v); parent[v] = u; }',
          priority: 'Important'
        }
      ],
      examTimeAllocationStrategy: {
        readingTimeMinutes: 15,
        sections: [
          {
            sectionName: 'Section A: Asymptotic Analysis & Definitions (5 Qs x 4m)',
            marks: 20,
            allocatedMinutes: 30,
            tip: 'Direct Big-O proofs and recurrence solutions. No essays.'
          },
          {
            sectionName: 'Section B: Algorithm Traces & Trees (3 Qs x 12m)',
            marks: 36,
            allocatedMinutes: 60,
            tip: 'AVL rotations, Graph traversal tables, DSU operations. Draw large clear node diagrams.'
          },
          {
            sectionName: 'Section C: Dynamic Programming & Proofs (2 Qs x 22m)',
            marks: 44,
            allocatedMinutes: 65,
            tip: 'DP table construction and code outline. Show state recurrence prominently at top of page.'
          }
        ],
        revisionBufferMinutes: 10,
        strategyNotes: 'First 15 mins: check DP problem constraints. Last 10 mins: confirm all tree node balance factors sum to valid range.'
      },
      flashcards: [
        {
          front: 'What are the 4 rotation types in AVL trees and when is each used?',
          back: 'LL: Insert in Left child of Left subtree -> Right rotation\nRR: Insert in Right child of Right subtree -> Left rotation\nLR: Insert in Right child of Left subtree -> Left then Right rotation\nRL: Insert in Left child of Right subtree -> Right then Left rotation',
          category: 'Tree Rotations',
          difficulty: 'Medium'
        },
        {
          front: 'What is the recurrence relation and complexity for MergeSort?',
          back: 'T(n) = 2T(n/2) + O(n)\nComplexity: O(n log n) in all cases (Best, Average, Worst). Auxiliary space: O(n).',
          category: 'Algorithm',
          difficulty: 'Easy'
        },
        {
          front: 'What is the time complexity of Bellman-Ford vs Dijkstra with Fibonacci Heap?',
          back: 'Bellman-Ford: O(V * E)\nDijkstra (Fibonacci Heap): O(E + V log V)\nDijkstra fails on negative edge weights; Bellman-Ford detects negative weight cycles.',
          category: 'Graph Bounds',
          difficulty: 'Hard'
        },
        {
          front: 'What is the optimal substructure property?',
          back: 'A problem exhibits optimal substructure if an optimal solution to the problem contains optimal solutions to its subproblems (prerequisite for Greedy and DP).',
          category: 'Theory',
          difficulty: 'Medium'
        }
      ]
    }
  },
  {
    id: 'eng-math',
    code: 'MATH-201',
    name: 'Engineering Mathematics & Numerical Methods',
    category: 'Mathematics & Engineering',
    examDate: '2026-10-25',
    totalMarks: 100,
    durationMinutes: 180,
    targetScore: 90,
    syllabusSnippet: 'Linear Algebra, Eigenvalues & Eigenvectors, Cayley-Hamilton Theorem, Laplace Transforms, Fourier Series, Partial Differential Equations, Numerical Integration (Simpson/Trapezoidal).',
    pyqSnippet: 'Cayley-Hamilton inverse computation, Laplace transform of piecewise functions, Heat conduction PDE separation of variables, Runge-Kutta 4th order.',
    analysis: {
      summary: 'Mathematics examinations require strict adherence to step-by-step layout. Evaluators allocate up to 80% of marks for correct intermediate derivations and boundary substitutions even if final arithmetic contains minor errors.',
      highYieldTopics: [
        {
          title: 'Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem',
          moduleOrUnit: 'Unit 1: Linear Algebra & Matrix Calculus',
          estimatedWeightagePercent: 25,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Medium',
          recommendedHours: 8,
          whyHighYield: 'Standard 16-mark problem requiring characteristic equation |A - lambda*I| = 0, verifying Cayley-Hamilton theorem, and finding matrix inverse and high powers A^8.',
          mustMasterConcepts: [
            'Characteristic polynomial derivation: lambda^3 - tr(A)*lambda^2 + M*lambda - det(A) = 0',
            'Cayley-Hamilton statement: Every square matrix satisfies its own characteristic equation',
            'Matrix diagonalization P^(-1)*A*P = D using normalized modal matrix'
          ]
        },
        {
          title: 'Laplace & Inverse Laplace Transforms',
          moduleOrUnit: 'Unit 3: Integral Transforms',
          estimatedWeightagePercent: 24,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 8,
          whyHighYield: 'Solving ordinary differential equations (ODEs) with initial values and Unit Step (Heaviside) / Dirac Delta functions.',
          mustMasterConcepts: [
            'First & Second Shifting Theorems: L{e^(at) f(t)} = F(s-a)',
            'Convolution Theorem: L^(-1){F(s)*G(s)} = integral_0^t f(u) g(t-u) du',
            'Laplace of derivatives: L{f\'\'(t)} = s^2 F(s) - s f(0) - f\'(0)'
          ]
        },
        {
          title: 'Partial Differential Equations (PDEs) - Separation of Variables',
          moduleOrUnit: 'Unit 4: Boundary Value Problems',
          estimatedWeightagePercent: 22,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 9,
          whyHighYield: 'Standard 1D Wave equation (vibrating string) or 1D Heat conduction equation with fixed Dirichlet/Neumann boundary conditions.',
          mustMasterConcepts: [
            'Separation ansatz: u(x, t) = X(x) * T(t)',
            'Eigenvalues k = -(n*pi/L)^2 for non-trivial boundary solutions',
            'Fourier sine series expansion for matching initial conditions'
          ]
        },
        {
          title: 'Numerical Methods & Runge-Kutta 4th Order',
          moduleOrUnit: 'Unit 5: Numerical Analysis',
          estimatedWeightagePercent: 16,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Easy',
          recommendedHours: 5,
          whyHighYield: 'Newton-Raphson iteration, Simpsons 1/3 and 3/8 rules, and Runge-Kutta 4th Order numerical ODE steps.',
          mustMasterConcepts: [
            'Newton Raphson formula: x_{n+1} = x_n - f(x_n)/f\'(x_n)',
            'Simpsons 1/3 Rule: (h/3) * [(y0 + yn) + 4*(odd) + 2*(even)]',
            'RK4 weighted increment: k = (k1 + 2k2 + 2k3 + k4)/6'
          ]
        },
        {
          title: 'Fourier Series & Half-Range Expansions',
          moduleOrUnit: 'Unit 2: Harmonic Analysis',
          estimatedWeightagePercent: 13,
          recurrenceProbability: 'Moderate (50-74%)',
          difficulty: 'Medium',
          recommendedHours: 5,
          whyHighYield: 'Expansion of periodic functions f(x) = x^2 or piecewise pulse in (-pi, pi) with deduction of Basel series sum(1/n^2).',
          mustMasterConcepts: [
            'Euler coefficients: a0, an, bn integrals',
            'Dirichlet conditions for convergence',
            'Parsevals identity for series sum evaluation'
          ]
        }
      ],
      importantQuestions: [
        {
          id: 'math-q1',
          questionText: 'Verify Cayley-Hamilton Theorem for the matrix A = [[2, -1, 1], [-1, 2, -1], [1, -1, 2]]. Hence find A^(-1) and evaluate the matrix polynomial A^4 - 6A^3 + 9A^2 - 4A + I.',
          type: 'Long / Essay (12-20m)',
          expectedMarks: 16,
          frequencyPastYears: 'Repeated 4 out of 5 years',
          coreKeywordsRequired: ['Characteristic Equation', '|A - lambda*I| = 0', 'Cayley-Hamilton Verification', 'Matrix Inverse Formula'],
          markingSchemeSteps: [
            'Calculate characteristic equation: lambda^3 - 6*lambda^2 + 9*lambda - 4 = 0 (4 Marks)',
            'Substitute matrix A and compute A^2 and A^3, proving A^3 - 6A^2 + 9A - 4I = 0 (5 Marks)',
            'Multiply by A^(-1) to obtain A^(-1) = (1/4)*(A^2 - 6A + 9I) and compute final matrix (4 Marks)',
            'Evaluate the matrix polynomial using remainder division (3 Marks)'
          ],
          modelAnswerOutline: '1. Expand det(A - lambda*I). 2. Compute A^2 and A^3 with clear intermediate matrix multiplication grids. 3. Show step-by-step element cancellation yielding zero matrix. 4. Isolate A^(-1). 5. Calculate remainder of A^4 expression modulo characteristic polynomial.',
          commonStudentMistakes: 'Sign errors in expanding 3x3 determinant; arithmetic errors during matrix squaring.'
        },
        {
          id: 'math-q2',
          questionText: 'Solve the initial value differential equation y\'\' + 4y\' + 13y = 10 e^(-t) with initial conditions y(0) = 0 and y\'(0) = 3 using Laplace transforms.',
          type: 'Medium Answer (6-10m)',
          expectedMarks: 10,
          frequencyPastYears: 'Appeared in 2021, 2023, 2024',
          coreKeywordsRequired: ['Laplace Transform of Derivatives', 'Partial Fractions', 'Completing the Square', 'First Shifting Theorem'],
          markingSchemeSteps: [
            'Apply Laplace transform to both sides incorporating y(0) and y\'(0) (3 Marks)',
            'Solve for Y(s) algebraically (2 Marks)',
            'Decompose into partial fractions with quadratic irreducibles (3 Marks)',
            'Apply inverse Laplace transform with completing the square to obtain y(t) (2 Marks)'
          ],
          modelAnswerOutline: 'Transform: (s^2 Y(s) - 3) + 4(s Y(s)) + 13 Y(s) = 10/(s+1). Group terms: (s^2 + 4s + 13) Y(s) = 3 + 10/(s+1). Solve Y(s) = (3s + 13) / ((s+1)(s^2 + 4s + 13)). Use partial fractions A/(s+1) + (Bs+C)/((s+2)^2 + 9). Invert using e^(-2t) sin(3t) and cos(3t).',
          commonStudentMistakes: 'Forgetting minus signs in initial condition terms: L{y\'\'} = s^2 Y(s) - s y(0) - y\'(0).'
        },
        {
          id: 'math-q3',
          questionText: 'Find the numerical solution of dy/dx = x^2 + y with y(0) = 1 at x = 0.2 using Runge-Kutta 4th Order method (take step size h = 0.2).',
          type: 'Numerical / Problem Solving',
          expectedMarks: 8,
          frequencyPastYears: 'Compulsory numerical question in every session',
          coreKeywordsRequired: ['RK4 Method', 'k1, k2, k3, k4 increments', 'Weighted Average Formula'],
          markingSchemeSteps: [
            'Compute k1 = h * f(x0, y0) (2 Marks)',
            'Compute k2 = h * f(x0 + h/2, y0 + k1/2) (2 Marks)',
            'Compute k3 and k4 (2 Marks)',
            'Compute y1 = y0 + (1/6)*(k1 + 2k2 + 2k3 + k4) with 4-decimal accuracy (2 Marks)'
          ],
          modelAnswerOutline: 'x0=0, y0=1, h=0.2. k1 = 0.2 * (0 + 1) = 0.2000. k2 = 0.2 * ((0.1)^2 + 1.1000) = 0.2220. k3 = 0.2 * ((0.1)^2 + 1.1110) = 0.2242. k4 = 0.2 * ((0.2)^2 + 1.2242) = 0.2528. y(0.2) = 1 + (0.2 + 2*0.2220 + 2*0.2242 + 0.2528)/6 = 1.2242.',
          commonStudentMistakes: 'Using x0 instead of x0 + h/2 in evaluating k2 or forgetting to divide the final sum by 6.'
        }
      ],
      keyFormulasAndDiagrams: [
        {
          title: 'Cayley-Hamilton Matrix Inversion',
          detail: 'If lambda^3 - c2*lambda^2 + c1*lambda - c0 = 0, then A^(-1) = (1/c0) * [A^2 - c2*A + c1*I]',
          priority: 'Critical'
        },
        {
          title: 'Runge-Kutta 4th Order Equations',
          detail: 'k1 = h*f(x, y); k2 = h*f(x+h/2, y+k1/2); k3 = h*f(x+h/2, y+k2/2); k4 = h*f(x+h, y+k3); Delta_y = (k1 + 2k2 + 2k3 + k4)/6',
          priority: 'Critical'
        },
        {
          title: 'Simpsons 1/3 Rule Integral Approximation',
          detail: 'Integral = (h/3) * [ (y0 + yn) + 4*(y1 + y3 + ... + y_{n-1}) + 2*(y2 + y4 + ... + y_{n-2}) ]',
          priority: 'Critical'
        }
      ],
      examTimeAllocationStrategy: {
        readingTimeMinutes: 15,
        sections: [
          {
            sectionName: 'Section A: Short Analytical Proofs (5 Qs x 4m)',
            marks: 20,
            allocatedMinutes: 25,
            tip: 'Standard properties, condition tests. Fast execution.'
          },
          {
            sectionName: 'Section B: Matrix & Laplace Problems (3 Qs x 12m)',
            marks: 36,
            allocatedMinutes: 65,
            tip: 'Perform matrix multiplications methodically. Check zero cancellation explicitly.'
          },
          {
            sectionName: 'Section C: PDE Separation & RK4 (2 Qs x 22m)',
            marks: 44,
            allocatedMinutes: 65,
            tip: 'Show Fourier boundary matching cleanly. Box final numerical values with 4 decimal digits.'
          }
        ],
        revisionBufferMinutes: 10,
        strategyNotes: 'Last 10 mins: verify sign of constants in partial fractions and check units/decimals in numerical results.'
      },
      flashcards: [
        {
          front: 'State Cayley-Hamilton Theorem.',
          back: 'Every square matrix A satisfies its own characteristic equation: P(A) = 0 where P(lambda) = det(A - lambda*I).',
          category: 'Linear Algebra',
          difficulty: 'Easy'
        },
        {
          front: 'What is the Laplace transform of t^n and e^(at)?',
          back: 'L{t^n} = n! / s^(n+1) (for integer n >= 0)\nL{e^(at)} = 1 / (s - a) for s > a',
          category: 'Formula',
          difficulty: 'Easy'
        },
        {
          front: 'What is the condition for Simpsons 1/3 Rule to be applicable?',
          back: 'The number of intervals (sub-intervals n) MUST BE EVEN (i.e. number of ordinates must be odd).',
          category: 'Numerical Trap',
          difficulty: 'Medium'
        }
      ]
    }
  },
  {
    id: 'bus-fin',
    code: 'FIN-301',
    name: 'Financial Management & Corporate Valuation',
    category: 'Business & Finance',
    examDate: '2026-10-30',
    totalMarks: 100,
    durationMinutes: 180,
    targetScore: 88,
    syllabusSnippet: 'Time Value of Money, Capital Budgeting (NPV, IRR, Payback), Cost of Capital (WACC), Capital Structure Theories (Modigliani-Miller), Working Capital Management, Dividend Policy.',
    pyqSnippet: 'NPV vs IRR conflict resolution, WACC calculation with market value weights, MM Proposition I & II with corporate tax, Cash conversion cycle optimization.',
    analysis: {
      summary: 'Finance semester exams combine computational case studies (60%) with corporate governance and capital structure theory (40%). Evaluators look for clear tabular cash flow statements, cost of capital formulas, and managerial justification.',
      highYieldTopics: [
        {
          title: 'Capital Budgeting: Mutually Exclusive Projects (NPV vs IRR)',
          moduleOrUnit: 'Unit 2: Long-Term Investment Decisions',
          estimatedWeightagePercent: 30,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 9,
          whyHighYield: '16-mark mandatory numerical problem featuring depreciation tax shield, salvage value, working capital recovery, and NPV profile crossover rate.',
          mustMasterConcepts: [
            'Operating Cash Flow = (Sales - Costs - Depr)*(1 - t) + Depr',
            'NPV formula and discount factor tables',
            'Fisher Rate / Crossover rate calculation where NPV_A = NPV_B'
          ]
        },
        {
          title: 'Cost of Capital & WACC with Market Value Weights',
          moduleOrUnit: 'Unit 3: Cost of Capital',
          estimatedWeightagePercent: 24,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Medium',
          recommendedHours: 7,
          whyHighYield: 'Computing Cost of Equity via CAPM, Cost of Preference, After-tax Cost of Debt, and weighted composite cost.',
          mustMasterConcepts: [
            'CAPM formula: Ke = Rf + Beta * (Rm - Rf)',
            'After-tax cost of debt: Kd = I * (1 - t) / Net_Proceeds',
            'WACC = (E/V)*Ke + (D/V)*Kd*(1 - t) + (P/V)*Kp'
          ]
        },
        {
          title: 'Capital Structure Theories & Modigliani-Miller Propositions',
          moduleOrUnit: 'Unit 4: Financing Decisions',
          estimatedWeightagePercent: 20,
          recurrenceProbability: 'Very High (90%+)',
          difficulty: 'Challenging',
          recommendedHours: 8,
          whyHighYield: 'Essay question comparing Net Income (NI), Net Operating Income (NOI), and MM Hypothesis with arbitrage proof.',
          mustMasterConcepts: [
            'Arbitrage mechanism demonstration: selling overvalued levered shares and personal borrowing',
            'MM with taxes: V_L = V_U + t * D',
            'Trade-off theory: balancing tax shield against financial distress bankruptcy costs'
          ]
        },
        {
          title: 'Working Capital Management & Cash Conversion Cycle',
          moduleOrUnit: 'Unit 5: Short-Term Financial Management',
          estimatedWeightagePercent: 14,
          recurrenceProbability: 'High (75-89%)',
          difficulty: 'Easy',
          recommendedHours: 5,
          whyHighYield: 'Cash conversion cycle (CCC) calculation and operating cycle reduction strategies.',
          mustMasterConcepts: [
            'CCC = Days Inventory Outstanding (DIO) + Days Sales Outstanding (DSO) - Days Payable Outstanding (DPO)',
            'Economic Order Quantity (EOQ) formula = sqrt(2 * D * S / H)',
            'Conservative vs Aggressive working capital financing policies'
          ]
        },
        {
          title: 'Dividend Theories (Walter vs Gordon vs MM)',
          moduleOrUnit: 'Unit 6: Distribution Decisions',
          estimatedWeightagePercent: 12,
          recurrenceProbability: 'Moderate (50-74%)',
          difficulty: 'Medium',
          recommendedHours: 4,
          whyHighYield: 'Calculations using Walters formula P = (D + (r/ke)*(E - D)) / ke.',
          mustMasterConcepts: [
            'Growth firm condition (r > ke): zero payout maximizes share price',
            'Declining firm condition (r < ke): 100% payout maximizes share price',
            'Gordons dividend discount model P0 = D1 / (ke - g)'
          ]
        }
      ],
      importantQuestions: [
        {
          id: 'fin-q1',
          questionText: 'Company ABC is considering two mutually exclusive projects, X and Y, each requiring an initial outlay of $500,000. Project X generates cash flows of $180,000 annually for 5 years. Project Y generates cash flows of $80,000 in Year 1 increasing by $60,000 each year through Year 5. Assuming a cost of capital of 10%: (a) Calculate the Payback Period, Net Present Value (NPV), and Internal Rate of Return (IRR) for both projects. (b) Explain why an NPV-IRR conflict may arise and provide your final recommendation.',
          type: 'Long / Essay (12-20m)',
          expectedMarks: 16,
          frequencyPastYears: 'Repeated 4 out of 5 years',
          coreKeywordsRequired: ['NPV Rule', 'IRR Hurdle Rate', 'Cash Flow Timing Conflict', 'Reinvestment Rate Assumption', 'Fisher Crossover Rate'],
          markingSchemeSteps: [
            'Constructing discounted cash flow table for Project X and Project Y at 10% (6 Marks)',
            'Accurate calculation of NPV and IRR for both projects (4 Marks)',
            'Theoretical explanation of reinvestment rate assumption: NPV assumes reinvestment at WACC (realistic), IRR assumes reinvestment at IRR (unrealistic) (4 Marks)',
            'Decisive managerial recommendation favoring higher NPV project with justification (2 Marks)'
          ],
          modelAnswerOutline: '1. Tabulate Cash Flows and Discount factors (10%). 2. Project X: NPV = $182,142, IRR ≈ 22.1%. Project Y: NPV = $195,430, IRR ≈ 18.9%. 3. Highlight conflict: Project X has higher IRR, Project Y has higher NPV. 4. Explain why NPV is superior for wealth maximization: size disparity & timing differences. Recommend Project Y.',
          commonStudentMistakes: 'Recommending the higher IRR project when mutually exclusive, ignoring that NPV directly measures incremental shareholder wealth.'
        },
        {
          id: 'fin-q2',
          questionText: 'Explain the Modigliani-Miller (MM) Arbitrage process without taxes. Given two identical firms L (Levered with $200,000 debt at 8%) and U (Unlevered), show how an investor holding 10% shares in the overvalued levered firm can earn higher returns with equivalent risk through personal borrowing.',
          type: 'Derivation / Proof',
          expectedMarks: 12,
          frequencyPastYears: 'Appeared in 3 recent semesters',
          coreKeywordsRequired: ['Home-made Leverage', 'Arbitrage Equilibrium', 'Personal Borrowing', 'Firm Valuation Invariant'],
          markingSchemeSteps: [
            'Assumptions of MM without taxes: perfect capital markets, equal borrowing rates (2 Marks)',
            'Arbitrage numerical demonstration: selling 10% of firm L (4 Marks)',
            'Replicating personal leverage by borrowing matching debt amount (3 Marks)',
            'Comparing net income between the two states to show arbitrage profit (3 Marks)'
          ],
          modelAnswerOutline: 'Step 1: Sell 10% equity of firm L. Step 2: Borrow 10% of firm L\'s debt on personal account at 8%. Step 3: Invest entire proceeds into 10% equity of firm U. Step 4: Show that operating earnings from U minus personal interest equals or exceeds original earnings from L with leftover cash in pocket.',
          commonStudentMistakes: 'Forgetting to mirror the exact same debt-to-equity ratio in personal borrowing (homemade leverage).'
        }
      ],
      keyFormulasAndDiagrams: [
        {
          title: 'Operating Cash Flow (Depreciation Tax Shield)',
          detail: 'OCF = (EBITDA - Depr)*(1 - t) + Depr = EBIT*(1 - t) + Depr',
          priority: 'Critical'
        },
        {
          title: 'Weighted Average Cost of Capital (WACC)',
          detail: 'WACC = (E/V)*Ke + (D/V)*Kd*(1 - t) + (P/V)*Kp',
          priority: 'Critical'
        },
        {
          title: 'Walters Dividend Model Share Price',
          detail: 'P = [ D + (r / Ke)*(E - D) ] / Ke',
          priority: 'Critical'
        }
      ],
      examTimeAllocationStrategy: {
        readingTimeMinutes: 15,
        sections: [
          {
            sectionName: 'Section A: Financial Concepts & Definitions (5 Qs x 4m)',
            marks: 20,
            allocatedMinutes: 25,
            tip: 'Direct definitions of risk, leverage, working capital.'
          },
          {
            sectionName: 'Section B: WACC & Capital Structure Numericals (3 Qs x 12m)',
            marks: 36,
            allocatedMinutes: 65,
            tip: 'Format WACC tables cleanly with book vs market values.'
          },
          {
            sectionName: 'Section C: Comprehensive Capital Budgeting Case (2 Qs x 22m)',
            marks: 44,
            allocatedMinutes: 65,
            tip: 'Build full discounted cash flow schedule. Double check tax shield addition.'
          }
        ],
        revisionBufferMinutes: 10,
        strategyNotes: 'Check discount factor precision (use at least 3 decimal places) and verify total outlays include working capital addition.'
      },
      flashcards: [
        {
          front: 'Why is NPV preferred over IRR for mutually exclusive projects?',
          back: '1. Reinvestment Rate Assumption: NPV realistically assumes cash flows are reinvested at cost of capital (WACC); IRR assumes reinvestment at the IRR rate.\n2. Scale Differences: NPV measures absolute dollar wealth added; IRR measures percentage return.',
          category: 'Core Finance',
          difficulty: 'Medium'
        },
        {
          front: 'What is the Cash Conversion Cycle (CCC) formula?',
          back: 'CCC = Days Inventory Outstanding (DIO) + Days Sales Outstanding (DSO) - Days Payable Outstanding (DPO)',
          category: 'Working Capital',
          difficulty: 'Easy'
        }
      ]
    }
  }
];

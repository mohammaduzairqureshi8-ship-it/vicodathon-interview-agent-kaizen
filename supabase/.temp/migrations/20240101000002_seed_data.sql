-- ═══════════════════════════════════════════════════════════════════
-- AI INTERVIEW AGENT — Seed Data v1.0
-- Roman Urdu: 8 modules, 31 curriculum days, aur 20 candidates ka data
-- ZAROOR: Pehle 20240101000001_initial_schema.sql chalaao, uske baad ye
-- ═══════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────
-- PART 1: CURRICULUM MODULES (8 modules)
-- ─────────────────────────────────────────────────────────────────────
INSERT INTO curriculum_modules (id, name, description, order_index, start_day, end_day) VALUES
  ('module_1', 'Python Foundations',
   'Core Python syntax, variables, data types, strings, lists and basic I/O',
   1, 1, 4),
  ('module_2', 'Control Flow Mastery',
   'Conditional statements, for/while loops, loop control, and nested patterns',
   2, 5, 8),
  ('module_3', 'Functions & Functional Programming',
   'Functions, scope, closures, default args, lambda, map/filter/reduce',
   3, 9, 12),
  ('module_4', 'Data Structures Deep Dive',
   'Dictionaries, sets, frozensets, stacks, queues, and deques with deque',
   4, 13, 16),
  ('module_5', 'Object-Oriented Programming Basics',
   'Classes, objects, init, instance methods, class variables, inheritance',
   5, 17, 20),
  ('module_6', 'Advanced OOP & Design Patterns',
   'Abstract classes, decorators, property methods, class/static methods, Singleton/Factory patterns',
   6, 21, 24),
  ('module_7', 'Problem Solving & Algorithms',
   'Recursion, sorting (Bubble/Selection/Insertion), searching (Binary/BFS), dynamic programming',
   7, 25, 28),
  ('module_8', 'Interview Preparation & System Design',
   'System design fundamentals, interview patterns, LeetCode strategies, mock interview',
   8, 29, 31)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────
-- PART 2: CURRICULUM DAYS (31 days)
-- ─────────────────────────────────────────────────────────────────────
INSERT INTO curriculum_days (day_number, module_id, title, topics, objectives, exercises) VALUES

-- MODULE 1: Python Foundations (Days 1-4)
(1, 'module_1', 'Introduction to Python & Environment Setup',
  '["Python history & philosophy", "Installing Python 3.12", "VS Code setup & extensions", "Running first .py script", "print() and input() functions", "Comments & indentation"]'::jsonb,
  '["Set up a working Python development environment", "Run a Python script from the terminal", "Understand Python indentation rules"]'::jsonb,
  '["Write a Hello World program", "Print your full name 5 times using a loop", "Create a simple calculator using input() and print()"]'::jsonb),

(2, 'module_1', 'Variables & Primitive Data Types',
  '["Variable naming rules", "int, float, bool, NoneType", "type() function", "Type conversion: int(), str(), float()", "Arithmetic operators", "Augmented assignment: +=, -="]'::jsonb,
  '["Declare and use variables correctly", "Identify Python data types", "Perform type conversion safely"]'::jsonb,
  '["Create a variable of each primitive type", "Build a BMI calculator using float inputs", "Type conversion challenge exercise"]'::jsonb),

(3, 'module_1', 'Strings & String Manipulation',
  '["String creation and quotes", "Indexing [0] and negative indexing [-1]", "Slicing [start:end:step]", "String methods: upper, lower, strip, split, replace, find", "f-strings (formatted string literals)", "len() function", "String immutability"]'::jsonb,
  '["Slice and manipulate strings", "Use common string methods fluently", "Format output using f-strings"]'::jsonb,
  '["Reverse a string without using reversed()", "Count vowels in a sentence", "Build a full name formatter from first + last name"]'::jsonb),

(4, 'module_1', 'Lists, Tuples & Basic Collections',
  '["List creation and access", "List methods: append, insert, remove, pop, sort, reverse", "Negative indexing on lists", "Tuple creation and immutability", "When to use list vs tuple", "Nested lists introduction", "List comprehension basics"]'::jsonb,
  '["Create and modify lists dynamically", "Understand mutability vs immutability", "Apply basic list comprehensions"]'::jsonb,
  '["Build a shopping cart list with add/remove", "Tuple vs List comparison exercise", "Sort a list of student names alphabetically"]'::jsonb),

-- MODULE 2: Control Flow Mastery (Days 5-8)
(5, 'module_2', 'Conditional Statements — if / elif / else',
  '["Boolean expressions", "Comparison operators: ==, !=, >, <, >=, <=", "Logical operators: and, or, not", "Nested if statements", "Ternary operator: x if condition else y", "Truthy and falsy values in Python"]'::jsonb,
  '["Write correct conditional logic for any scenario", "Understand Python truthy/falsy evaluation", "Avoid common if/else anti-patterns"]'::jsonb,
  '["Grade calculator (A/B/C/D/F)", "FizzBuzz with custom rules", "Age-based cinema ticket pricing system"]'::jsonb),

(6, 'module_2', 'For Loops & Range',
  '["for loop syntax", "range(start, stop, step)", "Iterating over lists and strings", "enumerate() for index + value", "zip() to pair two lists", "List comprehension with for"]'::jsonb,
  '["Iterate over any iterable correctly", "Use enumerate() and zip() in practice", "Build compact list comprehensions"]'::jsonb,
  '["Calculate sum of 1 to 100", "Print a 10x10 multiplication table", "Pair student names with their grades using zip()"]'::jsonb),

(7, 'module_2', 'While Loops & Loop Control',
  '["while loop syntax and condition", "break — exit loop early", "continue — skip current iteration", "pass — do nothing placeholder", "Infinite loop risks and how to avoid them", "Loop-else clause in Python"]'::jsonb,
  '["Use while loops for unknown iteration counts", "Control loop flow with break and continue", "Write safe loops that always terminate"]'::jsonb,
  '["Number guessing game (1-100)", "Input validator: keep asking until valid email entered", "Count down from N to zero using while"]'::jsonb),

(8, 'module_2', 'Nested Loops & Loop Patterns',
  '["Nested for loops", "2D list traversal (matrix)", "Pattern printing techniques", "Understanding O(n²) time complexity intuitively", "Optimizing nested loops"]'::jsonb,
  '["Write and read nested loops confidently", "Print common interview patterns (stars, pyramids)", "Traverse 2D data structures"]'::jsonb,
  '["Print a right-aligned star pyramid", "Build and print a multiplication matrix", "Find all pairs in a list that sum to a target"]'::jsonb),

-- MODULE 3: Functions & Functional Programming (Days 9-12)
(9, 'module_3', 'Introduction to Functions & Parameters',
  '["def keyword and function body", "Parameters vs arguments distinction", "Positional arguments", "Writing docstrings with triple quotes", "Calling functions", "DRY principle — Don''t Repeat Yourself"]'::jsonb,
  '["Define and call functions correctly", "Use parameters to make functions reusable", "Write clear docstrings for every function"]'::jsonb,
  '["Write a 4-operation calculator function", "is_prime(n) — return True/False", "area_of_shape(shape, dimensions) function"]'::jsonb),

(10, 'module_3', 'Return Values & Variable Scope',
  '["return statement and return values", "Returning multiple values as tuple", "None — default return", "Local vs global scope", "LEGB rule: Local, Enclosing, Global, Built-in", "global keyword (and why to avoid it)"]'::jsonb,
  '["Return meaningful values from functions", "Explain the LEGB scope resolution order", "Identify and fix scope-related bugs"]'::jsonb,
  '["max_of_three(a, b, c) using return", "Scope detective: predict output of 5 scope puzzles", "celsius_to_fahrenheit and back converter"]'::jsonb),

(11, 'module_3', 'Default Arguments, *args & **kwargs',
  '["Default parameter values", "*args — variable positional arguments", "**kwargs — variable keyword arguments", "Keyword-only arguments after *", "Argument unpacking: *list, **dict in calls", "Order of parameters rule"]'::jsonb,
  '["Write flexible function signatures", "Handle variable numbers of arguments correctly", "Unpack collections into function arguments"]'::jsonb,
  '["greet(name, greeting=''Hello'') function", "sum_all(*numbers) — sum any count of numbers", "build_profile(**details) — create user dict"]'::jsonb),

(12, 'module_3', 'Lambda & Higher-Order Functions',
  '["lambda syntax: lambda x: x*2", "map(function, iterable)", "filter(function, iterable)", "reduce() from functools", "sorted(list, key=lambda)", "Functions as first-class objects in Python"]'::jsonb,
  '["Write concise lambda functions", "Apply map, filter, and sorted with lambdas", "Pass functions as arguments to other functions"]'::jsonb,
  '["Double all items in a list using map()", "Filter only even numbers from a list", "Sort a list of dicts by a specific key using sorted()"]'::jsonb),

-- MODULE 4: Data Structures Deep Dive (Days 13-16)
(13, 'module_4', 'Dictionaries — Creating & Accessing',
  '["dict creation with {} and dict()", "Accessing values with [] and .get()", "Updating: dict[key] = value", "Deleting: del dict[key], .pop()", "in operator for key check", "KeyError and how to handle it", "When to use dict vs list"]'::jsonb,
  '["Create and access dictionaries safely", "Update and delete keys without errors", "Choose between dict and list appropriately"]'::jsonb,
  '["Student grade book: add, update, query grades", "Word frequency counter for a sentence", "Phone directory with add/search/delete"]'::jsonb),

(14, 'module_4', 'Dictionary Methods & Comprehensions',
  '[".keys(), .values(), .items()", "Iterating dicts with for k, v in d.items()", "Dictionary comprehension: {k: v for ...}", "Nested dictionaries", ".update() to merge dicts", "dict.setdefault()"]'::jsonb,
  '["Iterate dictionaries using .items()", "Build concise dict comprehensions", "Work confidently with nested dict structures"]'::jsonb,
  '["Invert a dictionary (swap keys and values)", "Merge two employee dicts, handling conflicts", "Parse a nested JSON-like config structure"]'::jsonb),

(15, 'module_4', 'Sets & Frozensets',
  '["Set creation with {} and set()", "Set operations: union |, intersection &, difference -, symmetric_difference ^", "frozenset — immutable set", "Hashability requirement for set elements", "Set comprehensions", "Removing duplicates from a list"]'::jsonb,
  '["Use sets for fast membership testing and deduplication", "Apply set algebra operations", "Understand hashability constraints"]'::jsonb,
  '["Remove all duplicates from a list", "Find common friends between two users", "Count unique words in a paragraph"]'::jsonb),

(16, 'module_4', 'Stacks, Queues & Deques',
  '["Stack with Python list: .append() and .pop()", "Queue with collections.deque: .append() and .popleft()", "LIFO vs FIFO explained", "deque advantages over list for queues", "Priority queue with heapq", "Real-world applications"]'::jsonb,
  '["Implement stack and queue correctly", "Use collections.deque for O(1) queue operations", "Identify when to use each data structure"]'::jsonb,
  '["Browser back-button history stack", "Customer support ticket queue simulation", "Balanced parentheses checker using stack"]'::jsonb),

-- MODULE 5: OOP Basics (Days 17-20)
(17, 'module_5', 'Classes, Objects & __init__',
  '["class keyword and class body", "__init__ constructor method", "self parameter — what it means", "Instance variables defined in __init__", "Creating object instances", "Accessing attributes with dot notation"]'::jsonb,
  '["Define a class with proper __init__", "Create multiple independent object instances", "Access and set instance attributes correctly"]'::jsonb,
  '["BankAccount class with balance and owner", "Rectangle class with width, height, area()", "Student class with name, grades, average()"]'::jsonb),

(18, 'module_5', 'Instance Methods & Class Variables',
  '["Instance methods with self", "Class variables shared across instances", "cls vs self — when to use which", "__str__ method for readable output", "__repr__ for developer output", "Counting instances with class variable"]'::jsonb,
  '["Write useful instance methods", "Distinguish class variables from instance variables", "Implement __str__ for all classes"]'::jsonb,
  '["Counter class: track how many objects created", "Employee class with salary_raise(percent) method", "Shape hierarchy with area() and __str__"]'::jsonb),

(19, 'module_5', 'Inheritance & Method Overriding',
  '["Subclass syntax: class Dog(Animal):", "super().__init__() call", "Inheritance chain and attribute lookup order", "Method overriding — child replaces parent method", "isinstance(obj, Class)", "issubclass(Child, Parent)"]'::jsonb,
  '["Create meaningful subclasses using inheritance", "Override methods to specialize behavior", "Use super() to extend parent functionality"]'::jsonb,
  '["Animal → Dog (bark) and Cat (meow)", "Vehicle → Car (doors) and Truck (capacity)", "Shape → Circle (radius) and Square (side)"]'::jsonb),

(20, 'module_5', 'Polymorphism & Encapsulation',
  '["Polymorphism — same method name, different behavior", "Duck typing in Python", "_single_underscore — protected convention", "__double_underscore — name mangling (private)", "@property decorator for getters", "@attribute.setter for setters"]'::jsonb,
  '["Apply polymorphism through method overriding", "Protect internal state with encapsulation", "Create clean Python properties"]'::jsonb,
  '["Polymorphic area() for Circle, Square, Triangle", "Temperature class: private _celsius, public @property fahrenheit", "Access control exercise: prevent invalid age values"]'::jsonb),

-- MODULE 6: Advanced OOP (Days 21-24)
(21, 'module_6', 'Abstract Classes & Interfaces',
  '["abc module: ABC and ABCMeta", "@abstractmethod decorator", "Why abstract classes prevent direct instantiation", "Python Protocol for structural subtyping", "Interface pattern in Python", "Abstract properties"]'::jsonb,
  '["Create abstract base classes with enforced contracts", "Use @abstractmethod to define required methods", "Apply Protocol for duck-typed interfaces"]'::jsonb,
  '["Shape ABC with abstract area() and perimeter()", "PaymentProcessor ABC: charge(), refund()", "Serializable protocol: serialize() and deserialize()"]'::jsonb),

(22, 'module_6', 'Decorators & Property Methods',
  '["Function as first-class object recap", "Decorator syntax: @decorator", "Writing a custom decorator from scratch", "functools.wraps to preserve metadata", "@property for computed attributes", "Chaining decorators"]'::jsonb,
  '["Write custom function decorators", "Use @property for clean attribute access", "Chain decorators correctly"]'::jsonb,
  '["@timer decorator: print execution time", "@require_auth decorator: check login", "@cached_property for expensive computation"]'::jsonb),

(23, 'module_6', 'Class Methods & Static Methods',
  '["@classmethod with cls parameter", "@staticmethod — no self or cls", "Factory methods using @classmethod", "Utility/helper functions with @staticmethod", "When to use each: instance vs class vs static", "Alternative constructors pattern"]'::jsonb,
  '["Distinguish @classmethod from @staticmethod", "Create factory constructors with @classmethod", "Organize utility functions as @staticmethod"]'::jsonb,
  '["Date.from_string(''2024-01-15'') factory classmethod", "Temperature.from_fahrenheit() alternative constructor", "MathUtils class with only static methods"]'::jsonb),

(24, 'module_6', 'Design Patterns in Python',
  '["Singleton pattern — one instance only", "Factory pattern — create objects without specifying class", "Observer pattern — event listener system", "Strategy pattern — swappable algorithms", "When to use each pattern", "Anti-patterns to avoid"]'::jsonb,
  '["Implement the 4 most common design patterns", "Explain the problem each pattern solves", "Recognize patterns in real codebases"]'::jsonb,
  '["DatabaseConnection Singleton", "ShapeFactory using Factory pattern", "EventEmitter using Observer pattern"]'::jsonb),

-- MODULE 7: Problem Solving & Algorithms (Days 25-28)
(25, 'module_7', 'Recursion & Base Cases',
  '["Recursive function structure", "Base case — when to stop", "Recursive case — breaking the problem down", "Call stack visualization", "Stack overflow risk", "Memoization preview", "Recursion vs iteration tradeoffs"]'::jsonb,
  '["Write correct recursive functions with proper base cases", "Trace through recursive calls on paper", "Identify problems suited for recursion"]'::jsonb,
  '["Recursive factorial(n)", "Recursive fibonacci(n) — naive and with memo", "Tower of Hanoi — explain the logic"]'::jsonb),

(26, 'module_7', 'Sorting Algorithms',
  '["Bubble Sort — compare adjacent, swap if wrong order", "Selection Sort — find minimum, place it", "Insertion Sort — build sorted array left to right", "Time complexity: O(n²) for all three", "Space complexity: O(1) in-place", "Stability of sorting algorithms"]'::jsonb,
  '["Implement all three O(n²) sorting algorithms", "Analyze and compare their performance", "Explain when each is appropriate"]'::jsonb,
  '["Implement and test all 3 sorts on same array", "Sort list of student objects by grade (desc)", "Find top-3 elements without full sort"]'::jsonb),

(27, 'module_7', 'Searching Algorithms',
  '["Linear search — O(n)", "Binary search — O(log n) on sorted arrays", "Binary search implementation", "bisect module for production use", "BFS on a 2D grid", "Search complexity comparison"]'::jsonb,
  '["Implement binary search from scratch", "Apply bisect module correctly", "Explain why binary search requires sorted input"]'::jsonb,
  '["Implement binary_search(arr, target)", "Find first and last occurrence of a value", "BFS on a 5x5 grid — find shortest path"]'::jsonb),

(28, 'module_7', 'Dynamic Programming Fundamentals',
  '["Overlapping subproblems", "Optimal substructure property", "Top-down with memoization (dict cache)", "Bottom-up with tabulation (array)", "Classic DP problems", "Recognizing DP problems in interviews"]'::jsonb,
  '["Identify DP problems by their characteristics", "Apply memoization to recursive solutions", "Build bottom-up DP tables"]'::jsonb,
  '["Fibonacci with @lru_cache memoization", "Coin change problem (min coins)", "Longest Common Subsequence (LCS)"]'::jsonb),

-- MODULE 8: Interview Prep (Days 29-31)
(29, 'module_8', 'System Design Fundamentals',
  '["Client-server model", "REST APIs and HTTP methods (GET, POST, PUT, DELETE)", "SQL vs NoSQL databases", "Caching: what, why, Redis basics", "Load balancing concepts", "CDN and static assets", "Horizontal vs vertical scaling"]'::jsonb,
  '["Explain client-server architecture clearly", "Design a simple system at a high level", "Identify bottlenecks and common solutions"]'::jsonb,
  '["Design a URL shortener (tinyurl clone)", "Design a simple chat application", "Design a rate limiter for an API"]'::jsonb),

(30, 'module_8', 'Interview Patterns & LeetCode Strategies',
  '["Two Pointers pattern", "Sliding Window pattern", "Fast & Slow Pointers (Floyd''s cycle)", "HashMap frequency count pattern", "Prefix sum pattern", "Problem taxonomy and recognition", "Time/space complexity analysis"]'::jsonb,
  '["Recognize which pattern applies to a problem", "Apply two pointers and sliding window correctly", "Optimize brute-force solutions using patterns"]'::jsonb,
  '["Two Sum using hash map — O(n)", "Longest substring without repeating characters — sliding window", "Linked list cycle detection — fast/slow pointers"]'::jsonb),

(31, 'module_8', 'Mock Interview & Final Assessment',
  '["Think-aloud communication technique", "Clarifying requirements before coding", "Edge case identification", "Code quality and naming conventions", "Time management in 45-minute interview", "Post-interview reflection"]'::jsonb,
  '["Conduct a complete 45-minute mock interview", "Demonstrate 31 days of learned knowledge", "Communicate problem-solving process clearly"]'::jsonb,
  '["Full 45-minute live mock interview session", "Code review exercise on peer''s solution", "System design whiteboard walkthrough"]'::jsonb)

ON CONFLICT (day_number) DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────
-- PART 3: CANDIDATES (20 synthetic profiles)
-- ─────────────────────────────────────────────────────────────────────
INSERT INTO candidates (external_id, name, email, current_day, module_id, progress_percentage, signals, status) VALUES

('cand_001', 'Ahmad Raza',      'ahmad.raza@techcohort.pk',      3,  'module_1',  10,
 '{"technical":"medium","communication":"strong","problemSolving":"weak","consistency":"strong"}'::jsonb, 'active'),

('cand_002', 'Sara Khan',       'sara.khan@techcohort.pk',       8,  'module_2',  26,
 '{"technical":"strong","communication":"strong","problemSolving":"medium","consistency":"medium"}'::jsonb, 'active'),

('cand_003', 'Usman Ali',       'usman.ali@techcohort.pk',       5,  'module_2',  16,
 '{"technical":"weak","communication":"medium","problemSolving":"weak","consistency":"weak"}'::jsonb, 'active'),

('cand_004', 'Fatima Malik',    'fatima.malik@techcohort.pk',    12, 'module_3',  39,
 '{"technical":"strong","communication":"medium","problemSolving":"strong","consistency":"strong"}'::jsonb, 'active'),

('cand_005', 'Bilal Ahmed',     'bilal.ahmed@techcohort.pk',     1,  'module_1',  3,
 '{"technical":"weak","communication":"weak","problemSolving":"weak","consistency":"medium"}'::jsonb, 'active'),

('cand_006', 'Zara Hussain',    'zara.hussain@techcohort.pk',    15, 'module_4',  48,
 '{"technical":"medium","communication":"strong","problemSolving":"medium","consistency":"strong"}'::jsonb, 'active'),

('cand_007', 'Hassan Sheikh',   'hassan.sheikh@techcohort.pk',   20, 'module_5',  65,
 '{"technical":"strong","communication":"medium","problemSolving":"strong","consistency":"medium"}'::jsonb, 'active'),

('cand_008', 'Ayesha Qureshi',  'ayesha.qureshi@techcohort.pk', 9,  'module_3',  29,
 '{"technical":"medium","communication":"strong","problemSolving":"medium","consistency":"strong"}'::jsonb, 'active'),

('cand_009', 'Imran Baig',      'imran.baig@techcohort.pk',      25, 'module_7',  81,
 '{"technical":"strong","communication":"strong","problemSolving":"strong","consistency":"strong"}'::jsonb, 'active'),

('cand_010', 'Nadia Farooq',    'nadia.farooq@techcohort.pk',    18, 'module_5',  58,
 '{"technical":"medium","communication":"medium","problemSolving":"medium","consistency":"medium"}'::jsonb, 'active'),

('cand_011', 'Tariq Saeed',     'tariq.saeed@techcohort.pk',     7,  'module_2',  23,
 '{"technical":"weak","communication":"strong","problemSolving":"medium","consistency":"medium"}'::jsonb, 'active'),

('cand_012', 'Sana Riaz',       'sana.riaz@techcohort.pk',       31, 'module_8',  100,
 '{"technical":"strong","communication":"strong","problemSolving":"strong","consistency":"strong"}'::jsonb, 'completed'),

('cand_013', 'Omar Siddiqui',   'omar.siddiqui@techcohort.pk',   4,  'module_1',  13,
 '{"technical":"medium","communication":"weak","problemSolving":"medium","consistency":"weak"}'::jsonb, 'active'),

('cand_014', 'Hira Javed',      'hira.javed@techcohort.pk',      22, 'module_6',  71,
 '{"technical":"strong","communication":"medium","problemSolving":"medium","consistency":"strong"}'::jsonb, 'active'),

('cand_015', 'Kamran Niazi',    'kamran.niazi@techcohort.pk',    11, 'module_3',  35,
 '{"technical":"medium","communication":"medium","problemSolving":"medium","consistency":"medium"}'::jsonb, 'active'),

('cand_016', 'Maryam Shahid',   'maryam.shahid@techcohort.pk',   28, 'module_7',  90,
 '{"technical":"strong","communication":"strong","problemSolving":"strong","consistency":"medium"}'::jsonb, 'active'),

('cand_017', 'Faisal Chaudhry', 'faisal.chaudhry@techcohort.pk', 16, 'module_4',  52,
 '{"technical":"medium","communication":"weak","problemSolving":"strong","consistency":"medium"}'::jsonb, 'active'),

('cand_018', 'Rabia Iqbal',     'rabia.iqbal@techcohort.pk',     6,  'module_2',  19,
 '{"technical":"weak","communication":"medium","problemSolving":"weak","consistency":"strong"}'::jsonb, 'active'),

('cand_019', 'Adnan Mirza',     'adnan.mirza@techcohort.pk',     29, 'module_8',  94,
 '{"technical":"strong","communication":"medium","problemSolving":"strong","consistency":"strong"}'::jsonb, 'active'),

('cand_020', 'Saima Butt',      'saima.butt@techcohort.pk',      14, 'module_4',  45,
 '{"technical":"medium","communication":"strong","problemSolving":"medium","consistency":"medium"}'::jsonb, 'active')

ON CONFLICT (external_id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────
-- VERIFICATION QUERIES — Seed ke baad ye run karo taake confirm ho
-- ─────────────────────────────────────────────────────────────────────
-- Ye query ye check karta hai ke sab kuch theek insert hua:
-- SELECT 'curriculum_modules' as table_name, COUNT(*) as rows FROM curriculum_modules
-- UNION ALL
-- SELECT 'curriculum_days',  COUNT(*) FROM curriculum_days
-- UNION ALL
-- SELECT 'candidates',       COUNT(*) FROM candidates;
-- Expected output: modules=8, days=31, candidates=20
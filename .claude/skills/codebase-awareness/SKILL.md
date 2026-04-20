# Codebase Awareness Skill

## Purpose
Prevent hallucinations — never reference files, functions, classes, or APIs
that do not actually exist in the codebase.

## Before Writing Any Code

### Step 1: Verify File Existence
Before referencing a file, check it exists:
```bash
ls [directory]
```

### Step 2: Verify Function/Class Existence
Before calling a function or importing a class, read the source file first.
Do NOT assume a function exists based on naming conventions.

### Step 3: Verify Package APIs
Before using a package method, check the installed version and its API.
Prefer reading actual source or docs over relying on training data.

## During Implementation

- If unsure whether something exists: READ the file first.
- If a function doesn't exist yet: create it explicitly, don't call it.
- If an import fails: check the actual package exports.

## Red Flags (Stop and Verify)
- Referencing a file you haven't read in this session
- Using a function from a package you haven't checked the version of
- Assuming a config key exists without reading the config file
- Calling a method on an object whose type you haven't inspected

# Parallel Development Skill

## When to Use
When working on multiple independent features simultaneously,
or when large tasks benefit from concurrent sub-task execution.

## Branch Strategy for Parallel Work
Each parallel task must use a dedicated branch:
```
feature/claude-task-a
feature/claude-task-b
feature/claude-task-c
```

## File Conflict Prevention
- Assign explicit file/directory ownership per task
- Task A owns: `src/features/auth/`
- Task B owns: `src/features/settings/`
- Shared files (e.g., `types.ts`): only one task modifies at a time

## Coordination Rules
- Define interfaces/types between tasks BEFORE parallel work begins
- Mock interfaces if the implementation isn't ready
- Never merge branches without user approval
- Report conflicts immediately — do not attempt to auto-resolve

## Claude Code Parallel Sessions
When using multiple Claude sessions in parallel:
1. Each session works on a separate branch
2. Each session has explicit file scope in its instructions
3. Sessions do NOT read each other's uncommitted changes
4. User coordinates merges after each session completes

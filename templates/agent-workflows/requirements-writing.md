# Requirements Writing Template

## Purpose
Transform rough, incomplete requirements into comprehensive and precise implementation tickets that GitHub Copilot agents can execute end-to-end with minimal ambiguity.

**When to use:** When you have a rough idea of what needs to be built but need to create a detailed ticket for a GitHub Copilot agent to implement. Use this before assigning work to ensure the agent has all necessary context and clarity.

## The Prompt

Copy this prompt, then paste your rough requirements after the "ROUGH REQUIREMENTS" section:

```
Context
You are helping me write a GitHub issue ticket that I will assign to a GitHub Copilot coding agent.
The ticket must be detailed enough that the agent can implement the work end to end with minimal ambiguity.

Your Job
Take the rough requirements I provide and transform them into a comprehensive and precise implementation ticket.
You must expand the requirements, fill in missing details, add edge cases, and apply best practices.
If any requirement is unclear, make reasonable assumptions and state them explicitly inside the ticket.
Do not ask me questions. Produce a best effort ticket in one pass.

Output Format
Output only the final ticket description as raw markdown text inside a single code block.
No commentary or explanation outside the code block. Use markdown formatting.

Ticket Must Include These Sections
1. Title Suggestion
   Provide a concise ticket title that is implementation oriented.

2. Problem Statement
   Explain what is wrong or missing today and why it matters.

3. Scope
   Exactly what is in scope and what is out of scope.

4. Requirements
   List functional requirements as numbered items.
   Include behavior details, expected flows, input handling, and error handling.
   Include performance and stability requirements when relevant.

5. Non-Functional Requirements
   Include maintainability, readability, testability, logging, and configurability.

6. Implementation Notes
   Provide guidance on where to implement changes.
   Reference relevant file paths and suggest where new files should go.
   Call out patterns to follow and patterns to avoid.
   If there are multiple approaches, pick one and justify briefly inside the ticket.

7. Acceptance Criteria
   Write verifiable acceptance criteria in checklist form.
   Include success and failure cases.
   Include validation steps that a developer can run.

8. Deliverables
   List exactly what files or artifacts should exist or be updated at the end.

9. Risks and Edge Cases
   List likely pitfalls and how to handle them.

10. Constraints and Assumptions
    List all constraints and assumptions clearly.

Style Rules
- Use clear headings and bullet lists
- Be explicit about names, paths, and behavior
- Prefer minimal changes that solve the problem fully
- Avoid scope creep and new product ideas unless required by best practices
- Use consistent terminology throughout

---

ROUGH REQUIREMENTS:
[Paste your rough requirements here - can be a few sentences or bullet points]
```

## Example Usage

### Before (Your Input)
```
Add a user settings page where users can update their email and notification preferences. 
Should work on mobile and desktop.
```

### After (Final Prompt)
```
Context
You are helping me write a GitHub issue ticket that I will assign to a GitHub Copilot coding agent.
The ticket must be detailed enough that the agent can implement the work end to end with minimal ambiguity.

[... full prompt template ...]

---

ROUGH REQUIREMENTS:
Add a user settings page where users can update their email and notification preferences. 
Should work on mobile and desktop.
```

## Variations

### Quick Ticket Enhancement
For when you have an existing rough ticket that needs structure:
```
Take this rough ticket and expand it with proper structure, acceptance criteria, 
and edge cases:

[Paste existing ticket here]
```

### API-Focused Ticket
```
Create a detailed API endpoint ticket with:
- Request/response schemas
- Error handling
- Authentication requirements
- Rate limiting

ROUGH REQUIREMENTS:
[Paste API requirements here]
```

## Safety Notes
- Generated tickets should be reviewed for completeness before assigning to agents
- Verify assumptions align with actual project constraints
- Technical implementation details may need adjustment based on your stack
- Acceptance criteria should be verifiable - avoid subjective criteria
- Generated scope may be too broad - feel free to narrow based on sprint capacity

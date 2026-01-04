# Performance Review Template

## Purpose
Analyze code for performance issues, inefficiencies, and optimization opportunities including algorithmic complexity, resource usage, and bottlenecks.

**When to use:** When reviewing performance-critical code paths, optimizing slow operations, or preparing code for production scale.

## Inputs
- Code to review (function, module, or system component)
- Performance requirements or constraints (optional)
- Known performance metrics or benchmarks (optional)
- Expected scale (number of users, data volume, etc.)

## Output
Copilot will provide:
- Identified performance bottlenecks
- Time and space complexity analysis
- Specific optimization recommendations
- Alternative approaches for better performance
- Trade-offs to consider

## Example Usage

```
@workspace Review src/api/search.js for performance issues. This endpoint 
processes search queries and is experiencing slow response times with 
large datasets (>100K records).

Focus on:
- Database query efficiency
- N+1 query problems
- Memory usage and object allocation
- Algorithm complexity
- Caching opportunities
```

## Variations

### Algorithm Optimization
```
Analyze the time complexity of this algorithm and suggest optimizations: [paste code]
```

### Memory Usage Review
```
Review this data processing function for memory efficiency and suggest 
ways to reduce allocations: [paste code]
```

### Database Performance
```
Review these database queries for N+1 problems, missing indexes, 
and optimization opportunities: [paste code]
```

## Safety Notes
- Premature optimization can reduce code clarity - focus on proven bottlenecks
- Always measure performance before and after optimization
- Consider readability and maintainability trade-offs
- Some optimizations may be platform or runtime-specific
- Profile production workloads to identify real issues

## Plan: Fix Tailwind class lint errors

TL;DR: Update the specific Tailwind class names flagged by diagnostics in `src/app/page.tsx`, `src/components/UI/ProjectCard.tsx`, `src/components/UI/Card.tsx`, and `src/components/UI/DetailCard.tsx`.

**Steps**
1. Update `src/app/page.tsx`
   - Replace `bg-gradient-to-br` with `bg-linear-to-br`
   - Replace `bg-gradient-to-r` with `bg-linear-to-r`
   - Replace `bg-gradient-to-tr` with `bg-linear-to-tr`
2. Update `src/components/UI/ProjectCard.tsx`
   - Replace `p-[2px]` with `p-0.5`
   - Replace `bg-gradient-to-t` with `bg-linear-to-t`
   - Replace `bg-gradient-to-r` with `bg-linear-to-r`
3. Update `src/components/UI/Card.tsx`
   - Replace `hover:-translate-x-[5px]` with `hover:-translate-x-1.25`
   - Replace `hover:-translate-y-[5px]` with `hover:-translate-y-1.25`
   - Replace `h-[3px]` with `h-0.75`
4. Update `src/components/UI/DetailCard.tsx`
   - Replace `w-[520px]` with `w-130`
   - Replace `rounded-[2rem]` with `rounded-4xl`
   - Replace `-z-0` with `z-0`
   - Replace `h-[350px]` with `h-87.5`
   - Replace `max-sm:h-[200px]` with `max-sm:h-50`

**Relevant files**
- `src/app/page.tsx`
- `src/components/UI/ProjectCard.tsx`
- `src/components/UI/Card.tsx`
- `src/components/UI/DetailCard.tsx`

**Verification**
1. Re-run diagnostics on `src` and confirm no class rewrite warnings remain.
2. Optionally run the app build or lint command to validate the fix.

**Decisions**
- Fix only the reported Tailwind class syntax issues; do not otherwise refactor unrelated component logic.

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Site placeholders (Calendly, demo media, LinkedIn) and contact details live in src/lib/site-config.ts; unreplaced {{...}} values render safe fallback states.
- All routes (`/`, `/privacy`, `/terms`) are statically prerendered to `dist/client` with a generated `404.html` fallback so the site deploys to GitHub Pages without a server runtime.

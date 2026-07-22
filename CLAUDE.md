# CLAUDE.md

<!-- last_updated: 2026-07-06 -->

Centro de Ayuda Comprador de VMC Subastas — sitio estático Astro + Tailwind 4
bajo el design system Concorde. Harness para desarrollo asistido por agentes.

## Contexto obligatorio del proyecto

- **El porqué de todo**: `docs/centro-ayuda-estrategia.md` (estrategia, pendientes de decidir) y `docs/IB_SEO-GEO_2026-07-03.md` (sub-IB con evidencia)
- **El cómo de todo**: `README.md` (tokens Concorde, anatomía de artículo, gate SEO/GEO por artículo)
- **Única fuente de verdad del contenido**: `src/data/helpCenter.ts`

## Reglas de scope duras

- Ningún artículo se publica sin su capa SEO/GEO completa: QuickAnswer + `updated` ISO + breadcrumb 3 niveles + FAQPage JSON-LD (gate, sin excepciones)
- Contenido en español (Perú); solo dominio del comprador VMC — no blog, no vendedores, no soporte transaccional
- Cero lógica de negocio, cero dependencias nuevas — el sitio es estático a propósito
- La fecha `updated` solo se toca cuando el contenido se revisa de verdad

## Startup Workflow

Before writing code:

1. **Confirm working directory** with `pwd`
2. **Read this file** completely
3. **Read project docs if present** (`docs/ARCHITECTURE.md`, `docs/PRODUCT.md`, README, or equivalent)
4. **Run `./init.sh`** to verify environment is healthy
5. **Read `feature_list.json`** to see current feature state
6. **Review recent commits** with `git log --oneline -5`

If baseline verification is failing, repair that first before adding new scope.

## Working Rules

- **One feature at a time**: Pick exactly one unfinished feature from `feature_list.json`
- **Verification required**: Don't claim done without running verification commands
- **Update artifacts**: Before ending session, update `progress.md` and `feature_list.json`
- **Stay in scope**: Don't modify files unrelated to the current feature
- **Leave clean state**: Next session must be able to run `./init.sh` immediately

## Required Artifacts

- `feature_list.json` — Feature state tracker (source of truth)
- `progress.md` — Session continuity log
- `init.sh` — Standard startup and verification path
- `session-handoff.md` — Optional, for larger sessions

## Definition of Done

A feature is done only when ALL of the following are true:

- [ ] Target behavior is implemented
- [ ] Required verification actually ran (tests / lint / type-check)
- [ ] Evidence recorded in `feature_list.json` or `progress.md`
- [ ] Repository remains restartable from standard startup path

## End of Session

Before ending a session:

1. Update `progress.md` with current state
2. Update `feature_list.json` with new feature status
3. Record any unresolved risks or blockers
4. Commit with descriptive message once work is in safe state
5. Leave repo clean enough for next session to run `./init.sh` immediately

## Verification Commands

```bash
# Full verification (recommended)
./init.sh
```

Required checks:
- `npm install`
- `npm run build`

## Escalation

If you encounter:
- **Architecture decisions**: Consult project architecture docs if present, otherwise ask user
- **Unclear requirements**: Check product/requirements docs if present, otherwise ask user
- **Repeated test failures**: Update progress, flag for human review
- **Scope ambiguity**: Re-read `feature_list.json` for definition of done

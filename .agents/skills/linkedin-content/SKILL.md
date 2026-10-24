---
name: linkedin-content
description: Create LinkedIn posts and matching infographics for Lukode based on blog posts from the website. Use when the user asks for a LinkedIn post, social media copy, or an infographic/graphic for a blog article.
---

# LinkedIn Posts & Infographics for Lukode

## 1. Find the source blog post
- Post registry: `blog_data.py` → `BLOG_POSTS` list (first entry = newest; check `date`
  and the template's JSON-LD `datePublished` to confirm).
- `url_endpoint` maps to a route in `app.py`; template lives in `templates/blog/`.
- Use the **canonical URL** from the template's `<link rel="canonical">` for sharing
  (e.g. `https://lukode.net/how-to-test-rag-systems`).
- Note: grep may fail on some templates — fall back to `view_file`.

## 2. LinkedIn post structure
1. Hook: a relatable problem as a question (bold, 1 line, 1 emoji).
2. 1–2 short sentences of context.
3. Bulleted list (🔹) with **bold label** + one-line explanation, taken from the post.
4. One-line insight + ✅ takeaway.
5. CTA: "📖 For more info ... head to our latest blog post:" + 👉 canonical link.
6. 5–7 hashtags.
Stay strictly within the section the user points to; keep it short.

## 3. Infographic brand style (keep broadly intact)
- Background: smooth white → pale icy-blue gradient, optional very faint grid.
- Type: modern geometric sans (Inter/Poppins); bold dark navy (#0F172A) headline,
  key words in royal blue (#3B82F6); gray subtitle.
- Frosted-glass (glassmorphism) cards, soft shadows, glowing blue light lines.
- Icons: **illustrative duotone glowing royal-blue** icons in rounded-square tiles
  (not thin line icons).
- Footer: "Lukode • AI & Software Quality Assurance" (blue bullet).
- Accent colors (e.g. coral red #EF4444 for failures) only sparingly, one consistent
  placement — never duplicated on icons.

## 4. Design for the content, not a copy of past posts
- Past posts are a **style reference only**. Choose the layout that tells the story best:
  - Process/pipeline/failure topics → vertical flow from input pill to output pill
    (e.g. "User question" → 5 stages → "Wrong answer").
  - Lists of pillars/metrics → isometric glass tiles are fine.
- Headline speaks to the reader's pain; closing line repeats the post's core message.
- Default to portrait **3:4** (better feed real estate than 1:1).

## 5. Image generation workflow
- Write a full, explicit prompt: every text string spelled out, icon per item, palette.
- Check every output for: spelling, consistent badges/icons, text crowding.
- **Never chain more than one edit on an edited image** — each pass adds blotches/white
  halos and softens text. For further fixes, regenerate fresh from the full prompt,
  using the best *original* (non-edited) version as the single reference.
- After each image, give a clickable download link:
  `[name.jpg](file:///C:/Users/lukas/.gemini/antigravity-ide/brain/<conversation-id>/<file>.jpg)`
- Be honest about remaining imperfections and offer a targeted fix.

## 6. Save the final graphic in the project
- Once the user approves the final version, copy it into the repo:
  `static/images/social/<blog-post-id>_linkedin.jpg`
  (`<blog-post-id>` = the `id` from `BLOG_POSTS`, e.g. `how-to-test-rag-systems_linkedin.jpg`).
- Only save the approved final, not drafts. Overwrite if the same post's graphic is redone.
- Report the saved path as a clickable link.

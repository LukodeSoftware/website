"""
Blog data and categorization structures for Lukode.
"""

BLOG_CATEGORIES = {
    "ai-testing": {
        "slug": "ai-testing",
        "name": "AI Testing & Validation",
        "short_name": "AI Testing",
        "description": "Evaluating non-deterministic LLMs, RAG pipelines, hallucination elimination, and automated CI/CD eval benchmarks.",
        "icon": "fas fa-brain",
        "accent_color": "#3B82F6",
        "badge_class": "badge-ai",
    },
    "accessibility-compliance": {
        "slug": "accessibility-compliance",
        "name": "Accessibility & WCAG Compliance",
        "short_name": "Accessibility & WCAG",
        "description": "Audit methodologies, remediation guides, and European Accessibility Act (EAA) compliance requirements.",
        "icon": "fas fa-universal-access",
        "accent_color": "#10B981",
        "badge_class": "badge-wcag",
    },
    "software-testing": {
        "slug": "software-testing",
        "name": "Software Quality & Testing",
        "short_name": "Software QA",
        "description": "End-to-end automation, regression strategies, API performance testing, and release readiness gates.",
        "icon": "fas fa-vial",
        "accent_color": "#8B5CF6",
        "badge_class": "badge-qa",
    }
}

BLOG_POSTS = [
    {
        "id": "testing-llms-rag-evals",
        "title": "Testing the Unpredictable: How to Build Automated Eval Suites for LLMs and RAG Pipelines",
        "summary": "Why traditional unit tests fail for AI, and the evaluation metrics modern engineering teams need to eliminate hallucinations before production.",
        "url_endpoint": "testing_llms_rag_evals",
        "category_slug": "ai-testing",
        "category_name": "AI Testing & Validation",
        "read_time": "7 min read",
        "date": "Oct 2026",
        "icon": "fas fa-brain",
    },
    {
        "id": "eaa-penalties",
        "title": "European Accessibility Act Penalties: What Non-Compliance Costs Businesses",
        "summary": "From €100k+ fines to court injunctions and market withdrawal — explore the real-world financial, legal, and operational consequences of EAA non-compliance across EU member states.",
        "url_endpoint": "eaa_penalties",
        "category_slug": "accessibility-compliance",
        "category_name": "Accessibility & WCAG Compliance",
        "read_time": "6 min read",
        "date": "Sep 2026",
        "icon": "fas fa-balance-scale",
    },
    {
        "id": "eu-accessibility-compliance",
        "title": "The EU Accessibility Rules Are Now in Force — Is Your Business Compliant?",
        "summary": "As of June 28, 2025, the European Accessibility Act (EAA) is officially in effect. That means digital accessibility is no longer optional — it’s the law. Find out what it means for your business.",
        "url_endpoint": "eu_accessibility_act_compliance",
        "category_slug": "accessibility-compliance",
        "category_name": "Accessibility & WCAG Compliance",
        "read_time": "5 min read",
        "date": "Sep 2026",
        "icon": "fas fa-gavel",
    },
    {
        "id": "accessibility-report",
        "title": "The Most Common Accessibility Issues Found on Business Websites (and How to Fix Them)",
        "summary": "From missing alt text to low contrast and keyboard navigation problems — discover the top accessibility mistakes companies make and how to fix them before they cause compliance issues.",
        "url_endpoint": "accessibility_report",
        "category_slug": "accessibility-compliance",
        "category_name": "Accessibility & WCAG Compliance",
        "read_time": "6 min read",
        "date": "Sep 2026",
        "icon": "fas fa-universal-access",
    },
]


def get_categories_with_counts():
    """Return all categories with their dynamic article counts."""
    categories = []
    for slug, data in BLOG_CATEGORIES.items():
        cat = dict(data)
        cat["count"] = sum(1 for p in BLOG_POSTS if p["category_slug"] == slug)
        categories.append(cat)
    return categories


def get_category_by_slug(slug):
    """Retrieve category details by slug, including post count."""
    if slug not in BLOG_CATEGORIES:
        return None
    cat = dict(BLOG_CATEGORIES[slug])
    cat["count"] = sum(1 for p in BLOG_POSTS if p["category_slug"] == slug)
    return cat


def get_posts_by_category(slug=None):
    """Retrieve posts filtered by category slug, or all posts if None."""
    if not slug:
        return BLOG_POSTS
    return [p for p in BLOG_POSTS if p["category_slug"] == slug]

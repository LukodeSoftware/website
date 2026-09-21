import os
import logging
from flask import Flask, render_template, request, jsonify, flash, redirect, url_for, send_from_directory

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Routes


@app.route('/')
@app.route('/home')
def home():
    """Home page with all services"""
    return render_template('index.html', page_title="Lukode AI & Software Quality | Independent Testing & Quality Engineering")


# Compliance Audits Service

@app.route('/services/compliance-audits')
@app.route('/services/accessibility-testing')
def compliance_audits():
    """Accessibility & WCAG testing service page"""
    return render_template('compliance_audits.html', page_title="Accessibility & WCAG Testing Services | Lukode")


# AI Testing & Validation Service

@app.route('/services/seo')
@app.route('/services/ai-testing')
def ai_testing():
    """AI Testing & Validation service page"""
    return render_template('ai_testing.html', page_title="AI Testing & Validation Services | LLM & AI Agent QA | Lukode")


# Software Testing Service

@app.route('/services/software-testing')
def software_testing():
    """Software testing and quality engineering service page"""
    return render_template('software_testing.html', page_title="Software Testing & Quality Engineering Services | Lukode")


@app.route('/privacypolicy')
def privacypolicy():
    return render_template('privacypolicy.html', page_title="Privacy Policy | Lukode AI & Software Quality")


@app.route('/blog')
@app.route('/insights')
def blog():
    return render_template('blog/blog.html', page_title="Lukode AI & Software Quality Blog | Insights & QA Engineering")


@app.route('/eu-accessibility-act-compliance')
def eu_accessibility_act_compliance():
    return render_template('blog/eu_accessibility_act_compliance.html', page_title="EU Accessibility Act Compliance: Is Your Business Ready? | Lukode")


@app.route('/accessibility-report')
def accessibility_report():
    return render_template('blog/accessibility_report.html', page_title="Common Accessibility Issues & Remediation Guide | Lukode Blog")


@app.route('/coming-soon')
def coming_soon():
    """Coming soon page for services under development"""
    return render_template('coming_soon.html', page_title="Coming Soon | Lukode AI & Software Quality")


@app.route('/robots.txt')
def robots():
    """Serve robots.txt for search engine crawlers"""
    return send_from_directory(app.static_folder, 'robots.txt')


@app.route('/sitemap.xml')
def sitemap():
    """Serve XML sitemap for search engines"""
    return send_from_directory(app.static_folder, 'sitemap.xml', mimetype='application/xml')


@app.route('/contact', methods=['POST'])
def contact():
    """
    Handle contact form submissions (fallback for non-JavaScript users)
    Note: Primary contact form submission is now handled by EmailJS
    """
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject', 'Contact Form Submission')
        message = request.form.get('message')

        # Log the form submission (this is a fallback in case JavaScript is disabled)
        logging.info(
            f"Server-side contact form submission: {name} ({email}): {subject} - {message}")

        # Flash a success message
        flash('Thank you for your message! We will get back to you soon.', 'success')

        # Determine which page the form was submitted from to redirect back properly
        referrer = request.referrer or ''

        if 'compliance-audits' in referrer or 'accessibility-testing' in referrer:
            return redirect(url_for('compliance_audits', _anchor='contact'))
        elif 'software-testing' in referrer:
            return redirect(url_for('software_testing', _anchor='contact'))
        elif 'ai-testing' in referrer or 'seo' in referrer:
            return redirect(url_for('ai_testing', _anchor='contact'))
        else:
            return redirect(url_for('home', _anchor='contact'))
    except Exception as e:
        logging.error(f"Error processing contact form: {str(e)}")
        flash('There was an error processing your request. Please try again.', 'error')

        # Determine which page the form was submitted from to redirect back properly
        referrer = request.referrer or ''

        if 'compliance-audits' in referrer or 'accessibility-testing' in referrer:
            return redirect(url_for('compliance_audits', _anchor='contact'))
        elif 'software-testing' in referrer:
            return redirect(url_for('software_testing', _anchor='contact'))
        elif 'ai-testing' in referrer or 'seo' in referrer:
            return redirect(url_for('ai_testing', _anchor='contact'))
        else:
            return redirect(url_for('home', _anchor='contact'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

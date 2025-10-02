import os
import logging
from flask import Flask, render_template, request, jsonify, flash, redirect, url_for

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
    return render_template('index.html', page_title="Lukode - Unique Software Solutions")


# Compliance Audits Service

@app.route('/services/compliance-audits')
def compliance_audits():
    """WCAG compliance audits service page"""
    return render_template('compliance_audits.html', page_title="Lukode - Compliance Audits")


# SEO Enhancements Service

@app.route('/services/seo')
def seo_enhancements():
    """SEO enhancements service page"""
    return render_template('seo_enhancements.html', page_title="Lukode - SEO Enhancements")


# Software Testing Service

@app.route('/services/software-testing')
def software_testing():
    """Software testing service page"""
    return render_template('software_testing.html', page_title="Lukode - Software Testing")


@app.route('/privacypolicy')
def privacypolicy():
    return render_template('privacypolicy.html', page_title="Lukode - Privacy Policy")


@app.route('/blog')
def blog():
    return render_template('blog.html', page_title="Lukode - Blog")


@app.route('/coming-soon')
def coming_soon():
    """Coming soon page for services under development"""
    return render_template('coming_soon.html', page_title="Lukode - Unique Software Solutions")


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

        if 'compliance_audits' in referrer:
            return redirect(url_for('compliance_audits', _anchor='contact'))
        elif '/services/software-testing' in referrer:
            return redirect(url_for('software_testing', _anchor='contact'))
        elif '/services/seo_enhancements' in referrer:
            return redirect(url_for('seo_enhancements', _anchor='contact'))
        else:
            return redirect(url_for('home', _anchor='contact'))
    except Exception as e:
        logging.error(f"Error processing contact form: {str(e)}")
        flash('There was an error processing your request. Please try again.', 'error')

        # Determine which page the form was submitted from to redirect back properly
        referrer = request.referrer or ''

        if 'compliance_audits' in referrer:
            return redirect(url_for('compliance_audits', _anchor='contact'))
        elif '/services/software-testing' in referrer:
            return redirect(url_for('software_testing', _anchor='contact'))
        elif '/services/seo_enhancements' in referrer:
            return redirect(url_for('seo_enhancements', _anchor='contact'))
        else:
            return redirect(url_for('home', _anchor='contact'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

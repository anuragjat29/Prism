from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sys
import os

if sys.platform.startswith("win"):
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

from pipeline import run

# Define static folder as frontend/dist
app = Flask(__name__, static_folder='frontend/dist', static_url_path='')
CORS(app)

@app.route('/api/research', methods=['POST'])
def research():
    data = request.json or {}
    query = data.get('query', '')
    if not query:
        return jsonify({'error': 'Query is required'}), 400

    from router import router_chain
    intent = router_chain.invoke({'query': query}).strip()
    result = run(query)
    return jsonify({'result': result, 'intent': intent})

# Serve frontend static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

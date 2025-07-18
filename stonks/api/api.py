from flask import Flask, request, jsonify
from flask_cors import CORS
from models import init_db, insert_stock, get_stocks, get_last_value
import threading, time, random
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

STONK_NAMES = ["STONK1", "STONK2", "STONK3", "STONK4", "STONK5", "STONK6", "STONK7", "STONK8", "STONK9"]

def auto_generate():
    while True:
        for stonk in STONK_NAMES:
            last = get_last_value(stonk)
            if last is None:
                last = 100.0  # Startwaarde
            change = random.uniform(-0.02, 0.02)  # Willekeurige verandering tussen -2% en +2%
            new_value = round(last * (1 + change), 2)
            insert_stock(stonk, new_value)
        time.sleep(30)

@app.route("/api/stocks", methods=["GET"])
def fetch():
    return jsonify(get_stocks())

@app.route("/api/update", methods=["POST"])
def update():
    data = request.json
    timestamp = data.get("timestamp")
    if not timestamp:
        timestamp = datetime.now().isoformat()
    insert_stock(data["stock"], float(data["value"]), timestamp)
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    init_db()
    threading.Thread(target=auto_generate, daemon=True).start()
    app.run(host="0.0.0.0", port=80)

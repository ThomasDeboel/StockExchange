from flask import Flask, request, jsonify
from flask_cors import CORS
from models import init_db, insert_stock, get_stocks, get_last_value
import threading, time, random

app = Flask(__name__)
CORS(app)

STONK_NAMES = ["STONK1", "STONK2", "STONK3", "STONK4", "STONK5", "STONK6", "STONK7", "STONK8", "STONK9"]

def auto_generate():
    while True:
        for stonk in STONK_NAMES:
            last = get_last_value(stonk)
            if last is None:
                last = 100.0  # Startwaarde
            change = random.uniform(-0.05, 0.05)
            new_value = round(last * (1 + change), 2)
            insert_stock(stonk, new_value)
        time.sleep(30)

@app.route("/api/stocks", methods=["GET"])
def fetch():
    return jsonify(get_stocks())

@app.route("/api/update", methods=["POST"])
def update():
    data = request.json
    insert_stock(data["stock"], float(data["value"]), data.get("timestamp"))
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    init_db()
    threading.Thread(target=auto_generate, daemon=True).start()
    app.run(host="0.0.0.0", port=5000)

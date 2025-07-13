import sqlite3
from datetime import datetime
import os

DB_DIR = "data"
DB = os.path.join(DB_DIR, "database.db")

def init_db():
    os.makedirs(DB_DIR, exist_ok=True)  # zorg dat map bestaat
    with sqlite3.connect(DB) as conn:
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS stocks (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                value REAL NOT NULL,
                timestamp TEXT NOT NULL
            )
        ''')
        conn.commit()

def insert_stock(name, value, timestamp=None):
    if timestamp is None:
        timestamp = datetime.now().replace(microsecond=0).isoformat()
    with sqlite3.connect(DB) as conn:
        c = conn.cursor()
        c.execute("INSERT INTO stocks (name, value, timestamp) VALUES (?, ?, ?)", (name, value, timestamp))
        conn.commit()

def get_stocks():
    now = datetime.now().isoformat()

    with sqlite3.connect(DB) as conn:
        c = conn.cursor()
        c.execute("SELECT name, value, timestamp FROM stocks WHERE timestamp <= ? ORDER BY timestamp", (now,))
        rows = c.fetchall()

    stocks = {}
    for name, value, ts in rows:
        if name not in stocks:
            stocks[name] = {"prices": [], "timestamps": []}
        stocks[name]["prices"].append(value)
        stocks[name]["timestamps"].append(ts)
    return stocks
def get_last_value(name):
    with sqlite3.connect(DB) as conn:
        c = conn.cursor()
        c.execute("SELECT value, timestamp FROM stocks WHERE name = ? ORDER BY timestamp DESC LIMIT 1", (name,))
        row = c.fetchone()
        if row:
            value, ts = row
            now = datetime.now().isoformat()
            if ts <= now:
                return value
            else:
                # If the latest timestamp is in the future, we need to get the second latest
                # This can happen if the last entry was added with a future timestamp
                # We will return the second latest value instead
                c.execute("SELECT value, timestamp FROM stocks WHERE name = ? ORDER BY timestamp DESC LIMIT 1 OFFSET 1", (name,))
                row2 = c.fetchone()
                if row2:
                    value2, _ = row2
                    return value2
        return None

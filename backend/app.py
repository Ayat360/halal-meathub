from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
)
from dotenv import load_dotenv

import sqlite3
import json
import os


# Load variables from backend/.env
load_dotenv()


app = Flask(__name__)

CORS(app)


# =========================================================
# ENVIRONMENT SETTINGS
# =========================================================

JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")


if not JWT_SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY is missing from .env")

if not ADMIN_USERNAME:
    raise RuntimeError("ADMIN_USERNAME is missing from .env")

if not ADMIN_PASSWORD:
    raise RuntimeError("ADMIN_PASSWORD is missing from .env")


app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY

jwt = JWTManager(app)


# =========================================================
# DATABASE
# =========================================================

DATABASE = "sharing.db"


def get_db():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def create_database():
    connection = get_db()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS sharing (
            id INTEGER PRIMARY KEY,
            data TEXT NOT NULL
        )
    """)

    existing = connection.execute(
        "SELECT id FROM sharing WHERE id = 1"
    ).fetchone()

    if not existing:
        default_data = {
            "meats": [
                {
                    "name": "Cow",
                    "available": True,
                    "price": "25000",
                    "portions": "8",
                    "portionSize": "Large share",
                    "status": "Available",
                    "collection": True,
                    "dispatch": True,
                },
                {
                    "name": "Goat",
                    "available": True,
                    "price": "20000",
                    "portions": "12",
                    "portionSize": "Large share",
                    "status": "Sharing now",
                    "collection": True,
                    "dispatch": True,
                },
                {
                    "name": "Ram",
                    "available": True,
                    "price": "30000",
                    "portions": "5",
                    "portionSize": "Large share",
                    "status": "Available",
                    "collection": True,
                    "dispatch": True,
                },
            ],
            "announcement": (
                "Today's sharing is currently underway. "
                "Contact the Hub before travelling to confirm availability."
            ),
        }

        connection.execute(
            "INSERT INTO sharing (id, data) VALUES (?, ?)",
            (1, json.dumps(default_data)),
        )

    connection.commit()
    connection.close()


# =========================================================
# ADMIN LOGIN
# =========================================================

@app.post("/api/admin/login")
def admin_login():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No login information received"
        }), 400

    username = data.get("username")
    password = data.get("password")

    if (
        username != ADMIN_USERNAME
        or password != ADMIN_PASSWORD
    ):
        return jsonify({
            "error": "Invalid username or password"
        }), 401

    token = create_access_token(
        identity=username
    )

    return jsonify({
        "message": "Login successful",
        "token": token,
    })


# =========================================================
# PUBLIC — GET TODAY'S SHARING
# =========================================================

@app.get("/api/sharing")
def get_sharing():
    connection = get_db()

    row = connection.execute(
        "SELECT data FROM sharing WHERE id = 1"
    ).fetchone()

    connection.close()

    if not row:
        return jsonify({
            "error": "Sharing data not found"
        }), 404

    return jsonify(
        json.loads(row["data"])
    )


# =========================================================
# ADMIN — UPDATE TODAY'S SHARING
# =========================================================

@app.put("/api/sharing")
@jwt_required()
def update_sharing():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No data received"
        }), 400

    if "meats" not in data:
        return jsonify({
            "error": "Meat data is required"
        }), 400

    if "announcement" not in data:
        data["announcement"] = ""

    connection = get_db()

    connection.execute(
        "UPDATE sharing SET data = ? WHERE id = 1",
        (json.dumps(data),),
    )

    connection.commit()
    connection.close()

    return jsonify({
        "message": "Today's Sharing updated successfully.",
        "data": data,
    })


# =========================================================
# START SERVER
# =========================================================

if __name__ == "__main__":
    create_database()

    app.run(
        debug=True,
        port=5000,
    )
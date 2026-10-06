from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
)
from dotenv import load_dotenv

import json
import os

import psycopg
from psycopg.rows import dict_row


load_dotenv()


app = Flask(__name__)
CORS(app)


# -----------------------------
# Environment variables
# -----------------------------

DATABASE_URL = os.environ.get("DATABASE_URL")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")


if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is missing from .env")

if not JWT_SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY is missing from .env")

if not ADMIN_USERNAME:
    raise RuntimeError("ADMIN_USERNAME is missing from .env")

if not ADMIN_PASSWORD:
    raise RuntimeError("ADMIN_PASSWORD is missing from .env")


app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
jwt = JWTManager(app)


# -----------------------------
# Database connection
# -----------------------------

def get_db():
    return psycopg.connect(
        DATABASE_URL,
        row_factory=dict_row,
    )


# -----------------------------
# Create database table
# -----------------------------

def create_database():
    connection = get_db()

    try:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS sharing (
                id INTEGER PRIMARY KEY,
                data JSONB NOT NULL
            )
            """
        )

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
                """
                INSERT INTO sharing (id, data)
                VALUES (%s, %s::jsonb)
                """,
                (1, json.dumps(default_data)),
            )

        connection.commit()

    finally:
        connection.close()


# -----------------------------
# Admin login
# -----------------------------

@app.post("/api/admin/login")
def admin_login():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No login information received"
        }), 400

    username = data.get("username")
    password = data.get("password")

    if username != ADMIN_USERNAME or password != ADMIN_PASSWORD:
        return jsonify({
            "error": "Invalid username or password"
        }), 401

    token = create_access_token(identity=username)

    return jsonify({
        "message": "Login successful",
        "token": token,
    })


# -----------------------------
# Public sharing data
# -----------------------------

@app.get("/api/sharing")
def get_sharing():
    connection = get_db()

    try:
        row = connection.execute(
            "SELECT data FROM sharing WHERE id = 1"
        ).fetchone()

        if not row:
            return jsonify({
                "error": "Sharing data not found"
            }), 404

        return jsonify(row["data"])

    finally:
        connection.close()


# -----------------------------
# Update sharing data
# -----------------------------

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

    try:
        connection.execute(
            """
            UPDATE sharing
            SET data = %s::jsonb
            WHERE id = 1
            """,
            (json.dumps(data),),
        )

        connection.commit()

        return jsonify({
            "message": "Today's Sharing updated successfully.",
            "data": data,
        })

    finally:
        connection.close()


# -----------------------------
# Start server
# -----------------------------

if __name__ == "__main__":
    create_database()

    app.run(
        debug=True,
        port=5000,
    )
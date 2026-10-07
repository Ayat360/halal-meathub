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

CORS(
app,
resources={
r"/api/*": {
"origins": [
"http://localhost:5173",
"http://127.0.0.1:5173",
"https://halal-meathub.vercel.app",
]
}
},
)



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

        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS reservations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                phone VARCHAR(40) NOT NULL,
                meat VARCHAR(30) NOT NULL,
                share VARCHAR(100) NOT NULL,
                quantity INTEGER NOT NULL DEFAULT 1,
                method VARCHAR(30) NOT NULL,
                address TEXT,
                note TEXT,
                status VARCHAR(30) NOT NULL DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
# Customer reservations
# -----------------------------

@app.post("/api/reservations")
def create_reservation():
    data = request.get_json() or {}

    required_fields = [
        "name",
        "phone",
        "meat",
        "share",
        "quantity",
        "method",
    ]

    for field in required_fields:
        if not data.get(field):
            return jsonify({
                "message": f"{field} is required."
            }), 400

    if data["method"] == "Delivery" and not data.get("address"):
        return jsonify({
            "message": "Delivery address is required."
        }), 400

    try:
        quantity = int(data["quantity"])

        if quantity < 1:
            raise ValueError

    except (TypeError, ValueError):
        return jsonify({
            "message": "Quantity must be at least 1."
        }), 400

    connection = get_db()

    try:
        row = connection.execute(
            """
            INSERT INTO reservations (
                name,
                phone,
                meat,
                share,
                quantity,
                method,
                address,
                note
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
            """,
            (
                data["name"].strip(),
                data["phone"].strip(),
                data["meat"],
                data["share"],
                quantity,
                data["method"],
                data.get("address", "").strip(),
                data.get("note", "").strip(),
            ),
        ).fetchone()

        connection.commit()

        return jsonify({
            "message": "Reservation received successfully.",
            "reservation_id": row["id"],
        }), 201

    finally:
        connection.close()

# -----------------------------
# Admin reservations
# -----------------------------

@app.get("/api/admin/reservations")
@jwt_required()
def get_reservations():
    connection = get_db()

    try:
        rows = connection.execute(
            """
            SELECT
                id,
                name,
                phone,
                meat,
                share,
                quantity,
                method,
                address,
                note,
                status,
                created_at
            FROM reservations
            ORDER BY created_at DESC
            """
        ).fetchall()

        reservations = []

        for row in rows:
            reservations.append({
                "id": row["id"],
                "name": row["name"],
                "phone": row["phone"],
                "meat": row["meat"],
                "share": row["share"],
                "quantity": row["quantity"],
                "method": row["method"],
                "address": row["address"],
                "note": row["note"],
                "status": row["status"],
                "created_at": (
                    row["created_at"].isoformat()
                    if row["created_at"]
                    else None
                ),
            })

        return jsonify(reservations), 200

    finally:
        connection.close()


# -----------------------------
# Update reservation status
# -----------------------------

@app.put("/api/admin/reservations/<int:reservation_id>")
@jwt_required()
def update_reservation(reservation_id):
    data = request.get_json() or {}
    status = data.get("status")

    allowed_statuses = [
        "Pending",
        "Confirmed",
        "Preparing",
        "Ready",
        "Dispatched",
        "Completed",
        "Cancelled",
    ]

    if status not in allowed_statuses:
        return jsonify({
            "message": "Invalid reservation status."
        }), 400

    connection = get_db()

    try:
        row = connection.execute(
            """
            UPDATE reservations
            SET status = %s
            WHERE id = %s
            RETURNING id
            """,
            (status, reservation_id),
        ).fetchone()

        connection.commit()

        if not row:
            return jsonify({
                "message": "Reservation not found."
            }), 404

        return jsonify({
            "message": "Reservation updated successfully."
        }), 200

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

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False,
    )
from flask import Flask, render_template, request
from replit import db

locked = False

app = Flask("app")


@app.route("/")
def hello_world():
    return render_template("index.html",
                           user_id=request.headers["X-Replit-User-Id"],
                           user_name=request.headers["X-Replit-User-Name"],
                           user_roles=request.headers["X-Replit-User-Roles"],
                           story=db["story"],
                           last_author_user_name=db["last_author_user_name"])


@app.route("/new")
def new_story():
    global locked
    locked = False
    db["story"] = "Once upon a time,"
    db["last_author_user_name"] = "nobody"
    db["last_author_user_id"] = "-1"
    return render_template("index.html",
                           user_id=request.headers["X-Replit-User-Id"],
                           user_name=request.headers["X-Replit-User-Name"],
                           user_roles=request.headers["X-Replit-User-Roles"],
                           story=db["story"],
                           last_author_user_name=db["last_author_user_name"])


@app.route("/write/<word>")
def write_word(word):
    global locked
    print(word)
    if locked == True:
        return {
            "success": False,
            "error": "The story has ended and is now forever locked."
        }, 401
    if request.headers["X-Replit-User-Name"] and request.headers[
            "X-Replit-User-Id"] and request.headers[
                "X-Replit-User-Name"] != "malted" and request.headers[
                    "X-Replit-User-Id"] == db["last_author_user_id"]:
        return {
            "success":
            False,
            "error":
            "You can not submit two subsequent words! Let someone else write one first."
        }, 401
    else:
        db["story"] += " " + word.strip()
        db["last_author_user_name"] = request.headers["X-Replit-User-Name"]
        db["user_id"] = request.headers["X-Replit-User-Id"]

        if " ".join(db["story"].split(' ')[-2:]).lower() == "the end.":
            locked = True
            return {"success": False, "error": "They story has ene"}
        return {"success": True}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)

from flask import Flask, render_template, request, Response
from replit import db
import json

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

# @app.route("/new")
# def new_story():
#     global locked
#     locked = False
#     db["story"] = "Once upon a time,"
#     db["last_author_user_name"] = "nobody"
#     db["last_author_user_id"] = "-1"
#     return render_template("index.html",
#                            user_id=request.headers["X-Replit-User-Id"],
#                            user_name=request.headers["X-Replit-User-Name"],
#                            user_roles=request.headers["X-Replit-User-Roles"],
#                            story=db["story"],
#                            last_author_user_name=db["last_author_user_name"])

# @app.route("/story")
# def story():
#     return db["story"]

@app.route("/write/<word>")
def write_word(word):
    global locked
    if locked == True:
        return Response("{'success':false,'error':'The story is locked, so no new words can be written.'}", status=401, mimetype="application/json")
    if request.headers["X-Replit-User-Name"] and request.headers[
            "X-Replit-User-Id"] and request.headers[
                    "X-Replit-User-Id"] == db["last_author_user_id"]:
        return Response("{'success':false,'error':'You can not write another word after you also wrote the previous one.'}", status=401, mimetype="application/json")
    else:
        db["story"] += " " + word.strip()
        db["last_author_user_name"] = request.headers["X-Replit-User-Name"]
        db["user_id"] = request.headers["X-Replit-User-Id"]

        if " ".join(db["story"].split(' ')[-2:]).lower() == "the end.":
            locked = True
            return Response("{'success':true,'locked':true}", status=200, mimetype="application/json")
        return Response("{'success':true}", status=200, mimetype="application/json")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)

from Movie_Recommendation import recommend
from flask import Flask, request, render_template
app=Flask(__name__)

@app.route('/')
def home():
    return render_template('new.html')

@app.route('/recomm', methods=['POST'])
def recomm():
    name = [x for x in request.form.values()]
    print(name)
    val = recommend(name[0])
    return render_template('new.html', recommended_text = val)

if __name__ == '__main__':
    app.run(debug=True)
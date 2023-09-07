from flask import Flask, render_template, request, session, redirect
import json
import os
app = Flask(__name__, static_url_path='/static')
app.secret_key = 'your_secret_key'  # Set a secret key for session encryption


@app.route('/')
def index():
    if 'email' in session:
        # User is already logged in
        return redirect('/dashboard')
    else:
        return render_template('index.html')


@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    # Perform authentication and database operations here
    # Example: check if email and password match a user record in the database

    # If authentication is successful
    session['email'] = email

    # Save the user data to the JSON file
    data = {
        'email': email,
        'password': password
    }
    save_user_data(data)

    return redirect('/dashboard')

def save_user_data(data):
    file_path = 'instance/Database/data.json'

    with open(file_path, 'r') as file:
        existing_data = json.load(file)
        print("Existing data:", existing_data)

    existing_data.append(data)

    with open(file_path, 'w') as file:
        json.dump(existing_data, file)


def get_user_data():
    file_path = 'instance/Database/users.json'

    with open(file_path, 'r') as file:
        data = json.load(file)

    return data


@app.route('/dashboard')
def dashboard():
    if 'email' in session:
        email = session['email']
        data = get_user_data()
        
        # Render the dashboard with user-specific data
        return render_template('dashboard.html', email=email, data=data)
    else:
        return redirect('/')
@app.route('/register', methods=['POST'])
def register():
    new_email = request.form['new-email']
    new_password = request.form['new-password']

    # Perform registration and database operations here
    # Example: check if the email is already registered, if not, save the new user

    # Save the user data to the JSON file
    data = {
        'email': new_email,
        'password': new_password
    }
    save_user_data(data)

    # You can redirect to a success page or login the user directly
    return redirect('/success')


@app.route('/logout')
def logout():
    session.pop('email', None)
    return redirect('/')


if __name__ == '__main__':
    app.run()

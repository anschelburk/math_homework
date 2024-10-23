# Math Homework

Copyright © 2024 Anschel Burk. All rights not explicitly granted in [this project's license](LICENSE.txt) reserved.

![Math Homework](https://github.com/user-attachments/assets/1471e9fb-a3ba-4923-a806-ca786a5c5d1d)

---

## 1. Description

A visual, intuitive interface to type and draw high school math problems on a computer. Designed to be simple and intuitive for all users, neurotypical or neurodivergent.

This app is powered by [Django](https://www.djangoproject.com/), and uses a [PostgreSQL](https://www.postgresql.org/) database. Math Keyboard feature powered by [CortexJS](https://cortexjs.io/mathlive/), drawing feature powered by [Fabric.js](http://fabricjs.com/docs/). Originally developed as a capstone project in the [Pybites Python Developer Mindset (PDM) Program](https://pybit.es/catalogue/the-pdm-program/), this project is under active development.

## 2. License

Copyright © 2024 Anschel Burk. All rights not explicitly granted in [this project's license](LICENSE.txt) reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See this project's [LICENSE.txt](LICENSE.txt) file for the specific language governing permissions and limitations under the License.

## 3. Features

- **Visual Math Keyboard:** Write math problems using a visual, intuitive keyboard designed specifically for middle & high school math classes. Powered by [CortexJS](https://cortexjs.io/mathlive/).
- **Graphing & Drawing Tool:** Draw graphs and pictures with ease using the included drawing tool. Powered by [Fabric.js](http://fabricjs.com/docs/).
- **User-Friendly Interface:** This project's interface is designed to be simple, and intuitive, making it easy to focus on math problems without getting distracted by complicated menus or unnecessary features.

## 4. Installation & Dependencies

#### 1. Clone this repository.

HTTPS:
```
git clone https://github.com/anschelburk/Math-Homework.git
```

SSH:
```
git clone git@github.com:anschelburk/Math-Homework.git
```

#### 2. Create a virtual environment and install this project's dependencies.

Windows (PowerShell):
```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Linux & MacOS:
```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### 3. Create a PostgreSQL database for this project.

**Please Note:** When you create this PostgreSQL database, you will be prompted to create a username, password, and name for the database. Please keep this information - you will need it later (in [**Step 4b**](#4b-configuring-the-database_url-environment-variable)) in order for this app to communicate with your local database.

- [Download PostgreSQL](https://www.postgresql.org/download/)
- Create a database. For step-by-step instructions on creating a database, please see the [PostgreSQL 17rc Documentation](https://www.postgresql.org/files/documentation/pdf/17/postgresql-17-US.pdf), page 4, Section 1.3.

#### 4. Create a .env file using the provided template.

This app uses the `python-decouple` library to manage environment variables, using a local `.env` file which must be configured prior to use. To do this, follow the instructions below.

- Locate the provided `.env_template` in the project directory, and copy it. Name the copy `.env`.

- Open the new `.env` file, where you will find four lines of text:

```
SECRET_KEY=
DATABASE_URL=
ALLOWED_HOSTS=[]
DEBUG=
```

[`SECRET_KEY`](https://docs.djangoproject.com/en/5.1/ref/settings/#std-setting-SECRET_KEY), [`ALLOWED_HOSTS`](https://docs.djangoproject.com/en/5.1/ref/settings/#allowed-hosts), and [`DEBUG`](https://docs.djangoproject.com/en/5.1/ref/settings/#debug) are Django settings, which must be manually configured prior to use. (Instructions are included below.)

`DATABASE_URL` is the URL for the PostgreSQL database you created in [**Step 3**](#3-create-a-postgresql-database-for-this-project).

Here's how to configure each of these environment variables.

#### 4a. Configuring the `SECRET_KEY` environment variable.

Django uses this setting to provide cryptographic signing. It should be set to a unique, unpredictable value, which Django will generate for you. (For more information on this setting, please see [Django's documentation](https://docs.djangoproject.com/en/5.1/ref/settings/#std-setting-SECRET_KEY).)

Here's how to set this up.

**Open a terminal window in this project's directory. Make sure the virtual environment is running, and all this project's dependencies have been installed. (If you haven't done these things yet, please see [Step 2](#2-create-a-virtual-environment-and-install-this-projects-dependencies).)**

**In that terminal window, activate the Python interactive console:**

Windows (PowerShell):
```
python
```

Linux/MacOS:
```
python3
```

**Generate a new Django secret key using the following terminal commands:**

Python Interactive Console (for all operating systems):
```
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

**Copy that secret key, and paste it as a string next to `SECRET_KEY =` in your local `.env` file.**

For example, if Django generates the following secret key for you:

```
abcdefghijklmnop1234567890
```

Then the `SECRET_KEY` line of your `.env` file should look like this:

```
SECRET_KEY='abcdefghijklmnop1234567890'
```

**Finally, exit the Python interactive console using the following command.**

Python Interactive Console (for all operating systems):
```
quit()
```

#### 4b. Configuring the `DATABASE_URL` environment variable.

This project uses a PostgreSQL database, which you set up in [**Step 3**](#3-create-a-postgresql-database-for-this-project). In order for this app to communicate with that database, you need to input the database's URL into as an environment variable in your local repo's `.env` file.

In order to do that: you'll need the following information:

- **Database Username:** You configured this in [**Step 3**](#3-create-a-postgresql-database-for-this-project).
- **Database Password:** You configured this in [**Step 3**](#3-create-a-postgresql-database-for-this-project).
- **Host:** Regardless of which operating system you use, this is typically `localhost` or `127.0.0.1`.
- **Port:** Regardless of which operating system you use, this is typically `5432`.
- **Database Name:** You configured this in [**Step 3**](#3-create-a-postgresql-database-for-this-project).

Using this information, construct your local database's URL using the following structure:

```
postgres://username:password@host:port/databasename
```

For example, let's say your database information looked like this:

- **Username:** john
- **Password:** defaultpass
- **Host:** localhost
- **Port:** 5432
- **Database Name:** sampledb

Then your database's URL would look like this:

```
postgres://john:defaultpass@localhost:5432/sampledb
```

Once you have your database's URL, paste it into your `.env` file. The example above would look like this:

```
DATABASE_URL=postgres://john:defaultpass@localhost:5432/sampledb
```

#### 4c. Configuring the `ALLOWED_HOSTS` environment variable.

Django uses the `ALLOWED_HOSTS` setting as a security measure to clarify which host/domain names that this Django project can serve. (For more information on this setting, please see [Django's documentation](https://docs.djangoproject.com/en/5.1/ref/settings/#allowed-hosts).)

This setting is incredibly easy to configure. Simply copy the **HOST** you used in your database URL in [**Step 4b**](#4b-configuring-the-database_url-environment-variable), and paste it in your local repo's `.env` file.

For example, if the **HOST** from your database URL was `localhost`, then the `ALLOWED_HOSTS` environment variable in this project's `.env` file should look like this:

```
ALLOWED_HOSTS=localhost
```

*Optional: If you would like to allow multiple hosts, simply add them as a list to the `ALLOWED_HOSTS` variable in your local repo's `.env` file. For example, all three of the following would be valid:*

```
ALLOWED_HOSTS=[localhost, 127.0.0.1]
ALLOWED_HOSTS=(localhost, 127.0.0.1)
ALLOWED_HOSTS=localhost, 127.0.0.1
```

#### 4d. Configuring the `DEBUG` environment variable.

Django uses a setting, `DEBUG`, to toggle debug mode on and off. This project abstracts that setting as an environment variable. (For more information on Django's `DEBUG` setting, please see [their documentation](https://docs.djangoproject.com/en/5.1/ref/settings/#debug).)

This setting should typically be set to `False` - meaning, in other words, that debug mode is turned off.

This means that in your local repo's `.env` file, the `DEBUG` environment variable should look like this:

```
DEBUG=False
```

If at any point you would like to enable debug mode, simply toggle that value to `True`.

**Congratulations! Now that you've configured the environment variables, you're nearly done. The last two steps are quick and easy.**

#### 5. Migrate database models to your PostgreSQL database.

Before you can use your PostgreSQL database, you need to configure it by migrating the appropriate database models. Django makes this very easy to do.

From the project directory, navigate to the `mysite` directory, and then use the following terminal commands to migrate the necessary database models to your PostgreSQL database:

Windows (PowerShell):
```
cd mysite
python manage.py makemigrations
python manage.py migrate
```

Linux & MacOS:
```
cd mysite
python3 manage.py makemigrations
python3 manage.py migrate
```

#### 6. And, run the project! Instructions onscreen will guide you through the process of creating an account and accessing the project's features!

From the project directory, navigate to the `mysite` directory, and then use Django to run the project on a local server.

**Note:** when you do this, a server log will automatically appear in your terminal window. To stop running the project (on any operating system), simply go to this server log and type `CTRL` `C` at any time.

Windows (PowerShell):
```
cd mysite
python manage.py runserver
```

Linux & MacOS:
```
cd mysite
python3 manage.py runserver
```

**Enjoy!**

# Shopzify E-Commerce Admin

Built with the MERN stack (MongoDB, Express, React and NodeJS).

## Project Link

- Shopzify Main: https://shopzify-client.onrender.com/
- Shopzify Admin: https://shopzify-admin.onrender.com/

### Shopzify Admin Login Credentials

- Email:- admin@shopzify.com
- Pass:- admin12345

## 🎯 Key Features

<ul>
<li>Authentication using jsonwebtoken (JWT)</li>
<li>Create, Update and Delete Navbar menu details from admin</li>
<li>Products Create, View and Update functionality</li>
<li>Products search, sort and filter functionality</li>
<li>Track and Update order status in real-time from admin</li>
</ul>

## 🎓 Technologies used

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://chakra-ui.com/">Chakra UI</a></li>
    <li><a href="https://redux-toolkit.js.org/">Redux Toolkit</a></li>
    <li><a href="https://redux-toolkit.js.org/rtk-query/overview">RTK Query</a></li>
    <li><a href="https://cloudinary.com/">Cloudinary</a></li>
    <li><a href="https://www.ag-grid.com/">AG-Grid</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/">Express</a></li>
    <li><a href="https://mongoosejs.com/">Mongoose</a></li>
    <li><a href="https://jwt.io/">JWT</a></li>
    <li><a href="https://github.com/kelektiv/node.bcrypt.js">bcrypt</a></li>

  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

# Configuration and Setup

This repository contains the admin code for the Shopzify application. Follow the instructions below to set up the project and run it locally.

## Getting Started

To get started, clone the repository to your local machine using the following command:

```shell
git clone https://github.com/harshsimform/Shopzify-Admin.git
```

Change your current directory to the cloned repository:

```shell
cd Shopzify-Admin/
```

### Setting Environment Variables

Create an `.env` file inside the `/Shopzify-Admin` folder and add the following variables:

```dotenv
DATABASE_URL=
ACCESS_TOKEN=
REFRESH_TOKEN=
```

Make sure to fill in the values for each variable accordingly.

### MongoDB Setup

To set up the MongoDB database, follow the steps below:

1. Obtain the JSON file containing the collection data from the /collection folder in this repository.
2. Import the JSON file into your MongoDB new cluster.
3. Copy the cluster link (database access URL) and paste it in the .env file as the value for DATABASE_URL.

## Installing Dependencies

Install the backend dependencies by running the following command:

```shell
yarn
```

Change your current directory to the `admin/` folder:

```shell
cd admin/
```

Install the admin-side dependencies by running the following command:

```shell
yarn
```

## Building and Running the Project

To build the admin-side code, run the following command:

```shell
yarn build
```

To run the project locally, execute the following command:

```shell
yarn dev
```

Once the project is running, you can access it in your browser at [http://localhost:3000/](http://localhost:3000/).

## Comment

I intend to keep adding more features to this application, so if you like it, please give it a star, that will encourage me to
to keep improving the project, Thank you.

## Conclusion

You have successfully set up the Shopzify admin-side project on your local machine. Feel free to explore the code and make any necessary modifications to suit your needs.

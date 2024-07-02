## Project Title

SEA Salon - Beauty and Elegance Redefined
link website : [https://seasalon-two.vercel.app/](https://seasalon-two.vercel.app/)

## Project Overview

SEA Salon is a web application that allows users to make reservations, view reservation history, and manage their appointments easily. The project is built using Next.js and is deployed using Vercel.

## Features

- User authentication and authorization
- Make salon reservations
- View reservation history
- Customer sign up, sign in, and sign out
- Admin sign in, sign out
- Admin can add branches and types of services
- Responsive design

## Technologies Used

- Next.js
- React
- NextAuth for authentication
- MongoDB Atlas for the database
- bcrypt for password hashing
- Vercel for deployment
- Tailwind CSS for styling

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm/yarn.
- You have a GitHub account

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dindinmhs/seasalon.git
```
2. Navigate to the project directory:

```bash
cd my-app
```

3. Install the dependencies:

```bash
npm install
# or
yarn install
```

## Running the Application

1. Create a `.env` file in the root of the project and add the required environment variables (see below for details).

2. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```bash
# MongoDB Atlas
MONGO_URI = 'mongodb://dindinimanudin147:utsjkISchmXoYR7z@ac-nkegjka-shard-00-00.zgtymqz.mongodb.net:27017,ac-nkegjka-shard-00-01.zgtymqz.mongodb.net:27017,ac-nkegjka-shard-00-02.zgtymqz.mongodb.net:27017/?ssl=true&replicaSet=atlas-1ur7ei-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
# Authentication
NEXTAUTH_SECRET=seasalon
NEXTAUTH_URL=http://localhost:3000
```
## Usage

Sign Up and Sign In
- To access the application, users must first sign up and create an account.
- After signing up, users can sign in using their credentials.
- All new users are automatically assigned the customer role
- For admin access, use the email `thomas.n@compfest.id` password `Admin123` to log in. There is only one admin in the system.

## Paths

- Home Page: `/`
- Sign Up Page: `/sign-up`
- Sign In Page: `/sign-in`

Customer page :
- Add Reservation: `/dashboard/customer/booking`
- History Page: `/dashboard/customer/history`
- Profile Page: `/dashboard/profile/profile`

Admin page :
- Add Branches: `/dashboard/admin/branch`
- Add Types of Services: `/dashboard/admin/services`
- Profile Page: `/dashboard/admin/profile`
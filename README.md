# **Car Doctor Pro**

**Car Doctor Pro** is a modern web application built with Next.js, designed for managing car repair and maintenance services. This app integrates with various libraries and APIs to provide an optimized user experience with responsive UI, seamless navigation, and rich functionalities.

## **Table of Contents**

* Features  
* Tech Stack  
* Setup  
* Scripts  
* Environment Variables  
* License

## **Features**

* **User Authentication**: Login and registration with secure authentication using `next-auth` and JWT.  
* **Car Service Management**: Manage and display car maintenance services.  
* **Dynamic Ratings**: Use `@smastrom/react-rating` for service reviews.  
* **Responsive UI**: Responsive design powered by Tailwind CSS and DaisyUI.  
* **Interactive Animations**: Leveraging `framer-motion` for engaging animations.  
* **PDF Report Generation**: Export service reports as PDFs with `jspdf` and `jspdf-autotable`.

## **Tech Stack**

* **Frontend**: Next.js, React, Tailwind CSS, DaisyUI  
* **Backend**: Node.js, Next.js API routes  
* **Database**: MongoDB with `mongodb-client-encryption`  
* **Auth**: `next-auth` for secure user authentication  
* **Additional Libraries**: `axios`, `aos` (for animations), `bcrypt`, `date-fns`, `react-hook-form`, `react-icons`, `sharp`, and more.

## **Setup**

Clone the repository:  
bash  
Copy code  
`git clone https://github.com/mdalmamungalib/car-doctor-pro.git`  
`cd car-doctor-pro`

1. 

Install dependencies:  
bash  
Copy code  
`npm install`

2. 

Set up environment variables:  
Create a `.env.local` file in the root directory and add the following variables:  
env  
Copy code  
`NEXTAUTH_URL=http://localhost:3000`  
`DATABASE_URL=http://localhost:3000`  
`JWT_SECRET=http://localhost:3000`

3. 

Start the development server:  
bash  
Copy code  
`npm run dev`

4. 

## **Scripts**

* **`npm run dev`**: Starts the development server.  
* **`npm run build`**: Creates an optimized production build.  
* **`npm run start`**: Runs the production server.  
* **`npm run lint`**: Lints the codebase.  
* **`npm run test`**: Runs tests.

## **Environment Variables**

* **NEXTAUTH\_URL**: Base URL for the NextAuth authentication.  
* **DATABASE\_URL**: MongoDB connection string.  
* **JWT\_SECRET**: Secret for signing JWT tokens.

## **License**

This project is licensed under the MIT License.


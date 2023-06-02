# Airbnb Clone App
This is a clone of Airbnb created using Next.js 13, Prisma, MongoDB, and Tailwind CSS. 

## Features
 - Properties - Create, Delete, List
 - Booking/Reservation System with Owner and Guest Cancellation
 - Favorites
 - Search (including Filters)
 - Location Map (Leaflet)
 - Calendar (react-date-range)
 - Registration and Login
 - Social Login *(Google and Github)*
 - Responsive Design (Tailwind CSS)
 - Image upload (Cloudinary CDN)
 - Form Validations (react-hook-form)
 - Fetch data in server components by directly accessing database (WITHOUT API)

## How To Run

 - Setup Prisma 

     npx prisma db push

 
 - Setup **.env** file
   
       DATABASE_URL=
       GOOGLE_CLIENT_ID=
       GOOGLE_CLIENT_SECRET=
       GITHUB_ID=
       GITHUB_SECRET=
       NEXTAUTH_SECRET=
   
 - Install dependencies

   
       npm install
   
  

 - Run Development

   
       npm run dev
   

## Tech Stack

 - Next.js 13
 - MongoDB
 - Prisma  
 - Tailwind CSS

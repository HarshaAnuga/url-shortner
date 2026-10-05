## Snip

A full-stack URL shortener built with the MERN stack. Snip converts long URLs into short, shareable links and generates a QR code for every shortened URL.

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</div>

## Overview

Snip is a lightweight and user-friendly URL shortening application that allows users to:
- shorten long URLs into compact links
- generate unique short codes
- redirect users to the original destination
- create QR codes for each shortened link
- copy generated links quickly
- store link data securely in MongoDB

This project demonstrates a complete full-stack architecture using the MERN stack, REST APIs, and dynamic QR code generation.

## Features

- Shorten long URLs into compact and shareable links
- Generate unique URL short codes
- Redirect users from short links to the original URLs
- Create QR codes for each shortened link
- Copy shortened links in one click
- Responsive and mobile-friendly interface
- Persistent storage using MongoDB
- REST API-based backend
- Environment variable support for configuration management

## Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Additional Tools
- QR code generation library
- REST APIs
- dotenv
- Git and GitHub

## How It Works

1. A user enters a long URL into the Snip frontend.
2. The frontend sends the URL to the backend API.
3. The backend generates a unique short code.
4. The original URL and short code are saved in MongoDB.
5. The app returns a shortened URL and QR code.
6. When the short link is opened, the server redirects the user to the original URL.

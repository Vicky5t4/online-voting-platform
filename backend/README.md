# 🗳️ Online Voting Platform

A full-stack **MERN (MongoDB, Express, React, Node.js)** application designed for secure and transparent online voting.  
This platform ensures that only authenticated users can participate, preventing duplicate or unauthorized votes.  

✅ Successfully tested with **100+ students in a hostel environment** for a voting event.

---

## 🚀 Features
- 🔒 **Authentication System** – Register & login required before accessing polls.  
- 🗳️ **Secure Voting** – Each student can vote **only once per poll**.  
- 📊 **Dashboard for Admin & Users** –  
  - Users: View available polls and cast vote.  
  - Admin: Manage polls, view real-time results.  
- 📡 **Real-time Updates** – Votes update dynamically.  
- 🧑‍🎓 **Scalable** – Can be used for class elections, hostel voting, college clubs, etc.  
- 🌐 **Deployed on Vercel + MongoDB Atlas**.  

---

## 🖼️ Screenshots

### 🔑 Login Page
![Login Page](assets/login.png)

### 📝 Register Page
![Register Page](assets/register.png)

### 🗳️ Polls
![Polls](assets/poll.png)

### 📊 Voting Results
![Results](assets/votes.png)

---

## 📊 Dashboard

The **dashboard** acts as the main hub for students after login:

- 🗳️ Shows all **active polls** available.  
- 📈 Displays **real-time voting results** once the poll is submitted.  
- ⏳ Prevents multiple votes from the same student.  
- ✅ Confirmation message after successful voting.  

---

## 🔐 Authentication Flow

1. **Register** with username, email, and password.  
2. **Login** with valid credentials.  
3. Redirected to **Dashboard** → Active polls are shown.  
4. User can cast vote **only once**.  
5. Results become visible on dashboard in real-time.  

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite) + TailwindCSS  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Authentication**: JWT (JSON Web Token)  
- **Deployment**: Vercel (Frontend) + Render/Heroku (Backend)  



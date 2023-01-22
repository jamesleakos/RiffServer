# RiffServer

## Description
This was a student project I helped build in Jan 2023 during my time at Hack Reactor. 

Riff is a messaging application built for mobile, inspired by Slack. Users chat with others in shared servers across a number of topic specific channels. They can also directly message other users.

[RiffMessenger](https://github.com/jamesleakos/RiffMessenger) is the front end. 
[RiffServer](https://github.com/jamesleakos/RiffServer) is the back end.

<p float="left">
  <img src="https://user-images.githubusercontent.com/37193140/213892222-1e7017a4-b04a-4de1-b9c9-672c5da93c24.gif" width="240" height="500"/>
  <img src="https://user-images.githubusercontent.com/37193140/213892264-dd976a2a-108c-430a-b350-47b6586b5914.gif" width="240" height="500"/>
</p>

## Tech Stack
![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![ReactNative](https://img.shields.io/badge/reactnative-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

## Installation
1. git clone from both RiffMessenger and RiffServer repos
1. Follow the directions of the RiffMessenger Read Me
1. Install PostgreSQL following the instructions here https://www.postgresql.org/download/
1. In your terminal, run 'npm install'
1. In your postgreSQL command line, run '/i 'INSERT_YOUR_FILE_PATH/RiffServer/server/database/schema.sql''

## Features
- Register for an account to login, secured through firebase authentification
- Join the public 'Welcome' server to meet new friends
- Create your own private servers that you can invite friends into by username
- Create channels within each server
- If have created the server, long hold to rename or delete any channel
- Chat amongst your community by posting messages in channels
- Long hold on any message to reply in the chat
- See the online status of everyone in the channel and all of your friends
- Press on users to add them to your friends list
- Add friends by username or remove them in your friends list
- Once you have added friends you can send them a private message
- Once you're done, go to the account page and sign out of your account

## Team Members
- James Leakos
- Christopher Wong
- Jonathan Sindorf
- Jake Alexander
- Christopher Garcia
- Robert Hu

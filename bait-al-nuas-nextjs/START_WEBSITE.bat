@echo off
title Bait Al-Nu'as Website
if not exist node_modules (
  echo Installing website packages...
  call npm install
)
echo Starting website at http://localhost:3000
call npm run dev

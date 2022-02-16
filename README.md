# coding-challenge-TypeScript-Angular-API

## Description

This is the result of a code challenge I did recently for a Front End Angular Developer position. The company provided a full Angular 8+ project but I have remove everything that is not strictly related with MY challenge and also I have removed references to the company for their convenience and privacy.

## Previous considerations

- The company provided me with 2 explanatory videos with instructions (not 100% clearly explained intentionally to see how the applicant will handle uncertainty). In addition, It provided a full Angular project (very messy intentionally) to serve as playground for different Front-end roles and challenges.

> This repo does NOT contains the original code source or video instructions provided by the company to preserve their confidentiality in the hiring process. Instead, I created a new Angular project with just the raw basics to make it run and include in it just my work and the initial state of the file affected

- The **original file provided** that I have to modify is provided at src/app/coding-challenge/initial.ts
- The **modified file** is at src/app/coding-challenge/result.ts

## Requirements based on my analysis of the initial videos

#### Time limit

90 minutes since the opening of the instructions. Recommended based on average: 60 minutes total.

- API INTEGRATION: Create the logic for the **API INTEGRATION with GET methods** proposed, making use of the existing code base in the Angular services. I must bear in mind the services extends the BaseService and the API urls are composed by multiple resources
- STRONG-TYPING: Apply **STRONG-TYPING** everywhere in the file as much as I can. Bear in mind some endpoints has id as string and others as numbers
- Fix some typos along the way

#### Improvements after submission

[x] Better use of generics inheritance when exteding the BaseService
[x] I added handling of the Observable's unsubscriptions when the Angular component is destroyed using RxJS events as a bonus.
[ ] The dashboard id is not being added to the final Url when requesting widget for certain dashboard

---

## Set-up

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.0. You need at least Node 16, npm and Angular 8+ installed globally in your computer.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

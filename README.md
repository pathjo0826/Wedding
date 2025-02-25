# WeddingApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

To build for re-deployment run `ng build --configuration=production --base-href https://pathjo0826.github.io/Wedding/`

## Deploy GitHub

To deploy the build run `npx angular-cli-ghpages --dir=dist/wedding-app` 

When the app is deployed on GitHub pages it is accessible worldwide on: `https://pathjo0826.github.io/Wedding/`

## Deploy Using Custom Domain

The Build and Deploy steps look slightly different. Use the following steps:

1. Build command: `ng build --configuration=production --base-href=/`
2. Deploy command: `npx angular-cli-ghpages --dir=dist/wedding-app`
3. Go to Github Repository > Settings > Pages and add Custom Domain: `patrikandclaudia2025.com`

## AppCheck

A Firebase/Google AppCheck (reCAPTCHA) feature is implemented that only allow calls to the database from approved domains.
Approved Domains are currently `patrikandclaudia2025.com` and `localhost`. These can be set from the reCAPTCHA console on:
`https://www.google.com/recaptcha/admin/site/715572117`.

Relevant keys are found in reCAPTCHA.txt

## EmailJS

EmailJS is used as the service provider for automatic e-mail forwarding of form data in the Contact View. The EmailJS SDK is 
installed/used and configured in the EmailService. Necessary parameters are found on the EmailJS dashboard on
`https://dashboard.emailjs.com/sign-in`.
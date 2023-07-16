# Analytics

## Front

Run cmd `npm run dev`

## Docker

Run cmd `docker compose up --build` the first time 
then `docker compose up -d`

# User Account Access

`cd api` and `npm run seed` to generate an admin and webmaster accounts

This repository provides access to two types of user accounts: **admin** and **webmaster**.

## Admin Account

To connect to the admin account, use the following credentials:

- Email: admin@example.com
- Password: admin123

## Webmaster Account

To connect to the webmaster account, follow these steps:

1. Visit the login page.
2. Enter your email and password.
3. If you have already been validated by the admin, you can log in using the following credentials:
   - Email: webmaster@example.com
   - Password: webmaster123
4. If you have not been validated yet, please wait for the admin to validate your account. Once validated, you can log in using the credentials mentioned above.

Please note that the webmaster account needs to be validated by the admin before you can log in.

If you have any issues or questions, please contact the administrator for assistance.

## Prisma

### Make a migration

`npx prisma migrate dev`

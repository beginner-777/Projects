# Bait Al-Nu'as — Next.js Website

## Run the website

1. Install Node.js 20 or newer.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

Every route is a real Next.js App Router page inside the `app` folder. Browser back/forward navigation works normally.

## Activate contact email

Open `lib/data.js` and add the receiving address to `email`, for example:

```js
email: 'hello@yourdomain.com',
```

The frontend-only form opens the visitor's email application with all project details filled in. Fully automatic background email delivery requires an email service or server API.

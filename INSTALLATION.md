# SkySong — Local Installation (Personal Use)

This document outlines how to replicate the **SkySong** project locally.  

> **Note:** This setup is intended **for the repository owner for personal replication only**. It requires access to private packages and backend credentials.

## 1. Clone the Repository

```bash
git clone https://github.com/ukaylee/skysong.git
cd skysong
```

## 2. Access Private Packages

SkySong depends on the private package `@clardiza/react-osmd-player`.

### a. Request access from the repository/package owner (@clardiza) if you haven’t already.

### b. Generate a GitHub Personal Access Token (PAT):

- Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens)
- Click **“Generate new token (classic)”**
- Select the following scopes:
    - `repo`
    - `read:packages`
- Copy the token and save it securely — this will be used to authenticate with GitHub Packages.

## 3. Authenticate with GitHub Packages

```bash
npm login --registry=https://npm.pkg.github.com
```

- **Username**: your GitHub username
- **Password**: your Personal Access Token (PAT)

Optional: create a local `.npmrc` in the repo root:

```text
@clardiza:registry=https://npm.pkg.github.com
```

## 4. Install Dependencies

```bash
npm install
```

> This will install all dependencies, including private packages if authenticated.

## 5. Configure Environment Variables

Create a `.env.local` file in the project root with your own Supabase credentials:

```env
REACT_APP_SUPABASE_URL=<your-supabase-url>
REACT_APP_SUPABASE_ANON_KEY=<your-supabase-key>
```

> **Do not commit** `.env.local` — these are private credentials.

## 6. Prebuild Scripts

SkySong uses some OSMD patches that require prebuild steps:

```bash
npm run prebuild
```

## 7. Run the App Locally

```bash
npm start
```

The app will run at: http://localhost:3000

## 8. Optional: Production Build

```bash
npm run build
```

## 9. Notes

- The login feature currently exists for admin users only.
- Admin privileges are assigned by the repository owner.
- This guide is for personal replication only and documents the complete installation flow without including any sensitive credentials.

next-chop
next-chop

# Next Chop Version 2.0

![Next Chop Logo](./public/favicon/apple-touch-icon.png)

## Frontend Serverless with React and GraphQL

In this repo we build a serverless recipe sharing application in React using Next.js. This is the code that we build in the [Frontend Serverless with React and GraphQL](https://courses.codemochi.com/frontend-serverless-with-react-and-graphql/) course at [Codemochi](https://codemochi.com).

_Note:_ This project is `Version 2.0` of the project that has been updated to work with GraphCMS 2.0. The original version of the [repo is located here](https://github.com/CaptainChemist/next-chop).

### Overview

Check out the `staging` branch to see a step by step guide for building this application from the ground up. Each step is a commit which makes it easy to tell exactly what changed from step to step. The `master` branch has two commits- the initial commit which only has a README.md file, and a merge from the `staging` branch after we have built the whole application.

If you just want the finished product, you can clone this repo and the master branch will have the finished version if you pull the latest.

### How to use this Project

If you just want to run the app, check out the latest on the `master` branch and then create a `.env` file in the root of your file. It should have the following variables:

_.env_

```
BRANCH=master
GRAPHCMSURL=https://api-yourregion.graphcms.com/v1
GRAPHCMSPROJECTID=your-graphcms-id
domain=your-domain.auth0.com
clientId=your-auth0-clientid
clientSecret=your-auth0-clientSecret
scope='openid profile'
redirectUri=https://localhost:3000/api/callback
postLogoutRedirectUri=https://localhost:3000/
cookieSecret='one-two-three-secret-four-secret-dont-share-it-ever'
BACKEND_URL=https://localhost:3000/api/graphql
GRAPHCMS_TOKEN=your.graphcms.token
APIURL=https://www.filestackapi.com/api/store/S3
APIKEY=your-graphcms-api-key
PROJECTID=your-graphcms-projectid
CDNBASE=https://cdn.filestackcontent.com/
```

You can get these variables by creating an account with GraphCMS and Auth0 and we cover where to get those from and how they get loaded into this project by Next.js in steps 10 and 19, respectively.

You can start the app locally by running `npm run dev`.

To serverlessly deploy, add your GitHub project to Vercel, add the environmental variables to your project, making sure to update the localhost variables to the actual endpoint that Vercel gives you, and then let it deploy.

### Benefits

- Auth0 for User Authentication and Authorization
- Expressive data fetching with Apollo Hooks
- SEO Optimized with Next.js
- Beautiful GraphCMS backend
- Automatic code pipeline and deployment with Vercel

### Detailed list of steps that we go through

This application is complex, but in the [Frontend Serverless with React and GraphQL](https://courses.codemochi.com/frontend-serverless-with-react-and-graphql/) course we go through how to build this up over 10 hours of video so that you know where all of this code is coming from.

1. Create the Next.js Base
2. Add Styled Components
3. Add Ant Design
4. Add Main Layout
5. Add Global Style
6. Add MainHead Component
7. Add Layout
8. Add MainFooter
9. Add MainNavbar
10. Add GraphCMS
11. Add WithApollo
12. Add GraphQL Request Files
13. Add GraphQLCodeGen
14. Add RecipesList
15. Add Alerts
16. Add RecipeListItem
17. Add Recipe Page
18. Add OneRecipe
19. Deploy Using Vercel
20. Add Auth0
21. Add Auth0 Api
22. Add useFetchUser Hook
23. Add Login / Logout
24. Add My Recipes Page
25. Add Like Button
26. Add Favorites Page
27. Add Create Page
28. Add Create Recipe Form
29. Add Form Input
30. Add Form TextArea
31. Add Form Ingredient
32. Add Form Dropdown
33. Uncontrolled vs. Controlled Components
34. Add Delete Ingredient Button
35. Add Form Submit Mutation
36. Add Update Recipe Page
37. Add Update Recipe Form
38. Add Updaate Recipe Mutation
39. Add Delete Recipe Button
40. Add GraphQL Proxy
41. Lock down GraphCMS Api
42. Add Banned Mutation Check
43. Add Verify User Check
44. Add Verify User Permissions Check
45. Add Picture Uploader

_Questions? Problems? Hit me up at @codemochi on twitter or open up an issue on this Github repo and I'll get to it ASAP!_

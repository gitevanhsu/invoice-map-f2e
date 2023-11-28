# Project Description

The F2E Presidential Real-time Voting Map

Welcome to the F2E Presidential Real-time Voting Map project! This project provides real-time voting information through an interactive map interface.

## System Overview

Before running the project, ensure you meet the following requirements:

1. **Node.js Version:** 20 or later.
2. **JavaScript Runtime:** Bun.js.
3. **Election Data Resource:** [中選會](https://db.cec.gov.tw/Visual/President?dataLevel=N&legisId=00&typeId=ELC&subjectId=P0&themeId=1f7d9f4f6bfe06fdaf4db7df2ed4d60c)
4. **Data Availability:** Only election data for 2016 and 2020 is real. Data for 1996 to 2012 is generated using random numbers.

Follow these steps to run the project:

1. Clone the project:  
   `git clone https://github.com/gitevanhsu/invoice-map-f2e.git`

2. Enter project folder:  
   `cd invoice-map-f2e`

3. Install dependencies:  
   `npm install` or `yarn install` or `bun install`

4. Run the development environment:  
   `npm run dev` or `yarn dev` or `bun run dev`

5. Access the project at `[http://localhost:3000](http://localhost:3000)`.

## Directory Structure

- src/app - pages.
- src/app/Hooks - custom hooks.
- src/app/components - main components.
- src/app/components/ShareComponents - other miner components.

- src/app/i18n - i18n relative function and languages data.
- src/app/setting - settings, such as location array or color map.
- src/app/types - global types, such as election data type.
- src/app/utils - util function.

- src/public - static data like images.

```bash
src
├── app
│   ├── [lng]
│   │   ├── Hooks
│   │   ├── components
│   │       └── ShareComponents
│   ├── i18n
│   ├── setting
│   ├── types
│   └── utils
└──  public
```

## Technologies Used

- [Typescript](https://www.typescriptlang.org/): Strongly-typed language for development.
- [Next.js](https://nextjs.org/): Full-stack framework for development.
- [Tailwind CSS](https://tailwindcss.com/): Atomic CSS framework for styling.
- [D3-Geo](https://d3js.org/d3-geo): Data visualization tool for geo maps.
- [Material Design Icons (mdi/react)](https://www.npmjs.com/package/@mdi/react): Icon library.
- [i18next](https://www.i18next.com/): Internationalization tool.
- [next-usequerystate](https://www.npmjs.com/package/next-usequerystate): Query state management.
- [Recharts](https://recharts.org/en-US/): Data visualization tool for bar and line charts.
- [Husky](https://typicode.github.io/husky/): Git hook management tool for maintaining commit quality.
- [Jest](https://jestjs.io/): Unit testing tool.
- [Testing Library](https://testing-library.com/): Unit testing for React components.
- [Cypress](https://www.cypress.io/): End-to-End testing tool.
- [Storybook](https://storybook.js.org/): UI test library.
- [Prettier](https://prettier.io/): Code formatter.
- [ESLint](https://eslint.org/): JavaScript linting tool.

## Third-Party Services

- [Vercel](https://vercel.com/)  
  A platform for hosting Next.js projects with Server-Side Rendering (SSR).
- [Google Sheet](https://www.google.com/sheets/about/)  
  Utilized for storing internationalization data, facilitating efficient management of multilingual content.
- [Google Apps Script](https://www.google.com/script/start/)  
   Manage internationalization data stored in Google Sheets and respond to update scripts seamlessly.

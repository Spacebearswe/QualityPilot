# QualityPilot

**Product quality and envritoment control
Keeps your product development controlled with the enviroment in mind. 

Link to live site: [ControlPilot](https://niclo1337.github.io/campus-eats/)
Edit the link
<hr>

## Table of contents

- [About the project](#about-the-project)
  - [Team](#team)
- [User Experience (UX)](#user-experience-ux)
  - [Target audience](#target-audience)
  - [User stories](#user-stories)
- [Design](#design)
  - [Sitemap](#sitemap)
  - [Look and feel](#look-and-feel)
    - [Fonts](#fonts)
    - [Colours](#colours)
    - [Spacing and corners](#spacing-and-corners)
    - [Logo and favicon](#logo-and-favicon)
  - [Accessibility](#accessibility)
- [Features](#features)
- [Technologies used](#technologies-used)
- [Getting started](#getting-started)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [More documentation](#more-documentation)

## About the project

QualityPilot lets companies to track a projects products and enforce quality
and environment approvals to them.  

### Team

Stefan.

## User Experience (UX)

### Target audience

-**Companies** that designs systems that are using products
  and needs a tool for control of the complience of the products in the system 
- **Manufactures** of the products that they are using.
- **Users** that need to be sure of the quality of the used products.


### User stories

#### Users goals

- Keep track of products that fulfilles both quality and enviromental requirement
- Simple to use
- Enforces fulfillment that only can be granted of users with the right xxx
- Products can be exported and imported between systems
- Fix this!!   Find answers in the FAQ and read the terms and privacy information

#### Project goals

- Build a small, working, well-tested app instead of a big unfinished one
- Keep the code understandable and easy to read
- Make the site accessible and usable on mobile and desktop

## Design

The UI design comes from our wireframes (mobile and desktop).

### Sitemap

| Page                          | Address                                                                  |
| ----------------------------- | ------------------------------------------------------------------------ |
| Home (login)                  | `/`                                                                      |
| Products                      | `/products`                                                              |
|                               |                                                                          |
| FAQ                           | `/faq`                                                                   |
| Information pages             | `/about`, `/terms`, `/privacy`, `/cookies`, `/contact`, `/accessibility` |
|                               | ``                                                                       |
| Not found (any other address) | `*`                                                                      |

### Look and feel

Shared colours, typography and component styles are defined in
`src/theme/theme.ts`.

#### Fonts

- Headings: Montserrat.
- Body text and buttons: Open Sans.
- Fonts are loaded through Google Fonts in `index.html`.

#### Colours
--Fix colors!!!

| Purpose                                       | Hex colour |
| --------------------------------------------- | ---------- |
| Primary                                       | `#1f5c3f`  |
| Secondary                                     | `#4b5563`  |
| Success                                       | `#2e7d32`  |
| Warning                                       | `#b45309`  |
| Error                                         | `#c62828`  |
| Page background                               | `#f5f5f5`  |
| Paper background                              | `#ffffff`  |
| Primary text                                  | `#1f2937`  |
| Secondary text                                | `#4b5563`  |
| Text on primary, secondary and status colours | `#ffffff`  |

#### Spacing and corners

- Base spacing unit: 8px.
- Default border radius: 8px.
- Dialog border radius: 16px.

#### Logo and favicon

- Header logo: `public/logo.svg`.
- Matching browser icon: `public/favicon.svg`.

### Accessibility

- Semantic HTML, one `h1` per page and headings in order
- Labels on every input, buttons for actions and links for navigation
- Accessibility rules (`jsx-a11y`) are checked by the linter
- An Accessibility page describes what we have done and what is still missing

## Features

| Feature                                                                       | Status                                  |
| ----------------------------------------------------------------------------- | --------------------------------------- |

# Technologies used

## Frontend

- [React](https://react.dev/) 19 and [TypeScript](https://www.typescriptlang.org/) (strict), built with [Vite](https://vite.dev/)
- [Material UI](https://mui.com/material-ui/) (MUI) for components, with a small theme in `src/theme/theme.ts`
- [React Router](https://reactrouter.com/) with (works on Azure)
- [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/) for tests
- [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting and [Prettier](https://prettier.io/) for formatting
- GitHub Actions and GitHub Pages for CI/CD to Azure

## Backend

- C# 14
- .NET 10
- Entity framework, EF Core 11.0
- Comunicates with fronted with an minimal API
- Solution follows the Clean Code principle



```
/QualityPilot.sln
/src
├── ControlPilot.Domain/               # Layer 1: Entities
│   ├── Entities/                      # Product.cs, UseApproval.cs
│   ├── ValueObjects/                  # Money.cs, Address.cs Not used here yet 
│   └── Exceptions/                    # DomainException.cs
│
├── ControlPilot.Application/          # Layer 2: Use Cases (Refs Domain)
│   ├── UseCases/                      # ex ApplyDiscountCommand.cs Not used yet
│   ├── DTOs/                          # Request/Response records
│   └── DependencyInjection.cs         # AddApplication() extension
│
├── ControlPilot.Infrastructure/       # Layer 3: Adapters (Refs App+Domain)
│   ├── Persistence/                   # AppDbContext, Repositories
│   ├── Repositories/                  # Repository Pattern
│   ├── Migrations/                    # Entity framework Migrations
│   ├── Interfaces/                    # IProductRepository.cs
│   └── DependencyInjection.cs         # AddInfrastructure() extension
│
└── ControlPilot.WebAPI/               # Layer 4: Frameworks (Refs App+Infra)
    ├── Endpoints/                     # ProductEndpoints.cs
    └── Program.cs                     # The Composition Root
````

Not implemented yet!!!
To create thumbnails we use an Azure-friendly OSS approach:
•	PDF: PDFium first-page to PNG
•	TXT: SkiaSharp text preview thumbnail
•	DOCX: OpenXML content extraction + SkiaSharp rendered preview thumbnail (not pixel-perfect)
This avoids OS-level office installation and external executable path management, while keeping license cost low.
# Getting started

## Frontend

You need **Node.js 24 LTS** (see `.nvmrc`; Node 22.22 or newer also works) and Git.
Check with `node -v`.

```bash
git clone -----https://github.com/Spacebearswe/qualitypilot.git
cd quality-pilot/frontend
npm install
This frontednd are made for AZURE, do not use: npm run dev
```

Open the address that `npm run dev` prints (normally <http://localhost:5173>).

All the other commands (tests, lint, build, ...) are listed in
[`CONTRIBUTING.md`](CONTRIBUTING.md#commands).

### Debug localy

Start the API first, in a terminal:

```bash
cd C:\Users\User\source\repos\QualityPilot
dotnet run --project src\QualityPilot.Api --launch-profile http
```

Leave it running and check for Now listening on: http://localhost:5063. Then, in a second terminal, restart the frontend:

```bash
cd C:\Users\User\source\repos\QualityPilot\frontend
npm run swa
```

Open http://localhost:4280 to show the frontend



## Backend

The API exposes parts at `/parts` and products at `/products`, using integer IDs.
Picture and document requests use `PartId` to associate an item with a part.
Products can share Parts. Product-specific approvals, pictures and documents are
independent of a Part's attachments.

Product operations:

| Method | Route                           | Behavior                                                                                           |
| ------ | ------------------------------- | -------------------------------------------------------------------------------------------------- |
| GET    | `/products/`, `/products/{id}`  | List or retrieve products with their parts.                                                        |
| POST   | `/products/`                    | Create a product from `Name`, `Description`, `Manufacturer`, `Designation`, and `ApplicationDate`. |
| PUT    | `/products/{id}`                | Update those product fields.                                                                       |
| POST   | `/products/{id}/parts/{partId}` | Associate an existing part; duplicates return 409.                                                 |
| DELETE | `/products/{id}`                | Delete the product and keep its parts.                                                             |


```powershell
dotnet build
dotnet ef database update --project src\ControlPilot.Infrastructure\ControlPilot.Infrastructure.csproj --startup-project src\ControlPilot.Api\ControlPilot.Api.csproj --context ApplicationDbContext
```

For subsequent schema changes, add a new migration before updating the database:

```powershell
dotnet ef migrations add MigrationName --project src\ControlPilot.Infrastructure\ControlPilot.Infrastructure.csproj --startup-project src\ControlPilot.Api\ControlPilot.Api.csproj --context ApplicationDbContext
```



## Frontend

Create fronted project 

npm create vite@latest frontend -- --template react-ts --no-interactive 2>&1 | Select -Last 5; cd frontend; npm install 2>&1 | Select -Last 3; npm i -D @azure/static-web-apps-cli 2>&1 | Select -Last 3; Get-ChildItem -Name; Get-Content vite.config.ts; Get-Content package.json


Automated and manual tests, results, coverage and known limitations are in
[`TESTING.md`](TESTING.md). To run the automated tests and all other checks:

```bash
npm run check
```

## Backend 

Test for the backend are using XUnit 
Test are started inside VisualStudio and xxx

## Deployment

The site is deployed to **GitHub Pages** automatically with **GitHub Actions**.

| Workflow                       | When it runs                       | What it does                                                           |
| ------------------------------ | ---------------------------------- | ---------------------------------------------------------------------- |
| `.github/workflows/ci.yml`     | On every pull request              | Lint, formatting, tests and build. Must be green to merge              |
| `.github/workflows/deploy.yml` | When something is merged to `main` | Runs the same checks, builds the site and publishes it to GitHub Pages |

So the flow is: branch → PR → green checks + approval → merge → **live site
updates a minute or two later**. Nobody deploys by hand. Follow the progress in
the **Actions** tab on GitHub. If the checks fail, nothing is deployed and the
old site stays up.

The one-time setup for repository admins, and a few things to know (the base
path, `HashRouter`, undoing a release), are in
[`CONTRIBUTING.md`](CONTRIBUTING.md#deployment-setup-and-good-to-know).

## Contributing

Want to work on the code? [`CONTRIBUTING.md`](CONTRIBUTING.md) explains how:

- the [commands](CONTRIBUTING.md#commands) and the [project structure](CONTRIBUTING.md#project-structure)
- how to [add restaurants, menus, opening hours and FAQ entries](CONTRIBUTING.md#working-in-the-code), and our styling rules
- our [Git workflow](CONTRIBUTING.md#working-together-with-git) (branches, pull requests, squash and merge, merge conflicts)
- what to check [before you open a pull request](CONTRIBUTING.md#before-you-open-a-pull-request)

## More documentation

| File                                                     | What it is                                                                                   |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)                     | Commands, project structure, code conventions, Git workflow and checks before a pull request |
|                                                          |                                                                                              |
| [`docs/LOGIN.md`](docs/LOGIN.md)                         | What the simulated login does, the checkout gate and student verification                    |
| [`docs/BRANCH_PROTECTION.md`](docs/BRANCH_PROTECTION.md) | Protect `main` and require a specific reviewer                                               |
| [`TESTING.md`](TESTING.md)                               | Automated and manual tests, results, coverage and known limitations                          |
| [AGENTS.md](AGENTS.md)                                   | Instructions for coding agents when they help in this repo                                   |
